import "react-native-gesture-handler"
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Color from "../constants/Color"
import SingleStudentList from './SingleStudentList'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import StudentData from "../constants/StudentData"
import ModalItem from './ModalItem'
import FLoatingIcon from "../../assets/icons/FloatingIcon.svg"
import AddUserIcon from "../../assets/icons/AddUserIcon.svg"
import PencilIcon from "../../assets/icons/PencilIcon.svg"
import CheckBoxActiveIcon from "../../assets/icons/CheckBoxActiveIcon.svg"
import CheckBoxInActiveIcon from "../../assets/icons/CheckBoxInActiveIcon.svg"
import DeleteIcon from "../../assets/icons/DeleteIcon.svg"


const StudentList = ({ searchText, selectedClass }) => {

  const sheetRef = useRef(null)
  const snapPoints = ["60%"]

  const [orginalDatas, setOriginalDatas] = useState(StudentData)
  const [studentDatas, setStudentDatas] = useState(StudentData)
  const [checkedDatas , setCheckedDatas] = useState([])

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
  const [bottomSheetData, setBottomSheetData] = useState(studentDatas[0])
  const [Guardians, setGuardians] = useState([])
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('edit')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    let filtered = orginalDatas.filter((student) => student.isDeleted == false)

    if (searchText.length > 0) {
      filtered = filtered
        .filter((student) => student.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
          ||
          student.RegistrationNumber
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()))
    }

    if (selectedClass) {
      filtered = filtered.filter(student => student.Classes.includes(selectedClass))
    }

    setStudentDatas(filtered)
  }, [searchText, selectedClass,orginalDatas])


  const handleClose = () => {
    setVisible(false)
  }

  const toggleBottomSheet = (item) => {
    setBottomSheetData(item)
    setGuardians(item.GuardianInformation)

    if (bottomSheetVisible) {
      setBottomSheetVisible(false)
      sheetRef.current.close()
    } else {
      setBottomSheetVisible(true)
      sheetRef.current.snapToPosition({ position: "50%" })
    }
  }

  const handleFormSubmission = (item) => {


    const updatedData = studentDatas.map((student) => {
      if (student.RegistrationNumber == item.RegistrationNumber) {
        return item
      } else {
        return student
      }
    }
    )
    setStudentDatas(updatedData)
  }

  const handleCheckBox = (value) => {
    setCheckedDatas(
      checkedDatas => {
        if (checkedDatas.includes(value)) {
          return checkedDatas.filter(item => item !== value)
        }else{
          return [...checkedDatas,value]
        }
      }
    )
  }

  const handleDelete = () => {
     const updatedData = orginalDatas.map((student) => {
      if (checkedDatas.includes(student.RegistrationNumber)) {
        return {...student,isDeleted:true}
      }
      return student
     }
    )
    setOriginalDatas(updatedData)
    setCheckedDatas([])
    setIsChecked(false)
  }

  const toggleCheckBox = () => {
    if(isChecked)
    {
      setCheckedDatas([])
      setIsChecked(false)
    }else{
      setCheckedDatas(studentDatas.map(item => item.RegistrationNumber))
      setIsChecked(true)
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
        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
          {isChecked
            &&
            <Text style={{ color: Color.blue, fontFamily: "Montserrat_600", fontSize: 14 }}>invite</Text>
          }
          <TouchableOpacity style={styles.Checkbox} onPress={() => toggleCheckBox()}>
            {
              isChecked ?
                <CheckBoxActiveIcon />
                :
                <CheckBoxInActiveIcon />
            }

          </TouchableOpacity>
          {
            checkedDatas.length
            ?
            <TouchableOpacity onPress={() => handleDelete()}>
            <DeleteIcon />
            </TouchableOpacity>
            : null
          }
        </View>
      </View>

      {/* Student list */}
      <FlatList
        keyExtractor={(item) => item.RegistrationNumber}
        extraData={checkedDatas}
        data={studentDatas}
        renderItem={(item) =>
          <SingleStudentList handleCheckBox={() => handleCheckBox(item.item.RegistrationNumber)} isChecked={checkedDatas.includes(item.item.RegistrationNumber)} userDetails={item.item} handleBottomSheet={() => toggleBottomSheet(item.item)} />
        }
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <FLoatingIcon />
      </TouchableOpacity>
      {/* Modal */}
      <View style={{ height: 1 }}>
        <Modal
          visible={visible}
          transparent
          statusBarTranslucent
        >
          <ModalItem Details={bottomSheetData} handleClose={handleClose} mode={mode} handleDataSubmission={handleFormSubmission} />
        </Modal>
      </View>
      {/* BottomSheet */}
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
            <Text style={styles.headerText}>Personal Information</Text>
            <View style={styles.BottomSheetHeaderRight}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {
                setMode('edit')
                setVisible(true)
              }} >
                <PencilIcon />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <AddUserIcon />
              </TouchableOpacity>
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
            <Text style={styles.headerText}>Guardian Information</Text>
          </View>
          {Guardians.map((item, index) => <BottomSheetItem key={index} GuardianDetails={item} />)}
        </BottomSheetScrollView>
      </BottomSheet>

    </View>
  )
}



const BottomSheetItem = ({ GuardianDetails }) => {
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
    fontFamily: "Montserrat_600"
  },
  numberText: {
    fontSize: 14,
    color: "white",
    backgroundColor: Color.primary,
    paddingHorizontal: 8,
    borderRadius: 4,
    paddingVertical: 5,
  },
  BottomSheetHeader: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  BottomSheetHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20
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
    fontFamily: "Montserrat_600"

  },
  BottomSheetImage: {
    height: 50,
    width: 50,
    borderRadius: 999,
  },
  BottomSheetSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 1,
    marginTop: 20
  },
  miniContainer: {
    gap: 5,
    flex: 1
  },
  secondaryText: {
    color: Color.secondaryText,
    fontSize: 12,
    fontFamily: "Montserrat_400"
  },
  primaryText: {
    fontSize: 14,
    fontFamily: "Montserrat_500"
  },
  linkText: {
    color: Color.blue,
    textDecorationLine: "underline"
  },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 50,
    borderRadius: 999
  }
})