import React, { Component } from 'react'
import { Text, StyleSheet, View , Platform, Alert} from 'react-native'

import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'

import MapView ,{PROVIDER_GOOGLE,Marker,Callout}from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request , PERMISSIONS} from 'react-native-permissions'

import {connect} from 'react-redux'

import Spinner from '../components/Spinner'

import {database} from '../config/config'

class Location extends Component {

    state={
        city:'',
        address:'',
        initialRegion:{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        loading:true
    }

    componentDidMount(){
        this.requestPermissions()
    }

    onTextChange=(e,placeholder)=>{
        this.setState({
            [placeholder]:e
        })
    }

    handleBtnClick=()=>{
        this.props.navigation.navigate('mainFlow')
    }


    requestPermissions= async()=>{
        if(Platform.OS==='android'){
             var response =await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
             if(response==='granted'){
                this.locateCurrentPosition()
             }
        }
    }


    locateCurrentPosition=()=>{
        Geolocation.getCurrentPosition(
            pos=>{
                let initialRegion={
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
                this.setState({initialRegion,loading:false})
            },
            err=> Alert.alert(err.message),
            {enableHighAccuracy:true,timeout:10000, maximumAge:1000}
        )
    }


    renderInputFieldView=()=>{
        return(
            <View style={styles.inputForm}>
                <View style={styles.input}>
                    <InputField 
                        placeholder="city" 
                        onTextChange={this.onTextChange} 
                        defaultValue={this.state.city}
                        textSecure={false}
                    />
                </View>

                <View style={styles.input}>
                    <InputField 
                        placeholder="address" 
                        onTextChange={this.onTextChange} 
                        defaultValue={this.state.address}
                        textSecure={false}
                    />
                </View>

                <View style={styles.continueBtn}>
                    <CustomButton btnText="Continue" handleBtnClick={this.handleBtnClick}/>
                </View>

            </View>
        )
    }

    renderMapView=()=>{
        return(
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={map=>this._map=map}
                region={this.state.initialRegion}
                showsUserLocation={true}
                style={styles.mapView}
            >

                <Marker
                    coordinate={{
                        latitude:this.state.initialRegion.latitude,
                        longitude: this.state.initialRegion.longitude,
                    }}
                >
                    <Callout>
                        <Text>Your Current Location</Text>
                    </Callout>
                </Marker>
            </MapView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
               {
                   this.state.loading ? <Spinner size="large"/>:
                   this.renderMapView()
               }
               {
                    this.state.loading ? null:
                   this.renderInputFieldView()
               }
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        
    },

    mapView:{
        width:'100%',
        height:'100%',
        position:'absolute'
    },

    inputForm:{
        width:'100%',
        height:'35%',
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
        height:50,
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

const mapStateToProps=({auth:{user}})=>{
    return{
       user,
    }
}

export default connect(mapStateToProps)(Location)