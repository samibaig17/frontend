// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
// import { 
//   Appbar, 
//   Avatar, 
//   Button, 
//   Card, 
//   Divider, 
//   List, 
//   Text, 
//   Title, 
//   useTheme,
//   Portal,
//   Modal,
//   TextInput,
//   Switch,
//   ActivityIndicator
// } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// // import { auth, db } from '../config/supabase';

// const ProfileScreen = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [formData, setFormData] = useState({
//     displayName: '',
//     email: '',
//     phone: '',
//     bio: '',
//     notifications: true,
//   });
  
//   const theme = useTheme();
//   const navigation = useNavigation();

//   // Fetch user data
//   const fetchUserData = async () => {
//     try {
//       // const currentUser = await auth.getCurrentUser();
//       if (currentUser) {
//         // In a real app, you would fetch the user's profile from your database
//         // const { data: profile, error } = await db.getUserProfile(currentUser.id);
//         // if (error) throw error;
        
//         const mockProfile = {
//           id: currentUser.id,
//           displayName: currentUser.email?.split('@')[0] || 'User',
//           email: currentUser.email || '',
//           phone: currentUser.phone || '',
//           bio: 'Nightlife enthusiast | Party lover | Always up for a good time',
//           avatar: 'https://via.placeholder.com/150',
//           memberSince: '2023',
//           eventsAttended: 24,
//           notifications: true,
//         };
        
//         setUser(mockProfile);
//         setFormData({
//           displayName: mockProfile.displayName,
//           email: mockProfile.email,
//           phone: mockProfile.phone,
//           bio: mockProfile.bio,
//           notifications: mockProfile.notifications,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       Alert.alert('Error', 'Failed to load profile data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchUserData();
//     });
    
