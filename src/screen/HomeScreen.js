import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeScreen from '../components/HeaderHomeScreen'
import StudentList from "../components/StudentList"

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container} >
      <HeaderHomeScreen />
      <StudentList />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})