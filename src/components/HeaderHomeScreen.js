import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'

const HeaderHomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.headerText}>🧑🏻‍🎓 Student List</Text>
            </View>
            <View style={styles.subContainer}>
                <Ionicons name="search" size={24} color="black" />
                <Feather name="filter" size={24} color="black" />
            </View>
        </View>
    )
}

export default HeaderHomeScreen

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:16,
        paddingVertical:12
    },
    subContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:16
    },
    headerText:{
        fontSize:18,
        fontWeight:500 
    },
    
})