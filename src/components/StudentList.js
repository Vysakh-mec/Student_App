import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Checkbox from 'expo-checkbox'
import Color from "../constants/Color"
import SingleStudentList from './SingleStudentList'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import StudentData from "../constants/StudentData"

const StudentList = () => {

  const sheetRef = useRef(null)
  const snapPoints = ["60%"]

  const [studentDatas, setStudentDatas] = useState(StudentData)
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
  const [bottomSheetData, setBottomSheetData] = useState(studentDatas[0])
  const [Guardians, setGuardians] = useState([])
  const toggleBottomSheet = (item) => {
    setBottomSheetData(item)
    setGuardians(item.GuardianInformation)
    // console.log(Guardians)
    if (bottomSheetVisible) {
      setBottomSheetVisible(false)
      sheetRef.current.close()
    } else {
      setBottomSheetVisible(true)
      // sheetRef.current.expand()
      sheetRef.current.snapToPosition({position:"50%"})
    }
  }



  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>All Students </Text>
          <Text style={styles.numberText}>{studentDatas.length}</Text>
        </View>
        <Checkbox
        />
      </View>
      {/* body */}

      <FlatList
        key={(item) => item.index}
        data={studentDatas}
        renderItem={(item) => <TouchableWithoutFeedback onPress={() => toggleBottomSheet(item.item)}>
          <SingleStudentList userDetails={item.item} />
        </TouchableWithoutFeedback>}
      />


      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        detached
        enablePanDownToClose
        index={bottomSheetVisible ? 0 : -1}
        onClose={() => setBottomSheetVisible(false)}
        

      >
        <BottomSheetScrollView>
          {/* <ScrollView> */}

            <View style={styles.BottomSheetHeader}>
              <Text style={styles.BottomSheetHeaderText}>Personal Information</Text>
              <View style={styles.BottomSheetHeaderRight}>
                <FontAwesome name="pencil" size={20} color="black" />
                <AntDesign name="adduser" size={20} color="black" />
              </View>
            </View>
            <View style={styles.BottomSheetBody}>
              <Image source={{ uri: bottomSheetData.photoURL }} style={styles.BottomSheetImage} />
              <Text style={styles.BottomSheetSecondaryHeaderText}>{bottomSheetData.name}</Text>
              <View style={styles.BottomSheetSubContainer}>
                <View style={styles.miniContainer}>
                  <Text style={styles.secondaryText}>Registration Number</Text>
                  <Text style={styles.primaryText}>{bottomSheetData.RegistrationNumber}</Text>
                </View>
                <View style={styles.miniContainer}>
                  <Text style={styles.secondaryText}>Date Of Birth</Text>
                  <Text style={styles.primaryText}>{bottomSheetData.DateOfBirth}</Text>
                </View>
              </View>
              <View style={styles.BottomSheetSubContainer}>
                <View style={styles.miniContainer}>
                  <Text style={styles.secondaryText}>Mobile</Text>
                  <Text style={[styles.primaryText, styles.linkText]}>{bottomSheetData.Mobile}</Text>
                </View>
                <View style={styles.miniContainer}>
                  <Text style={styles.secondaryText}>Email Address</Text>
                  <Text style={[styles.primaryText, styles.linkText]}>{bottomSheetData.email}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 12, paddingHorizontal: 20 }}>
              <Text style={styles.BottomSheetHeaderText}>Guardian Information</Text>
            </View>
            {Guardians.map((item, index) => <Item key={index} GuardianDetails={item} />)}
          {/* </ScrollView> */}
        </BottomSheetScrollView>
      </BottomSheet>

    </View>
  )
}


const Item = ({ GuardianDetails }) => {
  console.log(GuardianDetails)
  return (
    <View style={styles.BottomSheetBody}>
      <Image source={{ uri: GuardianDetails.PhotoURL }} style={styles.BottomSheetImage} />
      <Text style={styles.BottomSheetSecondaryHeaderText}>{GuardianDetails.GuardianName}</Text>
      <View style={styles.BottomSheetSubContainer}>
        <View style={styles.miniContainer}>
          <Text style={styles.secondaryText}>Mobile</Text>
          <Text style={[styles.primaryText, styles.linkText]}>{GuardianDetails.Mobile}</Text>
        </View>
        <View style={styles.miniContainer}>
          <Text style={styles.secondaryText}>Email Address</Text>
          <Text style={[styles.primaryText, styles.linkText]}>{GuardianDetails.Email}</Text>
        </View>
      </View>
    </View>
  )
}

export default StudentList

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 10,
    flex: 1
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 10
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
  },
  numberText: {
    fontSize: 14,
    color: "white",
    backgroundColor: Color.primary,
    paddingHorizontal: 8,
    borderRadius: 4,
    paddingVertical: 5
  },
  BottomSheetHeader: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  BottomSheetHeaderText: {
    fontWeight: 600,
    fontSize: 20
  },
  BottomSheetHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10
  },
  BottomSheetBody: {
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: Color.secondaryText,
    padding: 20,
    marginVertical: 10,
    rowGap: 5,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1
  },
  BottomSheetSecondaryHeaderText: {
    fontSize: 16,
    fontWeight: 600
  },
  BottomSheetImage: {
    height: 50,
    width: 50,
    borderRadius: 999,
  },
  BottomSheetSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 1,
    marginTop: 20
  },
  miniContainer: {
    gap: 5
  },
  secondaryText: {
    color: Color.secondaryText,
    fontSize: 12,
    fontWeight: 400
  },
  primaryText: {
    fontSize: 14,
    fontWeight: 500
  },
  linkText: {
    color: Color.blue,
    textDecorationLine: "underline"
  }
})