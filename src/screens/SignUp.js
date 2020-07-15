import React, { Component } from 'react'
import { Text, View ,StyleSheet ,Image , ScrollView ,TouchableOpacity } from 'react-native'

import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'

import {connect} from 'react-redux'
import {setCurrentAuth} from '../redux/Actions/SetAuth'

import {auth} from '../config/config'
import Spinner from '../components/Spinner'

class SignUp extends Component {

    state={
        email:'',
        password:'',
        confirmPassword:'',
        errorMsg:'',
        loading:false
    }

    onTextChange=(e,placeholder)=>{
        switch(placeholder){
            case "E-mail":
                this.setState({
                    email:e,
                })
                break

            case "Password":
                this.setState({
                    password:e
                })
                break

            case "Confirm-Password":
                this.setState({
                    confirmPassword:e
                })
                break

            default : return
        }

    }

    handleBtnClick=()=>{
        const {email,password,confirmPassword}=this.state
        var username=email.split('@')[0]

        this.setState({loading:true})

        if(email.length >0 && password.length>0 && confirmPassword.length >0){

            if(password===confirmPassword){
                auth.createUserWithEmailAndPassword(email,password).then(user=>{
                    this.props.setCurrentAuth(user)
                    this.setState({
                        email:'',
                        password:'',
                        confirmPassword:'',
                        errorMsg:'',
                        loading:false
                    })
                    this.props.navigation.navigate('location',{username})
                }).catch(err=>this.setState({errorMsg:err,loading:false}))
                
            }else{
                this.setState({errorMsg:'Passwords Not Matched',loading:false})
            }  
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerBlock}>
                    <Image source={require("../assets/img/layoutDesign.png")} style={styles.layout}/>
                    <Image source={require("../assets/img/logoTitle.png")} style={styles.logo}/>
                </View>

                <Image source={require("../assets/img/signUp.png")} style={styles.background}/>

                <View style={styles.inputBlock}>
                    <View style={styles.emailBlock}>
                        <InputField 
                            placeholder="E-mail" 
                            onTextChange={this.onTextChange} 
                            defaultValue={this.state.email}
                            textSecure={false}
                        />
                    </View>
                    
                    <View style={styles.passwordBlock}>
                        <InputField 
                            placeholder="Password" 
                            onTextChange={this.onTextChange} 
                            defaultValue={this.state.password}
                            textSecure={true}
                        />
                    </View>

                    <View style={styles.passwordBlock}>
                        <InputField 
                            placeholder="Confirm-Password" 
                            onTextChange={this.onTextChange} 
                            defaultValue={this.state.confirmPassword}
                            textSecure={true}
                        />
                    </View>

                
                    {
                        this.state.errorMsg ? (
                            <View style={styles.errMsgBlock}>
                                <Text style={styles.errMsgText}>{this.state.errorMsg}</Text> 
                            </View>
                        ): null
                    }
                    

                    <View style={styles.loginBtn}>
                        {
                            this.state.loading ? <Spinner size="large"/> 
                            : <CustomButton btnText="Sign Up" handleBtnClick={this.handleBtnClick}/>
                        }
                       
                    </View>
                    
                </View>

            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },

    headerBlock:{
        width:'100%',
        height:180,
        alignItems:'center',
        justifyContent:'center',
    },

    background:{
        position:'absolute',
        width:'60%',
        height:'50%',
        marginTop:'70%',
        marginLeft:'40%',
        opacity:0.5
    },

    layout:{
        width:'100%',
        height:200,
        position:'absolute',
    },

    logo:{
        width:'40%',
        height:'60%',
    },

    inputBlock:{
        width:'100%',
        height:400,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%'
    },

    emailBlock:{
        width:'80%',
        height:'20%'
    },

    passwordBlock:{
        width:'80%',
        height:'20%'
    },

    errMsgBlock:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },

    errMsgText:{
        fontSize:17,
        color:'red'
    },

    loginBtn:{
        width:'80%',
        height:50,
        marginTop:'10%'
    },

})


const mapDispatchToProps=dispatch=>{
    return{
        setCurrentAuth:user=>dispatch(setCurrentAuth(user))
    }
}


export default connect(null,mapDispatchToProps)(SignUp)