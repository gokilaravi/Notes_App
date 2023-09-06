import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

const CreateNotes = (props) => {

    const inputRef = useRef();
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            getNotes();
            if (props?.route?.params?.data) {
                setNote(props?.route?.params?.data);
                inputRef.current.focus();
            }
        }, [props?.route?.params?.data])
    )

    const getNotes = () => {
        AsyncStorage.getItem("NOTES").then((notes) => {
            setNotes(JSON.parse(notes))
        })
    };

    const saveNote = async () => {
        if (note !== '') {
            if (props?.route?.params?.type === "edit") {
                const data = await AsyncStorage.getItem("NOTES")
                const notes = data ? JSON.parse(data) : [];
                let updatedNotes = [...notes]; 
                updatedNotes[props?.route?.params?.index] = note; 
                console.log("data",notes,updatedNotes);
                await AsyncStorage.setItem("NOTES", JSON.stringify(updatedNotes))
                    .then(() => navigation.navigate("Home"))
                setNote("");

            } else {
                const data = await AsyncStorage.getItem("NOTES")
                const notes = data ? JSON.parse(data) : [];
                notes.push(note);
                await AsyncStorage.setItem("NOTES", JSON.stringify(notes))
                    .then(() => navigation.navigate("Home"));
                setNote("");
            }

        } else {
            navigation.navigate("Home")
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
            <Pressable style={{ flex: 1, marginBottom: 100 }} onPress={() => inputRef.current.focus()}>
                <TextInput
                    ref={inputRef}
                    value={note}
                    onChangeText={setNote}
                    multiline={true}
                    style={{ color: "black", fontSize: 15 }}
                />
            </Pressable>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ position: 'absolute', bottom: 10, left: 50, right: 50 }}>
                <Button
                    title="Save Notes"
                    style={{ alignSelf: "center" }}
                    onPress={saveNote}
                />
            </KeyboardAvoidingView>
        </View>
    )
}
export default CreateNotes;