import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constants/Color'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CheckBoxActiveIcon from "../../assets/icons/CheckBoxActiveIcon.svg"
import CheckBoxInActiveIcon from "../../assets/icons/CheckBoxInActiveIcon.svg"


const SingleStudentList = ({ userDetails, isChecked, handleBottomSheet , handleCheckBox }) => {

  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState(isChecked)
  useEffect(() => {
    setChecked(isChecked)
  },[isChecked])


  return (
    <View activeOpacity={0.9} style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.headerLeft}>
          <Image source={{ uri: userDetails.photoURL }} style={styles.headerImage} />
          <Text style={styles.headerText}>{userDetails.name}</Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.Checkbox} onPress={() => handleCheckBox()}>
          {
            checked ?
              <CheckBoxActiveIcon />
              :
              <CheckBoxInActiveIcon />
          }

        </TouchableOpacity>
      </View>
      {/* body */}

      {
        !expanded ?
          (<TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            style={styles.bodyContainer}>
            <Text style={styles.secondaryText}>
              Classes
            </Text>
            <Text style={styles.primaryText}>{userDetails.Classes}</Text>
          </TouchableOpacity>)
          :

          (<TouchableOpacity activeOpacity={0.5} onPress={() => handleBottomSheet()}>
            <View style={styles.bodyContainer}>
              <View style={styles.miniContainer}>
                <Text style={styles.secondaryText}>Registration Number</Text>
                <Text style={styles.primaryText}>{userDetails.RegistrationNumber}</Text>
              </View>
              <View style={styles.miniContainer}>
                <Text style={styles.secondaryText}>Age</Text>
                <Text style={styles.primaryText}>{userDetails.Age}</Text>
              </View>
              <View style={styles.miniContainer}>
                <Text style={styles.secondaryText}>Classes</Text>
                <Text style={styles.primaryText}>{userDetails.Classes}</Text>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.miniContainer}>
                <Text style={styles.secondaryText}>Family members</Text>
                <View style={styles.imageContainer}>
                  {
                    userDetails.GuardianInformation.map((item, index) =>
                      <Image key={index} source={{ uri: item.PhotoURL }} style={styles.bodyimage} />
                    )
                  }
                </View>
              </View>
            </View>
          </TouchableOpacity>)
      }
    </View>
  )
}

export default SingleStudentList

const styles = StyleSheet.create({

  container: {
    borderWidth: 0.5,
    margin: 10,
    padding: 10,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1
  },
  headerText: {
    fontSize: 16,
    fontFamily:"Montserrat_600"
  },
  headerImage: {
    height: 30,
    width: 30,
    borderRadius: 999
  },
  bodyContainer: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 10,
    justifyContent: "space-between",
    marginTop: 20
  },
  secondaryText: {
    color: Color.secondaryText,
    fontSize: 12,
    fontFamily:"Montserrat_400"
  },
  primaryText: {
    fontSize: 14,
    fontFamily:"Montserrat_500"
  },
  imageContainer: {
    flexDirection: "row",
    gap: 5
  }
  ,
  bodyimage: {
    height: 25,
    width: 25,
    borderRadius: 999,
  },
  miniContainer: {
    gap: 5
  }
})
