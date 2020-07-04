import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image ,FlatList , Dimensions , TouchableOpacity} from 'react-native'

import {coffee,foodAPI} from '../api/Api'
import FlatListItem from '../components/FlatListItem'

import {connect} from 'react-redux'
import {storeData} from '../redux/Actions/StoreData'

import axios from 'axios'

class Home extends Component {
    state={
        data:'',
        itemSortList:["All","Pizza","Chinese","Italian","Soup","Hamburger","SeaFood"],
        preInheritFoods:["pizza","chinese","italian","soup","Hamburger","seaFood","cake"],
        pzData:null,
        foodData:[],
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData=async ()=>{
        await coffee.get().then(res=>{
            this.setState({
                data:res.data.hits
            })
        })

        foodAPI("Pizza").get().then(res=>{
            this.setState({
                pzData:res.data.hits
            })
        })
    }

    renderFlatListItem=(item,index)=>{
        return(
            <View style={styles.shortListItemView}>
                <TouchableOpacity>
                    <Text style={
                        index === 0 ? {...styles.shortListItem, color:'green'} : {...styles.shortListItem}                         
                    }>{item}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderFlatList=(data)=>{
        return(
            <FlatList
                data={data}
                keyExtractor={()=>Math.random().toString()}
                renderItem={
                    ({item,index})=>this.renderFlatListItem(item,index)
                }
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.shortList}>
                    {this.renderFlatList(this.state.itemSortList)}
                </View>

                <View style={styles.todayList}>
                   <FlatListItem data={this.state.data} title="Today's best deals"/>
                </View>

                <View style={styles.continental}>
                    <FlatListItem data={this.state.pzData} title="Continental"/>
                </View>
                
                <View style={styles.restaurants}></View>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container:{
        width:'100%',
        height:'100%'
    },

    themeImg:{
        position:'absolute',
        width:'100%',
        height:Dimensions.get('screen').height/4.5
    },

    shortList:{
        width:'100%',
        height:'5%',
        marginTop:'40%',
        justifyContent:'center',
        alignItems:'center'
    },

    shortListItemView:{
        justifyContent:'center',
        alignItems:'center'
    },

    shortListItem:{
        fontSize:16,
        marginRight:5,
        marginLeft:10,
        opacity:0.5
    },

    todayList:{
        width:'100%',
        height:'30%',
    },

    continental:{
        width:'100%',
        height:'30%',
    },

    restaurants:{
        width:'100%',
        height:'10%',
        backgroundColor:'silver',
    },
})


const mapStateToProps=({auth:{user}})=>{
    return{
       user
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        storeData:data=>dispatch(storeData(data))
    }
}


export default connect(mapStateToProps)(Home)