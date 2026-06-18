import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import topicService from '../services/topicService';

export default function TopicsScreen({ navigation }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [topic, setTopic] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomTopic = async () => {
    setSelectedMode('random');
    setIsLoading(true);
    const randomTopic = topicService.getRandomTopic();
    setTopic(randomTopic);

    const result = await topicService.generatePrompts(randomTopic);
    setPrompts(result.prompts || []);
    setIsLoading(false);
  };

  const handleSelectPrompt = (prompt) => {
    navigation.navigate('VoicePracticeHome', {
      topic: topic,
      prompt: prompt,
    });
  };

  if (selectedMode) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            setSelectedMode(null);
            setTopic(null);
            setPrompts([]);
          }}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{topic}</Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.loadingText}>Generating prompts...</Text>
          </View>
        ) : (
          <ScrollView style={styles.content}>
            <Text style={styles.subtitle}>Choose a prompt to start:</Text>
            {prompts.map((prompt, index) => (
              <Card
                key={index}
                style={styles.promptCard}
                onPress={() => handleSelectPrompt(prompt)}
              >
                <Card.Content>
                  <View style={styles.promptHeader}>
                    <Text style={styles.promptNumber}>{index + 1}</Text>
                    <Text style={styles.promptText}>{prompt}</Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Speaking Topics</Text>
        <Text style={styles.subtitle}>Choose how you want to practice</Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <MaterialCommunityIcons name="dice-5" size={40} color="#FF6B6B" />
            <Text style={styles.cardTitle}>Random Topic</Text>
            <Text style={styles.cardDescription}>
              AI generates a random topic for you
            </Text>
            <Button
              mode="contained"
              onPress={handleRandomTopic}
              style={styles.cardButton}
              loading={isLoading && selectedMode === 'random'}
            >
              Generate Topic
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <MaterialCommunityIcons name="timer" size={40} color="#45B7D1" />
            <Text style={styles.cardTitle}>Timed Challenge</Text>
            <Text style={styles.cardDescription}>
              Speak continuously for a set time
            </Text>
            <View style={styles.timedOptions}>
              {[1, 2, 3, 5].map((min) => (
                <Button
                  key={min}
                  mode="outlined"
                  onPress={() => navigation.navigate('VoicePracticeHome', { duration: min * 60 })}
                  style={styles.timeButton}
                >
                  {min}m
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingTop: 20, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#2a2a2a' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#b0b0b0', marginTop: 4 },
  content: { padding: 16 },
  card: { backgroundColor: '#2a2a2a', marginVertical: 12, borderRadius: 12, borderColor: '#404040', borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 12, marginBottom: 8 },
  cardDescription: { fontSize: 13, color: '#b0b0b0', marginBottom: 16, lineHeight: 20 },
  cardButton: { marginTop: 12, backgroundColor: '#FF6B6B' },
  timedOptions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  timeButton: { borderColor: '#45B7D1', minWidth: 50 },
  promptCard: { backgroundColor: '#2a2a2a', marginVertical: 10, borderRadius: 12, borderColor: '#404040', borderWidth: 1 },
  promptHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  promptNumber: { fontSize: 18, fontWeight: 'bold', color: '#FF6B6B', marginRight: 12, minWidth: 30 },
  promptText: { fontSize: 14, color: '#e0e0e0', lineHeight: 20, flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#b0b0b0', marginTop: 12 },
});