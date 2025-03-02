import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import { supabase } from '../../supabase';


const allInterests = [
  'Travel', 'Music', 'Sports', 'Movies', 'Reading', 'Cooking', 'Gaming', 'Art',
  'Photography', 'Dancing', 'Fitness', 'Technology', 'Fashion', 'Food', 'Nature',
  'Pets', 'Writing', 'Yoga', 'Meditation', 'Shopping',
];

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [bio, setBio] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [interests, setInterests] = useState([]);
  const [personalityTraits, setPersonalityTraits] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [profilePics, setProfilePics] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true); 
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setProfilePics((prevPics) => [...prevPics, ...newImages]);
    }
  };


  const handleSubmit = async () => {
    if (!name || !email || !gender || !country || !dob.day || !dob.month || !dob.year || profilePics.length < 2) {
      Alert.alert('Error', 'Please fill all the required fields and upload at least 2 profile pictures.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('country', country);
    formData.append('dob', `${dob.year}-${dob.month}-${dob.day}`);
    formData.append('bio', bio);
    formData.append('looking_for', lookingFor);
    formData.append('personalityTraits', personalityTraits);
  
    profilePics.forEach((pic, index) => {
      const uriParts = pic.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('profile_pics', {
        uri: pic,
        name: `profile_pic${index + 1}.${fileType}`,
        type: `image/${fileType}`,
      });
    });
  
    try {
      const response = await axios.post('http://192.168.1.102:8000/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'User registered successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.error || 'Failed to register user.');
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        Alert.alert('Error', 'Failed to register user. Please try again.');
      }
    }
  };

  
  const handleInterestSelect = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      if (interests.length < 5) {
        setInterests([...interests, interest]);
      } else {
        Alert.alert('Limit Exceeded', 'You can select a maximum of 5 interests');
      }
    }
  };



    useEffect(() => {
      const fetchUserEmail = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
  
          if (error) throw error;
  
          if (session) {
            setUserEmail(session.user.email); // Set the user's email
          } else {
            console.log("No user is currently logged in.");
          }
        } catch (error) {
          console.error("Error fetching user session:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserEmail();
    }, []);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Name Input */}
      <Animatable.View className='mt-10' animation="fadeInDown" duration={1000}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </Animatable.View>

      {/* Email Input */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={200}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userEmail}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </Animatable.View>

      {/* Gender Selection */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={400}>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowGenderModal(true)}
        >
          <Text>{gender || 'Select Gender'}</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Gender Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
      >
        <Animatable.View
          animation="fadeIn"
          duration={300}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.genderButton]}
              onPress={() => {
                setGender('Male');
                setShowGenderModal(false);
              }}
            >
              <MaterialIcons name="male" size={24} color="#007AFF" />
              <Text style={styles.modalButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.genderButton]}
              onPress={() => {
                setGender('Female');
                setShowGenderModal(false);
              }}
            >
              <MaterialIcons name="female" size={24} color="#FF2D55" />
              <Text style={styles.modalButtonText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.genderButton]}
              onPress={() => {
                setGender('Other');
                setShowGenderModal(false);
              }}
            >
              <MaterialIcons name="transgender" size={24} color="#34C759" />
              <Text style={styles.modalButtonText}>Other</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </Modal>

      {/* Date of Birth Selection */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={600}>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDateModal(true)}
        >
          <Text>
            {dob.day && dob.month && dob.year
              ? `${dob.day}/${dob.month}/${dob.year}`
              : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Date of Birth Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
      >
        <Animatable.View
          animation="fadeIn"
          duration={300}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            <View style={styles.datePickerContainer}>
              {/* Day Picker */}
              <FlatList
                data={days}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateItem,
                      dob.day === item && styles.selectedDateItem,
                    ]}
                    onPress={() => setDob({ ...dob, day: item })}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        dob.day === item && styles.selectedDateText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/* Month Picker */}
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateItem,
                      dob.month === (index + 1).toString() && styles.selectedDateItem,
                    ]}
                    onPress={() => setDob({ ...dob, month: (index + 1).toString() })}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        dob.month === (index + 1).toString() && styles.selectedDateText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/* Year Picker */}
              <FlatList
                data={years}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateItem,
                      dob.year === item && styles.selectedDateItem,
                    ]}
                    onPress={() => setDob({ ...dob, year: item })}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        dob.year === item && styles.selectedDateText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </Modal>

      {/* Country Input */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={800}>
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
      </Animatable.View>

      {/* Bio Input */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={1000}>
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </Animatable.View>

      {/* Looking For Input */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={1200}>
        <TextInput
          style={styles.input}
          placeholder="Looking For"
          value={lookingFor}
          onChangeText={setLookingFor}
        />
      </Animatable.View>

      {/* Personality Traits Input */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={1400}>
        <TextInput
          style={styles.input}
          placeholder="Personality Traits (comma separated)"
          value={personalityTraits}
          onChangeText={setPersonalityTraits}
        />
      </Animatable.View>

      {/* Interests Selection */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={1600}>
        <Text style={styles.label}>Select Interests (max 5)</Text>
        <View style={styles.interestsContainer}>
          {allInterests.map((interest) => (
            <TouchableWithoutFeedback
              key={interest}
              onPress={() => handleInterestSelect(interest)}
            >
              <View
                style={[
                  styles.interestItem,
                  interests.includes(interest) && styles.selectedInterest,
                ]}
              >
                <Text
                  style={[
                    styles.interestText,
                    interests.includes(interest) && styles.selectedText,
                  ]}
                >
                  {interest}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Animatable.View>

      {/* Profile Picture Selection */}
      <Animatable.View animation="fadeInDown" duration={1000} delay={1800}>
        <Text style={styles.label}>Select Profile Pictures (min 2)</Text>
        <View style={styles.imageSelectionContainer}>
          {[...Array(8)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageBox}
              onPress={pickImage}
            >
              {profilePics[index] ? (
                <Image source={{ uri: profilePics[index] }} style={styles.image} />
              ) : (
                <Text style={styles.imageBoxText}>+</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Animatable.View>

     
      <Animatable.View
            animation="fadeInUp"
            duration={1200}
            delay={1000}
            style={{ padding: 4 }}
          >
            <CustomButton 
              title="Complete Profile"
              handlePress={handleSubmit}
              containerStyles="w-full mt-7"
            />
          </Animatable.View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
  },
  label: { fontSize: 16, marginBottom: 6, fontWeight: 'bold' },
  button: { backgroundColor: '#EC4899', padding: 12, borderRadius: 8, marginBottom: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  image: { width: 100, height: 100, marginBottom: 12, borderRadius: 8 },
  submitButton: { backgroundColor: '#EC4899', padding: 12, borderRadius: 8 },
  submitButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  interestItem: {
    padding: 8,
    margin: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  selectedInterest: {
    backgroundColor: '#EC4899',
  },
  interestText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
  },
  dateItem: {
    padding: 8,
    margin: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  selectedDateItem: {
    backgroundColor: '#EC4899',
  },
  dateText: {
    fontSize: 14,
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#EC4899',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  imageSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  imageBox: {
    width: '22%',
    height: 60,
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageBoxText: {
    fontSize: 16,
    color: '#888',
  },
};

export default RegisterScreen;