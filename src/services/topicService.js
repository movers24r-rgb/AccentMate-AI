import openai from '../config/openai';

const RANDOM_TOPICS = [
  'My favorite movie',
  'School life',
  'Social media addiction',
  'Technology and education',
  'Future career goals',
  'Climate change',
  'Sports',
  'Books',
  'A memorable trip',
  'A challenge I overcame',
  'My hobby',
  'Family traditions',
  'Travel experiences',
  'Learning languages',
  'Health and fitness',
  'Favorite food',
  'Dream vacation',
  'Music preferences',
  'Current events',
  'Friendship',
];

class TopicService {
  getRandomTopic() {
    return RANDOM_TOPICS[Math.floor(Math.random() * RANDOM_TOPICS.length)];
  }

  async generatePrompts(topic, count = 5) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Generate speaking prompts. Return JSON with: topic, prompts (array of ${count}), tips (array)`,
          },
          {
            role: 'user',
            content: `Generate ${count} speaking prompts for: "${topic}"`,
          },
        ],
        temperature: 0.7,
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to generate prompts:', error);
      return {
        topic: topic,
        prompts: [`Tell me about ${topic}`],
        tips: ['Speak naturally', 'Use complete sentences'],
      };
    }
  }

  async generateWeeklyChallenge(week) {
    const challenges = {
      1: {
        title: 'Introduce Yourself',
        description: 'Introduce yourself for 2 minutes',
        duration: 120,
        tips: ['Speak clearly', 'Use simple sentences'],
      },
      2: {
        title: 'Future Goals',
        description: 'Talk about your goals for 2-3 minutes',
        duration: 180,
        tips: ['Use future tense', 'Explain your reasons'],
      },
      3: {
        title: 'Memorable Experience',
        description: 'Describe an experience in 2-3 minutes',
        duration: 180,
        tips: ['Use past tense', 'Add descriptive words'],
      },
      4: {
        title: 'Technology Opinion',
        description: 'Give your opinion on technology in 3-5 minutes',
        duration: 300,
        tips: ['Present both sides', 'Use linking words'],
      },
    };

    return challenges[week] || challenges[1];
  }

  async startConversation(topic) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Start a conversation. Return JSON with: greeting, question`,
          },
          {
            role: 'user',
            content: `Start conversation about: ${topic}`,
          },
        ],
        temperature: 0.8,
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      return {
        greeting: `Hi! Let's talk about ${topic}!`,
        question: `Tell me more about ${topic}.`,
      };
    }
  }

  async continueConversation(messages) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Continue conversation naturally. Ask follow-up questions.`,
          },
          ...messages,
        ],
        temperature: 0.8,
      });

      return {
        response: response.choices[0].message.content,
        stop_reason: response.finish_reason,
      };
    } catch (error) {
      console.error('Failed to continue conversation:', error);
      return {
        response: "That's interesting! Tell me more.",
        stop_reason: 'error',
      };
    }
  }
}

export default new TopicService();