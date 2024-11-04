import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import database from '../../data/Appdata';
export default function Index() {
  const navigation = useNavigation();
  const { sinh_vien } = database.quanlysinhvien;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image style={styles.backButton} source={require('../../data/images/back.png')} />
        </TouchableOpacity>
      </View>
      <View>
            <Text>Danh sách sinh viên:</Text>
            {sinh_vien.data.map((student, index) => (
                <Text key={index}>
                    {student[1]} - {student[6]} 
                </Text>
            ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    marginTop: 40,
    marginLeft: -10,
    justifyContent: "flex-start",
  },
  backButton: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 6,
    marginTop: -40,
    justifyContent: "center",
    alignItems: "center", 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
