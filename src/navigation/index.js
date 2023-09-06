

import * as React from 'react';
import { Platform } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import CreateNotes from '../screens/CreateNotes';
import NoteDetails from '../screens/NoteDetails';

const Stack = createNativeStackNavigator();


const RootNavigation = () => {

    const screenOptions = Platform.OS === "ios" ? {
        ...TransitionPresets.ModalSlideFromBottomIOS,
    } : {
        ...TransitionPresets.FadeFromBottomAndroid,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{
                headerTintColor: "black",
                headerTitleAlign: "center",
                animation: 'fade',
                ...screenOptions
            }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateNotes" component={CreateNotes} options={{
                    headerTitle: "Create Note"
                }} />
                <Stack.Screen name="NoteDetails" component={NoteDetails} options={{
                    headerTitle: "Note"
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;