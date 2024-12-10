import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Color from '../constants/Color'
import { Picker } from '@react-native-picker/picker'
import ClassesList from '../constants/ClassesList'
import CloseIcon from "../../assets/icons/CloseIcon.svg"
import AddUserIcon from "../../assets/icons/AddUserIcon.svg"
import DeleteIcon from "../../assets/icons/DeleteIcon.svg"



const ModalItem = ({ Details, handleClose, handleDataSubmission }) => {


    const [firstName, setFirstName] = useState(Details.name.split(" ")[0])
    const [lastName, setLastName] = useState(Details.name.split(" ")[1])
    const [phoneNumber, setPhoneNumber] = useState(Details.Mobile)
    const [email, setEmail] = useState(Details.email)
    const [dob, setDOB] = useState( Details.DateOfBirth)
    const [classes, setClasses] = useState(Details.Classes.split(",")[0])

    const [FamilyDetails, setFamilyDetails] = useState(Details.GuardianInformation)

    const [guardianFirstName, setGuardianFirstName] = useState("")
    const [guardianLastName, setGuardianLastName] = useState("")
    const [guardianEmail, setGuardianEmail] = useState("")
    const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("")

    const [formVisible, setFormVisible] = useState(FamilyDetails.length > 0 ? false : true)

    const handleFamilyForm = () => {

        let object = {
            GuardianName: guardianFirstName + " " + guardianLastName,
            Mobile: guardianPhoneNumber,
            Email: guardianEmail,
            PhotoURL: "https://randomuser.me/api/portraits/men/5.jpg"
        }

        FamilyDetails.push(object)
        setFormVisible(false)
    }
    const handleAddMore = () => {
        setFormVisible(true)
    }
    const hanldeFormSubmission = () => {
        let object = {
            name: firstName + " " + lastName,
            photoURL: Details.photoURL,
            Classes: classes,
            DateOfBirth: dob,
            Mobile: phoneNumber,
            email: email,
            GuardianInformation: FamilyDetails,
            Age: Details.Age,
            RegistrationNumber: Details.RegistrationNumber
        }
        handleDataSubmission(object)
        handleClose()
    }

    const handleDeletion = (value) => {
        let updatedArray = FamilyDetails.filter((item,index) => index !== value)
        setFamilyDetails(updatedArray)
    }

    return (

        <View style={styles.modalContainer}>
            <KeyboardAvoidingView behavior='height' style={styles.modalSubContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>Edit School Details</Text>
                    <TouchableOpacity onPress={() => handleClose()}>
                        
                        <CloseIcon height={22} width={22}  />
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <View style={styles.modalMiniContainer}>
                        <Image source={{ uri: Details.photoURL }} style={styles.modalImage} />
                    </View>
                    <View style={styles.modalMiniContainer}>
                        <Text style={styles.modalLabel}>First Name</Text>
                        <TextInput style={styles.modalInput} placeholder='ex: Rahul' value={firstName} onChangeText={(text) => setFirstName(text)} />
                    </View>
                    <View style={styles.modalMiniContainer}>
                        <Text style={styles.modalLabel}>Last Name</Text>
                        <TextInput style={styles.modalInput} placeholder='ex: Shaw' value={lastName} onChangeText={(text) => setLastName(text)} />
                    </View>
                    <View style={styles.modalMiniContainer}>
                        <Text style={styles.modalLabel}>Phone Number</Text>
                        <TextInput style={styles.modalInput} placeholder='ex: 1234567890' value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
                    </View>
                    <View style={styles.modalMiniContainer}>
                        <Text style={styles.modalLabel}>Email</Text>
                        <TextInput style={styles.modalInput} placeholder='ex: example@email.com' value={email} onChangeText={(text) => setEmail(text)} />
                    </View>
                    <View style={styles.modalMiniContainer}>
                        <Text style={styles.modalLabel}>Date Of Birth</Text>
                        <TextInput style={styles.modalInput} placeholder='ex: Aug 22, 1998' value={dob} onChangeText={(text) => setDOB(text)} />
                    </View>
                    <View style={styles.modalMiniContainer}>
                        <Text style={styles.modalLabel}>Select Class</Text>
                        {/* <TextInput /> */}
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={classes}
                                onValueChange={(value) => setClasses(value)}
                            >
                                {
                                    ClassesList.map((item) => <Picker.Item label={item} value={item} key={item} />)
                                }
                            </Picker>
                        </View>
                    </View>
                    <Text style={[styles.modalHeaderText, styles.modalMiniContainer]}>
                        Family Information
                    </Text>

                    <View style={styles.familyDetailsContainer}>
                        {
                            FamilyDetails.map((item, index) => <FamilyItem handleDelete={() => handleDeletion(index)} key={index} Details={item} />)
                        }
                    </View>
                    {
                        !formVisible &&

                        <TouchableOpacity onPress={() => handleAddMore()} style={[styles.Button, { alignSelf: "flex-end", margin: 20 }]}>
                            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, justifyContent: "center" }}>
                                <AddUserIcon height={20} width={20} />
                                <Text style={styles.ButtonText}>Add More</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        formVisible &&


                        <>
                            {
                                FamilyDetails.length > 1
                                    ?
                                    <Text style={[styles.modalHeaderText, styles.modalMiniContainer]}>
                                        Add more
                                    </Text>
                                    : null
                            }

                            <View style={styles.modalRowContainer}>
                                <View style={styles.modalRowMiniContainer}>
                                    <Text style={styles.modalLabel}>First Name</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder='ex: Dhiraj'
                                        value={guardianFirstName}
                                        onChangeText={(text) => setGuardianFirstName(text)}
                                    />
                                </View>
                                <View style={styles.modalRowMiniContainer}>
                                    <Text style={styles.modalLabel}>Last Name</Text>
                                    <TextInput style={styles.modalInput}
                                        placeholder='ex: Shaw'
                                        value={guardianLastName}
                                        onChangeText={(text) => setGuardianLastName(text)}
                                    />
                                </View>
                            </View>
                            <View style={styles.modalMiniContainer}>
                                <Text style={styles.modalLabel}>Phone Number</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder='ex: 1234567890'
                                    value={guardianPhoneNumber}
                                    onChangeText={(text) => setGuardianPhoneNumber(text)}
                                />
                            </View>
                            <View style={styles.modalMiniContainer}>
                                <Text style={styles.modalLabel}>Email Address</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder='ex: example@email.com'
                                    value={guardianEmail}
                                    onChangeText={(text) => setGuardianEmail(text)}
                                />
                            </View>
                            <View style={styles.modalMiniContainer}>
                                <TouchableOpacity
                                    onPress={() => handleFamilyForm()}
                                    style={[styles.Button, {  alignSelf: "flex-end" }]}
                                >
                                    <Text style={styles.ButtonText}>Save Details</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    <View style={{ height: 80 }}></View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={[styles.Button, { width: "40%" }]}
                            onPress={() => handleClose()}
                        >
                            <Text style={styles.ButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.Button, { backgroundColor: "#333333", width: "55%" }]}
                            onPress={() => hanldeFormSubmission()}
                        >
                            <Text style={[styles.ButtonText, { color: "white" }]}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ModalItem



const FamilyItem = ({ Details , handleDelete  }) => {
    return (
        <View style={styles.familyItemContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                <Image style={styles.familyItemImage} source={{ uri: Details.PhotoURL }} />
                <View style={styles.familyItemDetailsContainer}>
                    <Text style={styles.modalLabel}>{Details.GuardianName}</Text>
                    <Text style={styles.familyItemSubText}>{Details.Email}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => handleDelete()}>
                <DeleteIcon height={24} width={24} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    modalContainer:
    {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",

    },
    modalSubContainer: {
        height: "85%",
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20
    },
    modalHeaderText: {
        fontSize: 18,
        fontFamily:"Montserrat_600"
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    modalMiniContainer: {
        paddingHorizontal: 20,
        paddingBottom: 25
    },
    modalLabel: {
        fontSize: 16,
        textAlign: "left",
        fontFamily:"Montserrat_500"
    },
    modalInput: {
        paddingVertical: 19,
        borderRadius: 10,
        paddingHorizontal: 18,
        marginTop: 14,
        borderWidth: 0.5,
        borderColor: "#C4C4C480",
        fontFamily:"Montserrat_400"

    },
    pickerContainer: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#C4C4C480",
        marginTop: 14,
        paddingVertical: 8
    }
    , modalRowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingBottom: 25
    },
    modalRowMiniContainer: {
        width: "48%"
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
        fontFamily:"Montserrat_600",
        fontSize: 14,
        textAlign: "center"
    },
    ButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 33,
        justifyContent: "space-between"
    }
    , modalImage: {
        height: 80,
        width: 80,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 999
    },
    familyItemImage: {
        height: 30,
        borderRadius: 999,
        aspectRatio: 1 / 1
    },
    familyItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    familyItemSubText: {
        // fontWeight: 400,
        fontFamily:"Montserrat_400",
        fontSize: 14,
        color: Color.secondaryText
    }
})



