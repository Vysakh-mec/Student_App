import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Checkbox from 'expo-checkbox'
import Color from '../constants/Color'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

const SingleStudentList = ({userDetails}) => {

  const [expanded, setExpanded] = useState(false)

  let Guardians = []
  Guardians = userDetails.GuardianInformation  
  
  return (
    <TouchableOpacity activeOpacity={0.9} onPressIn={() => setExpanded(!expanded)} style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: userDetails.photoURL }} style={styles.headerImage} />
          <Text style={styles.headerText}>{userDetails.name}</Text>
        </View>
        <Checkbox />
      </View>
      {/* body */}

      {
        !expanded ?
          (<View style={styles.bodyContainer}>
            <Text style={styles.secondaryText}>
              Classes
            </Text>
            <Text style={styles.primaryText}>{userDetails.Classes}</Text>
          </View>)
          :

          (<View>
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
                    Guardians.map((item,index) => 
                      <Image key={index} source={{ uri: item.PhotoURL }} style={styles.bodyimage} />
                    )
                  }
                </View>
              </View>
            </View>
          </View>)
      }  
    </TouchableOpacity>
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
    marginTop:10
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: 600
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
    fontWeight: 400
  },
  primaryText: {
    fontSize: 14,
    fontWeight: 500
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
