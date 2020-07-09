import React,{useState} from 'react'
import { StyleSheet, View ,TextInput,Image,TouchableOpacity } from 'react-native'

import {foodAPI} from '../api/Api'

const CustomSearch = () => {
    const [input,setInput]=useState('')

    const handleInputChanges=(e)=>{
        setInput(e)
    }
    const handleSearchTab=()=>{
       if(input.length>0){
           console.warn(input)
       }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={e=>handleInputChanges(e)}
                defaultValue={input}
            />
            <View style={styles.imgBlock}>
                <TouchableOpacity onPress={handleSearchTab}>
                    <Image source={require('../assets/img/search.png')} style={styles.img}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flexDirection:'row'
    },

    input:{
        borderBottomWidth:1,
        fontSize:18,
        width:'80%',
        borderBottomColor:'white',
        color:'white'
    },

    imgBlock:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },

})

export default CustomSearch