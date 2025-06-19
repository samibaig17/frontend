import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Text, Appbar, Avatar, Button, Card, Title, Paragraph, ActivityIndicator, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import { useAuth } from '../contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Create a type that combines both stack and tab navigation
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'> & {
  navigate: (screen: keyof MainTabParamList) => void;
};

const HomeScreen = () => {
  const { user, signOut, isLoading } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            signOut();
            // Navigation is handled by the auth state in AppNavigator
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Avatar.Text 
                size={80} 
                label={user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                style={[styles.avatar, { backgroundColor: '#6C47FF' }]}
                color="white"
                labelStyle={styles.avatarText}
              />
            </View>
            <View style={styles.userText}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{user?.role || 'Member'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.actionsContainer}>
            <Card 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Events')}
            >
              <Card.Content style={styles.actionCardContent}>
                <MaterialCommunityIcons 
                  name="ticket" 
                  size={32} 
                  color={theme.colors.primary} 
                />
                <Text style={styles.actionText}>Events</Text>
              </Card.Content>
            </Card>

            <Card 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Clubs')}
            >
              <Card.Content style={styles.actionCardContent}>
                <MaterialCommunityIcons 
                  name="store" 
                  size={32} 
                  color={theme.colors.primary} 
                />
                <Text style={styles.actionText}>Clubs</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Upcoming Events</Title>
          <Card style={styles.eventCard}>
            <Card.Content>
              <Title>No upcoming events</Title>
              <Paragraph>Check back later for events near you</Paragraph>
              <Button 
                mode="contained" 
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Events')}
              >
                Explore Events
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    backgroundColor: '#6C47FF',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionCard: {
    width: '48%',
    borderRadius: 10,
  },
  actionCardContent: {
    alignItems: 'center',
    padding: 15,
  },
  actionText: {
    marginTop: 8,
    textAlign: 'center',
  },
  eventCard: {
    borderRadius: 10,
  },
  exploreButton: {
    marginTop: 15,
    alignSelf: 'flex-start',
  },
});

export default HomeScreen;
