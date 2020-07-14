import React, { Component } from 'react'
import { Text, View ,StyleSheet ,Image , ScrollView ,TouchableOpacity } from 'react-native'

import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'

import {connect} from 'react-redux'
import {setCurrentAuth} from '../redux/Actions/SetAuth'

import {auth} from '../config/config'

class SignUp extends Component {

    state={
        email:'',
        password:'',
        confirmPassword:'',
        errorMsg:''
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

        if(email.length >0 && password.length>0 && confirmPassword.length >0){

            if(password===confirmPassword){
                auth.createUserWithEmailAndPassword(email,password).then(user=>{
                    this.props.setCurrentAuth(user)
                    this.setState({
                        email:'',
                        password:'',
                        confirmPassword:'',
                        errorMsg:''
                    })
                    this.handleNavigation('location')
                }).catch(err=>this.setState({errorMsg:err}))

            }else{
                this.setState({errorMsg:'Passwords Not Matched'})
            }  
        }
    }

    handleNavigation=(link)=>{
        this.props.navigation.navigate(link)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerBlock}>
                    <Image source={require("../assets/img/layoutDesign.png")} style={styles.layout}/>
                    <Image source={require("../assets/img/logoTitle.png")} style={styles.logo}/>
                </View>

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
                        <CustomButton btnText="Sign Up" handleBtnClick={this.handleBtnClick}/>
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
        height:140,
        alignItems:'center',
        justifyContent:'center',
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