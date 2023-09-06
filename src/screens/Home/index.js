import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const Home = () => {

    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getNotes();
        }, [])
    )

    const getNotes = () => {
        AsyncStorage.getItem("NOTES").then((notes) => {
            setNotes(JSON.parse(notes))
        })
    };

    const _renderItem = ({ item, index }) => {
        return (
            <Pressable  style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10,elevation:2,backgroundColor:"#fff" }}
                onPress={() => navigation.navigate("NoteDetails", {
                    note: item,
                    index:index
                })}>
                <Text style={{ color: "black", fontSize: 15 }} numberOfLines={6}>
                    {item}
                </Text>
            </Pressable>
        )
    };

    const _renderSeparte = () => {
        return (
            <View style={{ marginTop: 10 }} />
        )
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", }}>
            <FlatList
                data={notes}
                renderItem={_renderItem}
                ItemSeparatorComponent={_renderSeparte}
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, marginTop: 10,paddingBottom:20 }}
            />
            <Pressable style={{
                backgroundColor: "#fff", borderRadius: 100,
                alignItems: "center", justifyContent: "center", height: 70, width: 70, elevation:
                    2, position: "absolute", bottom: 50, right: 20, alignSelf: "flex-end"
            }}
                onPress={() => navigation.navigate("CreateNotes")}
            >
                <Icon
                    name={"plus"}
                    type={"material-community"}
                    size={30}
                    color={"black"}

                />
            </Pressable>
        </View>
    )
}
export default Home;