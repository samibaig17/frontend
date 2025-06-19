import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Image, ScrollView } from 'react-native';
import { Appbar, Searchbar, Card, Title, Paragraph, ActivityIndicator, Text, Button, useTheme, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Club {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  image?: string;
  tags: string[];
  isOpen: boolean;
  distance?: string;
}

const ClubsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const theme = useTheme();
  const navigation = useNavigation();

  // Mock data - replace with actual API call
  const fetchClubs = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockClubs: Club[] = [
        {
          id: '1',
          name: 'Pulse Nightclub',
          description: 'Upscale nightclub with top DJs and premium bottle service.',
          location: '123 Club St, Downtown',
          rating: 4.7,
          tags: ['Nightclub', 'VIP', 'Dancing'],
          isOpen: true,
          distance: '0.5 mi',
        },
        {
          id: '2',
          name: 'The Velvet Lounge',
          description: 'Intimate cocktail bar with live jazz and craft cocktails.',
          location: '456 Music Ave, Arts District',
          rating: 4.5,
          tags: ['Lounge', 'Live Music', 'Cocktails'],
          isOpen: true,
          distance: '1.2 mi',
        },
        {
          id: '3',
          name: 'Neon Garden',
          description: 'Rooftop bar with stunning city views and electronic music.',
          location: '789 Skyline Dr, Uptown',
          rating: 4.3,
          tags: ['Rooftop', 'Electronic', 'Outdoor'],
          isOpen: false,
          distance: '2.1 mi',
        },
      ];

      setClubs(mockClubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchClubs();
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !activeFilter || 
      club.tags.includes(activeFilter) ||
      (activeFilter === 'open' && club.isOpen);
    
    return matchesSearch && matchesFilter;
  });

  const allTags = Array.from(
    new Set(clubs.flatMap(club => club.tags))
  ).sort();

  const renderClub = ({ item }: { item: Club }) => (
    <Card 
      style={styles.clubCard}
      // onPress={() => navigation.navigate('ClubDetail', { clubId: item.id })}
    >
      <View style={styles.clubHeader}>
        <Image 
          source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=Club+Image' }} 
          style={styles.clubImage}
        />
        {!item.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>CLOSED</Text>
          </View>
        )}
      </View>
      <Card.Content>
        <View style={styles.clubHeader}>
          <Title style={styles.clubName}>{item.name}</Title>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons 
            name="map-marker" 
            size={14} 
            color="#666" 
            style={styles.locationIcon}
          />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
          {item.distance && (
            <Text style={styles.distanceText}>• {item.distance}</Text>
          )}
        </View>
        
        <Paragraph numberOfLines={2} style={styles.clubDescription}>
          {item.description}
        </Paragraph>
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <Chip 
              key={index} 
              style={styles.tag}
              textStyle={styles.tagText}
              onPress={() => setActiveFilter(tag === activeFilter ? null : tag)}
            >
              {tag}
            </Chip>
          ))}
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            mode="outlined" 
            icon="information"
            // onPress={() => navigation.navigate('ClubDetail', { clubId: item.id })}
            style={styles.detailsButton}
            labelStyle={styles.buttonLabel}
          >
            Details
          </Button>
          <Button 
            mode="contained" 
            icon="ticket"
            // onPress={() => navigation.navigate('EventCreate', { clubId: item.id })}
            style={styles.bookButton}
            labelStyle={styles.buttonLabel}
            disabled={!item.isOpen}
          >
            Book Now
          </Button>
        </View>
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
        <Appbar.Content title="Clubs & Venues" />
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search clubs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
          placeholderTextColor="#999"
          inputStyle={styles.searchInput}
        />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          <Chip 
            mode={activeFilter === 'open' ? 'flat' : 'outlined'}
            onPress={() => setActiveFilter(activeFilter === 'open' ? null : 'open')}
            style={styles.filterChip}
            icon="clock"
          >
            Open Now
          </Chip>
          {allTags.map((tag, index) => (
            <Chip 
              key={index}
              mode={activeFilter === tag ? 'flat' : 'outlined'}
              onPress={() => setActiveFilter(activeFilter === tag ? null : tag)}
              style={styles.filterChip}
            >
              {tag}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredClubs}
        renderItem={renderClub}
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
              name="store-remove" 
              size={64} 
              color="#ccc" 
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>
              {searchQuery || activeFilter
                ? 'No clubs match your criteria'
                : 'No clubs found in your area'}
            </Text>
            <Button 
              mode="outlined" 
              onPress={() => {
                setSearchQuery('');
                setActiveFilter(null);
              }}
              style={styles.emptyButton}
            >
              {searchQuery || activeFilter ? 'Clear Filters' : 'Refresh'}
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
  filtersContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtersScrollContent: {
    paddingHorizontal: 10,
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  listContent: {
    padding: 10,
  },
  clubCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  clubHeader: {
    position: 'relative',
  },
  clubImage: {
    width: '100%',
    height: 150,
  },
  closedOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  closedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    flex: 1,
    color: '#666',
    fontSize: 13,
  },
  distanceText: {
    color: '#666',
    fontSize: 13,
    marginLeft: 4,
  },
  clubDescription: {
    color: '#333',
    marginBottom: 10,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    marginRight: 6,
    marginBottom: 6,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#f0f0f0',
  },
  tagText: {
    fontSize: 12,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#6200ee',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#6200ee',
  },
  buttonLabel: {
    fontSize: 13,
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

export default ClubsScreen;
