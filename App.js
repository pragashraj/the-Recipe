import React from 'react'
import { Image } from 'react-native'

import {Provider} from 'react-redux'
import store from './src/redux/store'


import StartUp from './src/screens/StartUp'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Location from './src/screens/Location'
import Home from './src/screens/Home'
import ItemDetail from './src/screens/ItemDetail'
import FoodList from './src/screens/FoodList'
import Basket_Payment from './src/screens/Basket_Payment'
import Profile from './src/screens/Profile'
import RestaurantCategories from './src/screens/RestaurantCategories'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import home from './src/assets/img/home.png'
import basket from './src/assets/img/basket.png'
import profile from './src/assets/img/profile.png'

const stack=createStackNavigator()
const bottomTab=createBottomTabNavigator()

const authFlow=()=>{
  return(
    <stack.Navigator>
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
  </stack.Navigator>
  )
}


const mainFlow=()=>{
  return(
    <bottomTab.Navigator>
      <bottomTab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: () => {
              return <Image source={home}/>
            },
            
            title:"home",
          }}
      />
      <bottomTab.Screen
          name="basket_payment"
          component={Basket_Payment}
          options={{
            tabBarIcon: () => {
              return <Image source={basket} />
            },
            title:"basket"
          }}
      />
      <bottomTab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: () => {
              return <Image source={profile} />
            },
            title:"profile"
          }}
      />
    </bottomTab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen
            name="authFlow"
            component={authFlow}
            options={ { headerShown:false } }
            />

            <stack.Screen
              name="mainFlow"
              component={mainFlow}
              options={ { headerShown:false } }
            />

            <stack.Screen
              name="itemDetail"
              component={ItemDetail}
              options={ {headerShown:false} }
            />
            <stack.Screen
              name="foodList"
              component={FoodList}
              options={ {headerShown:false} }
            />

            <stack.Screen
              name="restaurantCategories"
              component={RestaurantCategories}
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


