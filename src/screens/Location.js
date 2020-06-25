import React, { Component } from 'react'
import { Text, StyleSheet, View , Image} from 'react-native'

import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'

class Location extends Component {

    state={
        city:'',
        area:''
    }

    onTextChange=(e,placeholder)=>{
        switch(placeholder){
            case "Enter City":
                this.setState({
                    city:e
                })
                break

            case "Enter Area":
                this.setState({
                    area:e
                })
                break

            default : return
        }
    }

    handleBtnClick=()=>{

    }

    render() {
        return (
            <View style={styles.container}>
               <View style={styles.mapView}>
                    <Image source={require('../assets/img/map.jpg')} />
               </View>
               <View style={styles.inputForm}>
                    <View style={styles.input}>
                        <InputField 
                            placeholder="Enter City" 
                            onTextChange={this.onTextChange} 
                            defaultValue={this.state.city}
                            textSecure={false}
                        />
                    </View>

                    <View style={styles.input}>
                        <InputField 
                            placeholder="Enter Area" 
                            onTextChange={this.onTextChange} 
                            defaultValue={this.state.area}
                            textSecure={false}
                        />
                    </View>

                    <View style={styles.continueBtn}>
                        <CustomButton btnText="Continue" handleBtnClick={this.handleBtnClick}/>
                    </View>

               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },

    mapView:{
        width:'100%',
        height:'100%',
        position:'absolute'
    },

    inputForm:{
        width:'100%',
        height:'40%',
        backgroundColor:'#5ada58',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        marginTop:'100%',
        elevation:1,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0
    },

    input:{
        width:'80%',
        height:40,
        backgroundColor:'white',
        elevation:2,
        borderRadius:5,
        marginTop:'5%'
    },

    continueBtn:{
        width:'80%',
        height:40,
        borderWidth:0.4,
        marginTop:'3%',
    },


})

export default Location