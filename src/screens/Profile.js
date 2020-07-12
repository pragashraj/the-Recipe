import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,Image,FlatList ,TouchableOpacity} from 'react-native'

class Profile extends Component {
    state={
        links:[
            {title:"My Account",img:require('../assets/img/account.png'),id:'1'},
            {title:"Settings",img:require('../assets/img/settings.png'),id:'2'},
            {title:"Log out",img:require('../assets/img/logout.png'),id:'3'},
        ],

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
                                <TouchableOpacity style={styles.topics}>
                                    <View style={{...styles.topicImg,...styles.center}}>
                                        <Image source={item.img}/>
                                    </View>
                                    <View style={styles.topicTitle}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
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
                    <View style={styles.headerBlock}>
                        <View style={{...styles.infoBlock}}>
                            <Text style={styles.name}>Gorge Nelson</Text>
                            <Text style={styles.address}>Seastreet,Negombo</Text>
                        </View>

                        <View style={{...styles.imgBlock,...styles.center}}>
                            <View style={{...styles.circularView,...styles.center}}>
                                <Text style={styles.nameTag}>G</Text>
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
        fontSize:11,
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
        backgroundColor:'white',
        borderBottomWidth:0.3,
        flexDirection:'row',
    },

    topicImg:{
        width:'20%',
    },

    topicTitle:{
        width:'80%',
        justifyContent:'center'
    },

    title:{
        fontSize:18
    },
    
})


export default Profile