import openai from '../config/openai';

class FeedbackService {
  async analyzeGrammar(transcript) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an English grammar expert. Analyze the user's sentence and identify grammar mistakes. Return a JSON object with: mistakes (array), score (0-100), corrected_text`,
          },
          {
            role: 'user',
            content: `Analyze this sentence for grammar: "${transcript}"`,
          },
        ],
        temperature: 0.5,
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Grammar analysis failed:', error);
      return { mistakes: [], score: 0, corrected_text: transcript };
    }
  }

  async analyzeAmerican(transcript) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a native American English speaker. Rewrite the sentence naturally. Return JSON with: native_version, explanation, vocabulary_suggestions (array), naturalness_score (0-100)`,
          },
          {
            role: 'user',
            content: `Rewrite naturally in American English: "${transcript}"`,
          },
        ],
        temperature: 0.5,
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('American English analysis failed:', error);
      return {
        native_version: transcript,
        explanation: 'Analysis failed',
        vocabulary_suggestions: [],
        naturalness_score: 0,
      };
    }
  }

  async analyzePronunciation(transcript) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an American pronunciation expert. Analyze pronunciation issues. Return JSON with: pronunciation_issues (array), accent_score (0-100), improvement_tips (array), focus_areas (array)`,
          },
          {
            role: 'user',
            content: `Analyze pronunciation in: "${transcript}"`,
          },
        ],
        temperature: 0.5,
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Pronunciation analysis failed:', error);
      return {
        pronunciation_issues: [],
        accent_score: 0,
        improvement_tips: [],
        focus_areas: [],
      };
    }
  }

  async analyzeComprehensive(transcript) {
    try {
      const [grammar, american, pronunciation] = await Promise.all([
        this.analyzeGrammar(transcript),
        this.analyzeAmerican(transcript),
        this.analyzePronunciation(transcript),
      ]);

      const wordCount = transcript.split(' ').length;
      const uniqueWords = new Set(transcript.toLowerCase().split(/\W+/)).size;
      const vocabularyScore = Math.min(100, (uniqueWords / wordCount) * 100);
      const fluencyScore = Math.min(100, (wordCount / 10) * 20 + grammar.score * 0.6);

      return {
        original_transcript: transcript,
        grammar: grammar,
        american: american,
        pronunciation: pronunciation,
        scores: {
          grammar: grammar.score || 0,
          fluency: Math.round(fluencyScore),
          vocabulary: Math.round(vocabularyScore),
          confidence: 85,
          accent: pronunciation.accent_score || 0,
        },
      };
    } catch (error) {
      console.error('Comprehensive analysis failed:', error);
      return {
        original_transcript: transcript,
        grammar: { mistakes: [], score: 0, corrected_text: transcript },
        american: {
          native_version: transcript,
          explanation: '',
          vocabulary_suggestions: [],
          naturalness_score: 0,
        },
        pronunciation: {
          pronunciation_issues: [],
          accent_score: 0,
          improvement_tips: [],
          focus_areas: [],
        },
        scores: { grammar: 0, fluency: 0, vocabulary: 0, confidence: 0, accent: 0 },
      };
    }
  }
}

export default new FeedbackService();