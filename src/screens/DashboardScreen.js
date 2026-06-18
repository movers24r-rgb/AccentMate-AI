import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
  const [stats, setStats] = useState({
    dailyStreak: 12,
    totalSessions: 45,
    averageScores: {
      grammar: 78,
      fluency: 75,
      vocabulary: 82,
      confidence: 70,
      accent: 72,
    },
    thisWeek: 8,
    thisMonth: 35,
  });

  const renderStatCard = (icon, label, value, color) => (
    <View style={styles.statCard}>
      <Text style={{ fontSize: 28 }}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        {renderStatCard('🔥', 'Daily Streak', `${stats.dailyStreak} days`, '#FF6B6B')}
        {renderStatCard('🎯', 'Total Sessions', stats.totalSessions, '#4ECDC4')}
        {renderStatCard('⏰', 'This Week', stats.thisWeek, '#45B7D1')}
        {renderStatCard('📊', 'This Month', stats.thisMonth, '#FFA07A')}
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>📈 Average Scores</Text>
          <View style={styles.scoresGrid}>
            {Object.entries(stats.averageScores).map(([key, value]) => (
              <View key={key} style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.scoreValue}>{value}</Text>
                <ProgressBar
                  progress={value / 100}
                  color={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Object.keys(stats.averageScores).indexOf(key)]}
                  style={styles.miniProgressBar}
                />
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>🚀 Quick Actions</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Practice')}
            style={styles.actionButton}
          >
            Start Speaking Practice
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Practice', { screen: 'Topics' })}
            style={styles.actionButton}
          >
            Choose a Topic
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>📝 Recent Sessions</Text>
          <View style={styles.sessionItem}>
            <Text style={styles.sessionTime}>Today, 2:30 PM</Text>
            <Text style={styles.sessionTopic}>Talking about favorite movie</Text>
            <View style={styles.sessionScores}>
              <Text style={styles.sessionScore}>Grammar: 82</Text>
              <Text style={styles.sessionScore}>Fluency: 78</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingTop: 20, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#2a2a2a' },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  date: { fontSize: 13, color: '#b0b0b0', marginTop: 4 },
  statsContainer: { paddingHorizontal: 16, paddingVertical: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  statCard: { width: '48%', backgroundColor: '#2a2a2a', borderRadius: 12, padding: 16, borderColor: '#404040', borderWidth: 1, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#b0b0b0', marginTop: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  card: { backgroundColor: '#2a2a2a', marginHorizontal: 16, marginVertical: 10, borderRadius: 12, borderColor: '#404040', borderWidth: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  scoresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  scoreItem: { width: '48%', marginVertical: 8 },
  scoreLabel: { fontSize: 12, color: '#b0b0b0', marginBottom: 4 },
  scoreValue: { fontSize: 16, fontWeight: 'bold', color: '#FF6B6B' },
  miniProgressBar: { height: 6, marginTop: 4, borderRadius: 3 },
  actionButton: { marginVertical: 6, backgroundColor: '#FF6B6B' },
  sessionItem: { paddingVertical: 10 },
  sessionTime: { fontSize: 12, color: '#808080' },
  sessionTopic: { fontSize: 14, color: '#e0e0e0', marginTop: 4 },
  sessionScores: { flexDirection: 'row', marginTop: 8, gap: 12 },
  sessionScore: { fontSize: 12, color: '#b0b0b0' },
  footer: { height: 20 },
});