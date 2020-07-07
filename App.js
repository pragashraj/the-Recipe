import React from 'react'
import { View } from 'react-native'

import {Provider} from 'react-redux'
import store from './src/redux/store'


import StartUp from './src/screens/StartUp'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Location from './src/screens/Location'
import Home from './src/screens/Home'
import ItemDetail from './src/screens/ItemDetail'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

const stack=createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen
              name="home"
              component={Home}
              options={ { headerShown:false } }
            />
            <stack.Screen
              name="startup"
              component={StartUp}
              options={ { headerShown:false } }
            />
            <stack.Screen
              name="login"
              component={Login}
              options={ { headerShown:false } }
            />
            <stack.Screen
              name="signUp"
              component={SignUp}
              options={ { headerShown:false } }
            />
            <stack.Screen
              name="location"
              component={Location}
              options={ { headerShown:false } }
            />
            <stack.Screen
              name="itemDetail"
              component={ItemDetail}
              options={ {headerShown:false} }
            />
           
          </stack.Navigator>
    </NavigationContainer>
  )
}

export default ()=>{
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}


