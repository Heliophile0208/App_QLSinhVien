import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
export default function CreateAccount() {
    const navigation = useNavigation();
  return (
<View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image style={styles.backButton} source={require('../data/images/back.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
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
})