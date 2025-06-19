import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Surface, useTheme, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  const roles = [
    {
      id: 'attendee',
      title: 'Attendee',
      description: 'Find and attend events, clubs, and parties near you',
      icon: 'account-group',
    },
    {
      id: 'promoter',
      title: 'Promoter',
      description: 'Promote events and earn commissions',
      icon: 'bullhorn',
    },
    {
      id: 'club',
      title: 'Club Owner',
      description: 'Manage your venue and events',
      icon: 'store',
    },
  ];

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    try {
      // Here you would typically update the user's role in your backend
      // await updateUserRole(selectedRole);
      
      // Navigate to the appropriate screen based on role
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Select Your Role
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Choose how you want to use TapIn
        </Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <Card
            key={role.id}
            style={[
              styles.roleCard,
              selectedRole === role.id && {
                borderColor: theme.colors.primary,
                borderWidth: 2,
              },
            ]}
            onPress={() => handleSelectRole(role.id)}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.roleIconContainer}>
                <MaterialCommunityIcons
                  name={role.icon as any}
                  size={32}
                  color={selectedRole === role.id ? theme.colors.primary : theme.colors.onSurface}
                />
              </View>
              <Title style={styles.roleTitle}>{role.title}</Title>
              <Paragraph style={styles.roleDescription}>
                {role.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!selectedRole || isLoading}
          loading={isLoading}
          style={styles.continueButton}
          contentStyle={styles.continueButtonContent}
        >
          Continue as {selectedRole || '...'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    maxWidth: 300,
  },
  rolesContainer: {
    marginBottom: 24,
  },
  roleCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  roleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  roleDescription: {
    textAlign: 'center',
    color: '#666',
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
  continueButton: {
    borderRadius: 8,
    paddingVertical: 6,
  },
  continueButtonContent: {
    paddingVertical: 6,
  },
});

export default RoleSelectionScreen;
