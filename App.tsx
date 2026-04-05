import React, { useEffect } from 'react';
import { StatusBar, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store, RootState } from './src/redux/store';
import { setUserFromStorage } from './src/redux/slices/authSlice';
import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Colors } from './src/utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TABS = [
  { name: 'Home', icon: '🏠' },
  { name: 'Transactions', icon: '💳' },
  { name: 'Goals', icon: '🎯' },
  { name: 'Insights', icon: '📊' },
];

function AvatarButton() {
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.auth.user);
  const initial = (user?.name || 'U')[0].toUpperCase();
  return (
    <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('Profile')}>
      <Text style={styles.avatarBtnText}>{initial}</Text>
    </TouchableOpacity>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <AvatarButton />,
        headerStyle: { backgroundColor: Colors.SCREEN_BG },
        headerShadowVisible: false,
        headerTitleStyle: { fontSize: 18, fontWeight: '700', color: Colors.TEXT_PRIMARY },
        tabBarIcon: ({ focused }) => {
          const tab = TABS.find(t => t.name === route.name);
          return <Text style={{ fontSize: focused ? 22 : 18 }}>{tab?.icon}</Text>;
        },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.TEXT_MUTED,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: styles.floatingTab,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');
      if (token && userStr) {
        dispatch(setUserFromStorage({ token, user: JSON.parse(userStr) }));
      }
    })();
  }, []);

  if (!isLoggedIn) return <AuthScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerStyle: { backgroundColor: Colors.SCREEN_BG },
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: Colors.TEXT_PRIMARY },
          headerBackTitle: 'Back',
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.SCREEN_BG} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  floatingTab: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    borderRadius: 24,
    backgroundColor: Colors.WHITE,
    height: 64,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    borderTopWidth: 0,
  },
  avatarBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 16,
  },
  avatarBtnText: { color: Colors.WHITE, fontWeight: '700', fontSize: 14 },
});
