import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Appbar, Searchbar, Card, Title, Paragraph, ActivityIndicator, Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}

const EventsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  // Mock data - replace with actual API call
  const fetchEvents = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Weekend Party',
          description: 'The biggest party of the year with top DJs and live performances.',
          date: '2023-12-15T22:00:00',
          location: 'Downtown Club',
        },
        {
          id: '2',
          title: 'Jazz Night',
          description: 'An evening of smooth jazz and cocktails.',
          date: '2023-12-20T20:00:00',
          location: 'Blue Note Lounge',
        },
        {
          id: '3',
          title: 'EDM Festival',
          description: 'Experience the best electronic dance music with amazing light shows.',
          date: '2024-01-05T18:00:00',
          location: 'Main Arena',
        },
      ];

      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <Card 
      style={styles.eventCard}
      // onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
    >
      <Card.Cover 
        source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=Event+Image' }} 
        style={styles.eventImage}
      />
      <Card.Content>
        <Title style={styles.eventTitle}>{item.title}</Title>
        <View style={styles.eventMeta}>
          <MaterialCommunityIcons name="calendar" size={16} color="#666" />
          <Text style={styles.eventMetaText}>
            {formatDate(item.date)}
          </Text>
        </View>
        <View style={styles.eventMeta}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
          <Text style={styles.eventMetaText}>{item.location}</Text>
        </View>
        <Paragraph numberOfLines={2} style={styles.eventDescription}>
          {item.description}
        </Paragraph>
        <Button 
          mode="contained" 
          // onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
          style={styles.viewButton}
        >
          View Details
        </Button>
      </Card.Content>
    </Card>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Events" />
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search events..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
          placeholderTextColor="#999"
          inputStyle={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons 
              name="calendar-remove" 
              size={64} 
              color="#ccc" 
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'No events match your search'
                : 'No upcoming events found'}
            </Text>
            <Button 
              mode="outlined" 
              onPress={() => setSearchQuery('')}
              style={styles.emptyButton}
            >
              {searchQuery ? 'Clear Search' : 'Refresh'}
            </Button>
          </View>
        }
      />
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
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchInput: {
    minHeight: 40,
  },
  listContent: {
    padding: 10,
  },
  eventCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventImage: {
    height: 150,
  },
  eventTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventMetaText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  eventDescription: {
    marginTop: 10,
    color: '#333',
    lineHeight: 20,
  },
  viewButton: {
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIcon: {
    opacity: 0.5,
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontSize: 16,
  },
  emptyButton: {
    borderColor: '#6200ee',
  },
});

export default EventsScreen;
