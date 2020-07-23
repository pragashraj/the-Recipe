import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,Image} from 'react-native'


class Restaurant extends Component {
    render() {
        const item=this.props.route.params.item
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.labelBlock}>
                    <Text style={styles.labelText}>{item.name}</Text>
                </View>

                <View style={styles.imgBlock}>
                    <Image source={{uri:item.thumb}} style={styles.img}/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },

    themeImg:{
        position:'absolute',
        width:'100%',
        height:Dimensions.get('screen').height/4.5
    },

    imgBlock:{
        width:'60%',
        height:'35%',
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:'7%',
        elevation:5,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    },

    img:{
        width:'99%',
        height:'99%',
        borderRadius:25,
    },

    labelBlock:{
        alignSelf:'center',
        marginTop:'10%',
    },

    labelText:{
        fontSize:22,
        color:'white',
        fontWeight:'bold'
    },
})


export default Restaurant