import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, DetailScreen } from './screens';
import io from 'socket.io-client';



const Stack = createNativeStackNavigator();
/*Only use my computer IP 192.168.1.136 for development in local.
For production I need de IP of server*/

export const socket = io("http://192.168.1.136:3000");

socket.on('connect', () => {
  //const [cryptoDataLoadedHome, setcryptoDataLoadedHome] = useState(false);
  console.log('socket is conected');
  //setcryptoDataLoadedHome(true);
  //loaded(true);
  //console.log(loaded + 'app');
});


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;