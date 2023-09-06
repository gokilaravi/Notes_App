import React, { useState } from "react";
import { KeyboardAvoidingView, Pressable, ScrollView, Text,  } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button,Icon } from "react-native-elements";

const NoteDetails = (props) => {

    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);
    const [singleNote, setSingleNote] = useState(props?.route?.params?.note);

    useFocusEffect(
        React.useCallback(() => {
            getNotes();
            navigation.setOptions({
                headerRight:_renderHeaderRight
            })
        }, [])
    )

    const _renderHeaderRight=()=>{
        return(
            <Pressable onPress={()=>navigation.navigate("CreateNotes",{
                type:"edit",
                data:singleNote,
                index:props?.route?.params?.index
            })}>
                <Icon 
                name={"edit"}
                type={"material-communtiy"}
                size={20}
                />
            </Pressable>
        )
    }

    const getNotes = () => {
        AsyncStorage.getItem("NOTES").then((notes) => {
            setNotes(JSON.parse(notes))
        })
    };

    const deleteNote = async () => {
        const newNotes = await notes.filter((note) => note !==singleNote)
        await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes))
            .then(() => navigation.navigate("Home"))
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff", padding: 10 }}>
            <Text style={{ color: "black", fontSize: 15 }}>{singleNote}</Text>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ position: 'absolute', bottom: 10, left: 50, right: 50 }}>
                <Button
                    title="Delete Notes"
                    style={{ alignSelf: "center" }}
                    onPress={deleteNote}
                />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
export default NoteDetails;