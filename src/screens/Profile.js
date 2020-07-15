import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,Image,FlatList ,TouchableOpacity} from 'react-native'

import {connect} from 'react-redux'

import {fbase,database} from '../config/config'

class Profile extends Component {
    state={
        links:[
            {title:"My Account",img:require('../assets/img/account.png'),id:'1'},
            {title:"Settings",img:require('../assets/img/settings.png'),id:'2'},
            {title:"Log out",img:require('../assets/img/logout.png'),id:'3'},
        ],

        accCart:false,
        settCart:false,
        logCart:false,
        profileData:{
            location:{area:"",city:""},
            uid:"",
            username:"Kamal"
        },
    }


    componentDidMount(){
        // database.ref()
        const uid=fbase.auth().currentUser.uid
        var data
        database.ref('Users').child(uid).on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) data=snapshot.val()
        })
        
        this.setState({
            profileData:data
        })
    }

    renderHiddenCart=(item)=>{
        switch(item){
            case "My Account":
                if(this.state.accCart){
                    return(
                        <View style={styles.hiddenCart}>

                        </View>
                    )
                }else{return null}

            case "Settings":
                if(this.state.settCart){
                    return(
                        <View style={styles.hiddenCart}>

                        </View>
                    )
                }else{return null}

            default : return
        }
    }

    setAction=(item)=>{
        switch(item){
            case "My Account":
                this.setState({accCart:!this.state.accCart,settCart:false})
                break;
        
            case "Settings":
                this.setState({settCart:!this.state.settCart,accCart:false})
                break;

            case "Log out":
                this.logOut()
                break;

            default : return null
        }
    }

    logOut=()=>{
        // this.props.navigation.navigate('login')
    }

    renderList=()=>{
        return(
            <FlatList
                data={this.state.links}
                keyExtractor={item=>item.id}
                renderItem={
                    ({item})=>{
                        return(
                            <View>
                                <TouchableOpacity style={styles.topics} onPress={()=>this.setAction(item.title)}>
                                    <View style={{...styles.topicImg,...styles.center}}>
                                        <Image source={item.img}/>
                                    </View>
                                    <View style={styles.topicTitle}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                                {this.renderHiddenCart(item.title) }
                             </View>   
                        )
                    }
                }
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>   

                <View style={styles.header}>
                    <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>
                    <Image source={require('../assets/img/acc.png')} style={styles.backImg}/>

                    <View style={styles.headerBlock}>
                        <View style={{...styles.infoBlock}}>
                            <Text style={styles.name}>{this.state.profileData.username.toUpperCase()}</Text>
                            <Text style={styles.address}>{this.state.profileData.location.area}</Text>
                        </View>

                        <View style={{...styles.imgBlock,...styles.center}}>
                            <View style={{...styles.circularView,...styles.center}}>
                                <Text style={styles.nameTag}>{this.state.profileData.username.slice(0,1).toUpperCase()}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.mainBlock}> 
                    {this.renderList()}
                </View>

            </View>
        )
    }
}

var screenHight=Dimensions.get('screen').height
const styles = StyleSheet.create({

    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },

    themeImg:{
        position:'absolute',
        width:'100%',
        height:'100%'
    },

    backImg:{
        position:'absolute',
        width:400,
        height:450,
        marginTop:'70%',
    },

    header:{
        position:'absolute',
        width:'100%',
        height:screenHight/4.5
    },

    headerBlock:{
        width:'80%',
        height:'40%',
        marginTop:'7%',
        marginLeft:'20%',
        flexDirection:'row'
    },

    infoBlock:{
        width:'70%',
        height:'100%',
        alignItems:'flex-end',
        justifyContent:'center'
    },

    name:{
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    },

    address:{
        fontSize:13,
        color:'white'
    },

    imgBlock:{
        width:'30%',
        height:'100%',
    },

    circularView:{
        width:50,
        height:50,
        backgroundColor:'white',
        borderRadius:25
    },

    nameTag:{
        fontSize:28,
        color:'green'
    },

    center:{
        justifyContent:'center',
        alignItems:'center'
    },

    mainBlock:{
        width:'100%',
        height:'70%',
        marginTop:'40%',
    },

    topics:{
        width:'96%',
        marginLeft:'2%',
        marginTop:'10%',
        backgroundColor:'#5ada58',
        borderBottomWidth:0.3,
        flexDirection:'row',
        elevation:5
    },

    topicImg:{
        width:'20%',
    },

    topicTitle:{
        width:'80%',
        justifyContent:'center'
    },

    title:{
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    },

    hiddenCart:{
        width:'100%',
        height:250,
        backgroundColor:'white',
        elevation:3
    },
    
})



export default Profile