//     return unsubscribe;
//   }, [navigation]);

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = async () => {
//     if (!user) return;
    
//     setSaving(true);
//     try {
//       // In a real app, you would update the user's profile in your database
//       // const { error } = await db.updateProfile(user.id, formData);
//       // if (error) throw error;
      
//       // Update local state
//       setUser(prev => ({
//         ...prev,
//         ...formData
//       }));
      
//       setEditing(false);
//       Alert.alert('Success', 'Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error', 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'PhoneInput' }],
//       });
//     } catch (error) {
//       console.error('Error signing out:', error);
//       Alert.alert('Error', 'Failed to sign out');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Appbar.Header>
//           <Appbar.Content title="Profile" />
//         </Appbar.Header>
//         <View style={styles.notLoggedInContainer}>
//           <Text style={styles.notLoggedInText}>You are not logged in</Text>
//           <Button 
//             mode="contained" 
//             onPress={() => navigation.navigate('PhoneInput')}
//             style={styles.loginButton}
//           >
//             Sign In
//           </Button>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Appbar.Header>
//         <Appbar.Content title="My Profile" />
//         {editing ? (
//           <Appbar.Action 
//             icon="close" 
//             onPress={() => {
//               setFormData({
//                 displayName: user.displayName,
//                 email: user.email,
//                 phone: user.phone,
//                 bio: user.bio,
//                 notifications: user.notifications,
//               });
//               setEditing(false);
//             }} 
//           />
//         ) : (
//           <Appbar.Action 
//             icon="pencil" 
//             onPress={() => setEditing(true)} 
//           />
//         )}
//       </Appbar.Header>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.profileHeader}>
//           <View style={styles.avatarContainer}>
//             <Avatar.Image 
//               size={100} 
//               source={{ uri: user.avatar }} 
//               style={styles.avatar}
//             />
//             {editing && (
//               <Button 
//                 mode="outlined" 
//                 onPress={() => {}}
//                 style={styles.changePhotoButton}
//                 labelStyle={styles.changePhotoButtonLabel}
//               >
//                 Change Photo
//               </Button>
//             )}
//           </View>
          
//           {!editing ? (
//             <View style={styles.userInfo}>
//               <Title style={styles.userName}>{user.displayName}</Title>
//               <Text style={styles.userEmail}>{user.email}</Text>
//               <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
//               <View style={styles.statsContainer}>
//                 <View style={styles.statItem}>
//                   <Text style={styles.statNumber}>{user.eventsAttended}</Text>
//                   <Text style={styles.statLabel}>Events</Text>
//                 </View>
//                 <View style={styles.statDivider} />
//                 <View style={styles.statItem}>
//                   <Text style={styles.statNumber}>4.8</Text>
//                   <Text style={styles.statLabel}>Rating</Text>
//                 </View>
//               </View>
//             </View>
//           ) : (
//             <View style={styles.editForm}>
//               <TextInput
//                 label="Display Name"
//                 value={formData.displayName}
//                 onChangeText={(text) => handleInputChange('displayName', text)}
//                 style={styles.input}
//                 mode="outlined"
//               />
//               <TextInput
//                 label="Email"
//                 value={formData.email}
//                 onChangeText={(text) => handleInputChange('email', text)}
//                 style={styles.input}
//                 mode="outlined"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//               <TextInput
//                 label="Phone Number"
//                 value={formData.phone}
//                 onChangeText={(text) => handleInputChange('phone', text)}
//                 style={styles.input}
//                 mode="outlined"
//                 keyboardType="phone-pad"
//               />
//               <TextInput
//                 label="Bio"
//                 value={formData.bio}
//                 onChangeText={(text) => handleInputChange('bio', text)}
//                 style={[styles.input, styles.bioInput]}
//                 mode="outlined"
//                 multiline
//                 numberOfLines={3}
//               />
//               <View style={styles.switchContainer}>
//                 <Text style={styles.switchLabel}>Email Notifications</Text>
//                 <Switch
//                   value={formData.notifications}
//                   onValueChange={(value) => handleInputChange('notifications', value)}
//                   color={theme.colors.primary}
//                 />
//               </View>
//               <Button 
//                 mode="contained" 
//                 onPress={handleSave}
//                 loading={saving}
//                 disabled={saving}
//                 style={styles.saveButton}
//               >
//                 Save Changes
//               </Button>
//             </View>
//           )}
//         </View>

//         {!editing && (
//           <>
//             <Divider style={styles.divider} />
            
//             <Card style={styles.card}>
//               <Card.Content>
//                 <Title style={styles.sectionTitle}>About Me</Title>
//                 <Text style={styles.bioText}>{user.bio}</Text>
//               </Card.Content>
//             </Card>

//             <Card style={styles.card}>
//               <Card.Content>
//                 <Title style={styles.sectionTitle}>Preferences</Title>
//                 <List.Item
//                   title="Notifications"
//                   description="Receive email notifications"
//                   left={props => <List.Icon {...props} icon="bell" />}
//                   right={props => (
//                     <Switch
//                       value={user.notifications}
//                       onValueChange={(value) => {
//                         handleInputChange('notifications', value);
//                         // In a real app, you would save this preference immediately
//                       }}
//                       color={theme.colors.primary}
//                     />
//                   )}
//                 />
//                 <List.Item
//                   title="Dark Mode"
//                   description="Switch between light and dark theme"
//                   left={props => <List.Icon {...props} icon="theme-light-dark" />}
//                   right={props => (
//                     <Switch
//                       value={false}
//                       onValueChange={() => {}}
//                       color={theme.colors.primary}
//                     />
//                   )}
//                 />
//               </Card.Content>
//             </Card>

//             <Card style={styles.card}>
//               <Card.Content>
//                 <Title style={styles.sectionTitle}>Account</Title>
//                 <List.Item
//                   title="Payment Methods"
//                   description="Add or update payment methods"
//                   left={props => <List.Icon {...props} icon="credit-card" />}
//                   onPress={() => {}}
//                 />
//                 <List.Item
//                   title="Privacy Settings"
//                   description="Manage your privacy and security"
//                   left={props => <List.Icon {...props} icon="shield-account" />}
//                   onPress={() => {}}
//                 />
//                 <List.Item
//                   title="Help & Support"
//                   description="Get help or contact support"
//                   left={props => <List.Icon {...props} icon="help-circle" />}
//                   onPress={() => {}}
//                 />
//               </Card.Content>
//             </Card>

//             <Button 
//               mode="outlined" 
//               onPress={() => setShowLogoutModal(true)}
//               style={styles.logoutButton}
//               icon="logout"
//             >
//               Sign Out
//             </Button>

//             <View style={styles.versionContainer}>
//               <Text style={styles.versionText}>TapIn v1.0.0</Text>
//             </View>
//           </>
//         )}
//       </ScrollView>

//       {/* Logout Confirmation Modal */}
//       <Portal>
//         <Modal
//           visible={showLogoutModal}
//           onDismiss={() => setShowLogoutModal(false)}
//           contentContainerStyle={styles.modalContainer}
//         >
//           <Text style={styles.modalTitle}>Sign Out</Text>
//           <Text style={styles.modalText}>
//             Are you sure you want to sign out?
//           </Text>
//           <View style={styles.modalButtons}>
//             <Button 
//               mode="outlined" 
//               onPress={() => setShowLogoutModal(false)}
//               style={styles.modalButton}
//             >
//               Cancel
//             </Button>
//             <Button 
//               mode="contained" 
//               onPress={handleLogout}
//               style={[styles.modalButton, styles.logoutConfirmButton]}
//             >
//               Sign Out
//             </Button>
//           </View>
//         </Modal>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   notLoggedInContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   notLoggedInText: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: '#666',
//   },
//   loginButton: {
//     width: '100%',
//     maxWidth: 200,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   profileHeader: {
//     padding: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     backgroundColor: '#e0e0e0',
//   },
//   changePhotoButton: {
//     marginTop: 10,
//     borderRadius: 20,
//     borderColor: '#6200ee',
//   },
//   changePhotoButtonLabel: {
//     fontSize: 12,
//   },
//   userInfo: {
//     alignItems: 'center',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   userEmail: {
//     color: '#666',
//     marginBottom: 4,
//   },
//   memberSince: {
//     color: '#888',
//     fontSize: 12,
//     marginBottom: 16,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   statItem: {
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#6200ee',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
//   statDivider: {
//     width: 1,
//     height: 24,
//     backgroundColor: '#e0e0e0',
//   },
//   editForm: {
//     width: '100%',
//   },
//   input: {
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   bioInput: {
//     minHeight: 80,
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 4,
//   },
//   switchLabel: {
//     fontSize: 16,
//     color: '#333',
//   },
//   saveButton: {
//     marginTop: 8,
//   },
//   divider: {
//     marginVertical: 8,
//     backgroundColor: '#e0e0e0',
//     height: 8,
//   },
//   card: {
//     margin: 8,
//     borderRadius: 8,
//     elevation: 1,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     marginBottom: 12,
//     color: '#333',
//   },
//   bioText: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#444',
//   },
//   logoutButton: {
//     margin: 20,
//     borderColor: '#f44336',
//   },
//   versionContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   versionText: {
//     color: '#999',
//     fontSize: 12,
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     margin: 20,
//     borderRadius: 8,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 24,
//     color: '#444',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   modalButton: {
//     marginLeft: 10,
//     minWidth: 100,
//   },
//   logoutConfirmButton: {
//     backgroundColor: '#f44336',
//   },
// });

// export default ProfileScreen;
