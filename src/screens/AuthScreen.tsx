import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TextInput,
  TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { loginUser, RegistUser } from '../redux/thunks/authThunk';
import { Colors } from '../utils/colors';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) { Alert.alert('Error', 'Please fill all fields'); return; }
    if (isLogin) {
      dispatch(loginUser(email, password) as any);
    } else {
      if (!name) { Alert.alert('Error', 'Please enter your name'); return; }
      dispatch(RegistUser(name, email, password) as any);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>💰</Text>
          <Text style={styles.appName}>Personal Finance</Text>
          <Text style={styles.appSub}>Companion</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleBtn, isLogin && styles.toggleBtnActive]} onPress={() => setIsLogin(true)}>
              <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, !isLogin && styles.toggleBtnActive]} onPress={() => setIsLogin(false)}>
              <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Register</Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={Colors.TEXT_MUTED}
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.TEXT_MUTED}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.TEXT_MUTED}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.submitText}>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.SCREEN_BG },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoBox: { alignItems: 'center', marginBottom: 32 },
  logoText: { fontSize: 48, marginBottom: 8 },
  appName: { fontSize: 22, fontWeight: '700', color: Colors.PRIMARY_DARK },
  appSub: { fontSize: 16, color: Colors.PRIMARY, fontWeight: '500' },
  card: { backgroundColor: Colors.WHITE, borderRadius: 16, padding: 20 },
  toggleRow: { flexDirection: 'row', backgroundColor: Colors.PRIMARY_BG, borderRadius: 20, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 16, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: Colors.PRIMARY },
  toggleText: { fontSize: 14, color: Colors.PRIMARY, fontWeight: '600' },
  toggleTextActive: { color: Colors.WHITE },
  input: { backgroundColor: Colors.SURFACE, borderRadius: 10, padding: 14, fontSize: 14, color: Colors.TEXT_PRIMARY, marginBottom: 12 },
  error: { color: Colors.DANGER, fontSize: 12, marginBottom: 10, textAlign: 'center' },
  submitBtn: { backgroundColor: Colors.PRIMARY, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 4 },
  submitText: { color: Colors.WHITE, fontSize: 15, fontWeight: '700' },
});

export default AuthScreen;
