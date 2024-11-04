import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from "react-redux";
import  store from './store/store.js';
import Modal from "./components/Modal";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Albums from "./components/Albums";
import Photos from "./components/Photos";


const App = () => {
  if (!__DEV__){
    console.log = ()=>{}
    console.error = ()=>{}
    console.warn = ()=>{}
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Modal" component={Modal}/>
            <Stack.Screen name="Albums" component={Albums}/>
            <Stack.Screen name="Photo" component={Photos}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>

  );
};

export default App;
