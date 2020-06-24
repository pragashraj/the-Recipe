import React, { Component } from 'react'
import { Text, View ,StyleSheet ,Image , ScrollView ,TouchableOpacity } from 'react-native'

import InputField from '../components/InputField'

class Login extends Component {
    state={
        email:'',
        password:''
    }

    onEmailText=(e)=>{
        this.setState({
            email:e
        })
    }

    onPasswordText=(e)=>{
        this.setState({
            password:e
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerBlock}>
                   <Image source={require("../assets/img/logoTitle.png")} style={styles.logo}/>
                </View>

                <View style={styles.inputBlock}>
                    <View style={styles.emailBlock}>
                        <InputField 
                            placeholder="E-mail" 
                            onTextChange={this.onEmailText} 
                            defaultValue={this.state.email}
                            textSecure={false}
                        />
                    </View>
                    
                    <View style={styles.passwordBlock}>
                        <InputField 
                            placeholder="Password" 
                            onTextChange={this.onPasswordText} 
                            defaultValue={this.state.password}
                            textSecure={true}
                        />
                    </View>

                    <View style={styles.forgotBlock}>
                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={styles.signUpLinkBlock}></View>
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

    logo:{
        width:'40%',
        height:'60%',
    },

    inputBlock:{
        width:'100%',
        height:300,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'green'
    },

    emailBlock:{
        width:'80%',
        height:'30%'
    },

    passwordBlock:{
        width:'80%',
        height:'30%'
    },

    forgotBlock:{
        width:'80%',
        alignItems:'flex-end'
    },

    forgotText:{
        color:'#5ada58',
        fontWeight:'bold',
        fontSize:17
    },

    signUpLinkBlock:{
        width:'100%',
        height:'20%',
        // backgroundColor:'violet'
    },

})


export default Login