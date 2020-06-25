import React, { Component } from 'react'
import { Text, View ,StyleSheet ,Image , ScrollView ,TouchableOpacity } from 'react-native'

import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'

class SignUp extends Component {

    state={
        email:'',
        password:'',
        confirmPassword:''
    }

    onTextChange=(e,placeholder)=>{
        switch(placeholder){
            case "E-mail":
                this.setState({
                    email:e
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

    loginBtn:{
        width:'80%',
        height:50,
        marginTop:'10%'
    },

})

export default SignUp