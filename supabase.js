import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdxriqnettmeflllwppn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeHJpcW5ldHRtZWZsbGx3cHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzOTU3NDcsImV4cCI6MjA1NTk3MTc0N30.IelZ1h996d1HbAwqYfE8x4OPcZndeCrrmG0kXVtReHM';

// Custom fetch implementation for React Native
const customFetch = (...args) => fetch(...args);

// Create an in-memory storage for web
const inMemoryStorage = {
  data: {},
  getItem: function (key) {
    return this.data[key] || null;
  },
  setItem: function (key, value) {
    this.data[key] = value;
  },
  removeItem: function (key) {
    delete this.data[key];
  },
};

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? inMemoryStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    fetch: customFetch, // Use custom fetch implementation
  },
});