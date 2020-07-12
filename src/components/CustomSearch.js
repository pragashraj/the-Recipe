import React,{useState} from 'react'
import { StyleSheet, View ,TextInput,Image,TouchableOpacity,Text } from 'react-native'

import {foodAPI} from '../api/Api'
import Spinner from './Spinner'

const CustomSearch = ({nav}) => {
    const [input,setInput]=useState('')
    const [loading,setLoading]=useState(false)

    const handleInputChanges=(e)=>{
        setInput(e)
    }

    const handleSearchTab=()=>{
       if(input.length>0){
            setLoading(true)
            foodAPI(input).get().then(res=>{
                nav.navigate('itemDetail',{item:res.data.hits[0].recipe})
                setLoading(false) 
            }).catch(err=>{console.warn(err)})
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
            {
                loading ? <Spinner size='large'/> :

                <View style={styles.imgBlock}>
                    <TouchableOpacity onPress={handleSearchTab}>
                        <Image source={require('../assets/img/search.png')}/>
                    </TouchableOpacity>
                </View>
        }
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
        justifyContent:'flex-end',
    },

})

export default CustomSearch