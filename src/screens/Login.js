import React, { Component } from 'react'
import { Text, View ,StyleSheet ,Image , ScrollView ,TouchableOpacity } from 'react-native'

import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'


import {connect} from 'react-redux'
import {setCurrentAuth} from '../redux/Actions/SetAuth'

import {auth} from '../config/config'

class Login extends Component {
    state={
        email:'',
        password:'',
        errorMsg:''
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

            default : return
        }
    }

    handleBtnClick=()=>{
        const {email,password}=this.state
        if(email.length >0 && password.length>0){

            auth.signInWithEmailAndPassword(email,password).then(user=>{
                this.props.setCurrentAuth(user)
                this.setState({
                    email:'',
                    password:'',
                    errorMsg:''
                })

            }).catch((err)=> this.setState({errorMsg:err}))
        }else{
          this.setState({errorMsg:"Invalid Inputs"})
        }

        // console.warn(this.props)
        // this.props.navigation.navigate('signUp')
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

                    <View style={styles.forgotBlock}>
                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loginBtn}>
                        <CustomButton btnText="Login" handleBtnClick={this.handleBtnClick}/>
                    </View>
                    
                </View>

                <View style={styles.signUpLinkBlock}>
                    <View style={styles.signWith}>
                        <Text style={styles.signWithText}>sign in with</Text>
                    </View>

                    <View style={styles.signWithContents}>

                        <TouchableOpacity>
                            <View style={{...styles.contents,marginLeft:'20%'}}>
                                <Image source={require('../assets/img/fb.png')} style={styles.conImg}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.contents}>
                                <Image source={require('../assets/img/mail.png')} style={styles.conImg}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signUpLink}>
                        <Text style={styles.que}>Don't have an account ?</Text>
                        <TouchableOpacity style={styles.Link} onPress={()=>console.warn(this.props.data)}>
                            <Text style={styles.Link}>Sign up</Text>
                        </TouchableOpacity>
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

    logo:{
        width:'40%',
        height:'80%',
    },

    inputBlock:{
        width:'100%',
        height:250,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'3%', 
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
        fontSize:16
    },

    loginBtn:{
        width:'80%',
        height:50,
        marginTop:'10%'
    },

    signUpLinkBlock:{
        width:'100%',
        height:'20%',
    },

    signWith:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'8%',
    },

    signWithText:{
        fontSize:18,
        opacity:0.7
    },

    signWithContents:{
        width:'100%',
        height:70,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:'2%'
    },

    contents:{
        backgroundColor:'white',
        width:50,
        height:50,
        borderRadius:25,
        marginHorizontal:'5%',
        alignItems:'center',
        justifyContent:'center',
        elevation:6,
    },

    conImg:{
        width:'80%',
        height:'80%'
    },

    signUpLink:{
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        bottom: 0,
        position:'relative'
    },

    que:{
        opacity:0.7
    },

    Link:{
        marginLeft:'1%',
        fontWeight:'bold',
        color:'#5ada58',
    }

})


const mapStateToProps=({auth:{user},data:{data}})=>{
    return{
       user,
       data
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        setCurrentAuth:user=>dispatch(setCurrentAuth(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)