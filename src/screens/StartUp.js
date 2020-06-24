import React from 'react'
import { View, StyleSheet ,Image , Animated, Text} from 'react-native'

const StartUp = () => {
    return (
        <View style={styles.container}>
            <View style={styles.blocks}>
                      
                <View style={styles.logoBlock}>
                    <Image source={require("../assets/img/logo.png")} style={styles.logo}/>
                </View>
                
                <View style={styles.logoTitleBlock}>
                     <Image source={require("../assets/img/logoTitle.png")} style={styles.Title}/>
                </View>
            </View>
        </View>
    )
}


const styles=StyleSheet.create({

    blocks:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5ada58',
        // backgroundColor:'#d70f64'
    },

    logoBlock:{
        width:'80%',
        height:'40%',
        alignItems:'center',
        justifyContent:'flex-end',
    },

    logo:{
        width:'70%',
        height:'50%',
    },

    logoTitleBlock:{
        width:'80%',
        height:'40%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:'5%'
    },

    Title:{
        width:'70%',
        height:'50%'
    },


})

 export default StartUp