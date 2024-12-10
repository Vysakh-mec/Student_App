import { KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackArrowIcon from "../../assets/icons/BackArrowIcon.svg"
import SearchIcon from "../../assets/icons/SearchIcon.svg"
import FilterIcon from "../../assets/icons/FilterIcon.svg"
import Color from '../constants/Color'
import CloseIcon from "../../assets/icons/CloseIcon.svg"
import { Picker } from '@react-native-picker/picker'
import ClassesList from "../constants/ClassesList"

const HeaderHomeScreen = ({ handleTextChange, handleClassChange }) => {

    const [visible, setVisible] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedClass , setSelectedClass] = useState(ClassesList[0])
     
    const handleClear = () => {
        handleClassChange("")
        setShowModal(false)
    }
    
    const handleForm = () => {
        handleClassChange(selectedClass)
        setShowModal(false)
    }
    
    return (
        <View style={styles.container}>
            <View style={[styles.subContainer, { flex: 1 }]}>
                
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <BackArrowIcon height={24} width={24} color={"black"} />

                </TouchableOpacity>
                {
                    visible ?
                        <TextInput onChangeText={(text) => handleTextChange(text)} style={styles.Input} placeholder='Search For Name Or Register Number' />
                        :
                        <Text style={styles.headerText}>🧑🏻‍🎓 Student List</Text>
                }
            </View>
            <View style={styles.subContainer}>
                {
                    !visible &&
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <SearchIcon height={24} width={24} color={"black"} />
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <FilterIcon height={17.45} width={16} color={"black"} />
                </TouchableOpacity>
            </View>

            {/* MODALLL */}

            {showModal &&
                <View>
                    <Modal animationType='fade' transparent statusBarTranslucent>
                        <View style={styles.modalContainer}>
                            <KeyboardAvoidingView style={styles.modalSubContainer}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalHeaderText}>Choose Filters</Text>
                                    <TouchableOpacity onPress={() => setShowModal(false)}>
                                        <CloseIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalBody}>
                                    <View style={styles.modalMiniContainer}>
                                        <Text style={styles.modalLabel}>Select Class</Text>
                                        {/* <TextInput /> */}
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedClass}
                                                onValueChange={(value) => setSelectedClass(value)}
                                            >
                                                {
                                                    ClassesList.map((item) => <Picker.Item label={item} value={item} key={item} />)
                                                }
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={styles.ButtonContainer}>
                                        <TouchableOpacity
                                            style={[styles.Button, { width: "40%" }]}
                                            onPress={() => handleClear()}
                                        >
                                            <Text style={styles.ButtonText}>Clear Filter</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.Button, { backgroundColor: "#333333", width: "55%" }]}
                                            onPress={() => handleForm()}
                                        >
                                            <Text style={[styles.ButtonText, { color: "white" }]}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            }

        </View>
    )
}


export default HeaderHomeScreen

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    headerText: {
        fontSize: 18,
        fontFamily: "Montserrat_500",
    },
    Input: {
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: Color.secondaryText,
        borderRadius: 10,
        flex: 1,
        marginRight: 10
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    modalHeaderText: {
        fontSize: 18,
        fontFamily: "Montserrat_600"
    },
    modalContainer:
    {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",

    },
    modalSubContainer: {
        height: "70%",
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20
    },
    modalMiniContainer: {
        paddingHorizontal: 20,
        paddingBottom: 25
    },
    modalLabel: {
        fontSize: 16,
        textAlign: "left",
        fontFamily: "Montserrat_500"
    },
    pickerContainer: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#C4C4C480",
        marginTop: 14,
        paddingVertical: 8
    },
    Button: {
        borderWidth: 0.5,
        borderColor: "#777777",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        width: 150
    },
    ButtonText: {
        fontFamily: "Montserrat_600",
        fontSize: 14,
        textAlign: "center"
    },
    ButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 33,
        justifyContent: "space-between",
    },
    modalBody:{
        justifyContent:"space-between",
        flex:1
    }

})