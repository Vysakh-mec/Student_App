import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeScreen from '../components/HeaderHomeScreen'
import StudentList from "../components/StudentList"

const HomeScreen = () => {

  const [searchText , setSearchText] = useState("")
  const [selectedClass , setSelectedClass] = useState()
  
  return (
    <SafeAreaView style={styles.container} >
      <HeaderHomeScreen  handleTextChange={setSearchText} handleClassChange={setSelectedClass} selectedClass={selectedClass} />
      <StudentList searchText={searchText} selectedClass={selectedClass}  />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})