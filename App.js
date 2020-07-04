import React from 'react'
import { View } from 'react-native'

import {Provider} from 'react-redux'
import store from './src/redux/store'


import StartUp from './src/screens/StartUp'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Location from './src/screens/Location'
import Home from './src/screens/Home'

const App = () => {
  return (
    <View>
      <Home/>
    </View>
  )
}

export default ()=>{
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}


