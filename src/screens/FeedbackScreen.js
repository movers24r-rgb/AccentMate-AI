import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FeedbackScreen({ route, navigation }) {
  const { feedback } = route.params || {};
  const [expandedSection, setExpandedSection] = useState('scores');

  if (!feedback) {
    return (
      <View style={styles.container}>
        <Text>No feedback available</Text>
      </View>
    );
  }

  const { scores, grammar, american, pronunciation, original_transcript } = feedback;

  const renderScoreCard = (title, score, color) => (
    <View style={styles.scoreCard}>
      <View style={styles.scoreHeader}>
        <Text style={styles.scoreTitle}>{title}</Text>
        <Text style={[styles.scoreValue, { color }]}>{score}</Text>
      </View>
      <ProgressBar progress={score / 100} color={color} style={styles.progressBar} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>📊 Your Scores</Text>
          {renderScoreCard('Grammar', scores.grammar, '#FF6B6B')}
          {renderScoreCard('Fluency', scores.fluency, '#4ECDC4')}
          {renderScoreCard('Vocabulary', scores.vocabulary, '#45B7D1')}
          {renderScoreCard('Confidence', scores.confidence, '#FFA07A')}
          {renderScoreCard('Accent', scores.accent, '#98D8C8')}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity
            onPress={() =>
              setExpandedSection(expandedSection === 'original' ? null : 'original')
            }
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🎤 Your Transcript</Text>
              <MaterialCommunityIcons
                name={expandedSection === 'original' ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
          {expandedSection === 'original' && (
            <Text style={styles.transcript}>{original_transcript}</Text>
          )}
        </Card.Content>
      </Card>

      {grammar?.corrected_text && (
        <Card style={styles.card}>
          <Card.Content>
            <TouchableOpacity
              onPress={() =>
                setExpandedSection(
                  expandedSection === 'corrected' ? null : 'corrected'
                )
              }
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>✅ Corrected Version</Text>
                <MaterialCommunityIcons
                  name={expandedSection === 'corrected' ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>
            {expandedSection === 'corrected' && (
              <Text style={styles.transcript}>{grammar.corrected_text}</Text>
            )}
          </Card.Content>
        </Card>
      )}

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Practice Again
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 16 },
  card: { backgroundColor: '#2a2a2a', marginVertical: 10, borderRadius: 12, borderColor: '#404040', borderWidth: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreCard: { marginVertical: 8, paddingVertical: 12, borderBottomColor: '#404040', borderBottomWidth: 1 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  scoreTitle: { fontSize: 14, color: '#b0b0b0' },
  scoreValue: { fontSize: 18, fontWeight: 'bold' },
  progressBar: { height: 8, borderRadius: 4 },
  transcript: { fontSize: 14, color: '#e0e0e0', lineHeight: 22, marginTop: 12 },
  button: { marginVertical: 20, paddingVertical: 8, backgroundColor: '#FF6B6B' },
});