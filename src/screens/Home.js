import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image ,FlatList , Dimensions , TouchableOpacity} from 'react-native'

import {coffee,foodAPI} from '../api/Api'
import FlatListItem from '../components/FlatListItem'

import {connect} from 'react-redux'
import {storeData} from '../redux/Actions/StoreData'

import CustomSearch from '../components/CustomSearch'
import ShortList from '../components/ShortList'

class Home extends Component {
    state={
        itemSortList:["All","Pizza","Chinese","Italian","Soup","Hamburger","SeaFood"],
        todayData:'',
        continentalData:null,
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData=async ()=>{
        await coffee.get().then(res=>{
            this.setState({
                todayData:res.data.hits
            })
        })

        await foodAPI("pizza").get().then(res=>{
            this.setState({
                continentalData:res.data.hits
            })
        })
    }
    

    handleShortListTab=(item)=>{
        this.props.navigation.navigate('foodList',{item,nav:this.props.navigation})
    }

    handleTabOnList=(item)=>{
        this.props.navigation.navigate('itemDetail',{item})
    }

    handleTabOnTitle=(item)=>{
        this.props.navigation.navigate('foodList',{item,nav:this.props.navigation})
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.searchView}>
                    <CustomSearch/>
                </View>

                <View style={styles.shortList}>
                    <ShortList data={this.state.itemSortList} handleShortListTab={this.handleShortListTab}/>
                </View>

                <View style={styles.todayList}>
                   <FlatListItem 
                        data={this.state.todayData} 
                        title="Today's best deals" 
                        handleTabOnList={this.handleTabOnList}
                        handleTabOnTitle={this.handleTabOnTitle}
                    />
                </View>

                <View style={styles.continental}>
                    <FlatListItem 
                        data={this.state.continentalData} 
                        title="Country Specials" 
                        handleTabOnList={this.handleTabOnList}
                        handleTabOnTitle={this.handleTabOnTitle}
                    />
                </View>
                
                <View style={styles.restaurants}>
                    <View style={styles.restaurantsTextBlock}>
                        <TouchableOpacity >
                            <Text style={styles.restaurantsText}>Restaurants</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.restaurantsImgBlock}>
                        <Image source={require('../assets/img/restaurant.png')}/>
                    </View>
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
        height:screenHight/4.5
    },

    searchView:{
        position:'absolute',
        width:'60%',
        height:screenHight/14,
        marginTop:'8%',
        marginLeft:'30%'
    },

    shortList:{
        width:'100%',
        height:(screenHight/100)*5,
        marginTop:'40%',
        justifyContent:'center',
        alignItems:'center'
    },

    todayList:{
        width:'100%',
        height:(screenHight/100)*28,
    },

    continental:{
        width:'100%',
        height:(screenHight/100)*28,
    },

    restaurants:{
        width:'100%',
        height:(screenHight/100)*5,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },

    restaurantsTextBlock:{
        width:'80%'
    },

    restaurantsText:{
        fontSize:18,
        color:'green',
        marginLeft:'5%',
        alignSelf:'flex-start'
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