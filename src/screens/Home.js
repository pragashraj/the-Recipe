import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image ,FlatList , Dimensions , TouchableOpacity} from 'react-native'

import {coffee,foodAPI} from '../api/Api'
import FlatListItem from '../components/FlatListItem'

import {connect} from 'react-redux'
import {storeData} from '../redux/Actions/StoreData'

import CustomSearch from '../components/CustomSearch'


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

    handleTabOnList=(e)=>{
        this.props.navigation.navigate('itemDetail',{item:e})
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.searchView}>
                    <CustomSearch/>
                </View>

                <View style={styles.shortList}>
                    {this.renderFlatList(this.state.itemSortList)}
                </View>

                <View style={styles.todayList}>
                   <FlatListItem data={this.state.todayData} title="Today's best deals" handleTabOnList={this.handleTabOnList}/>
                </View>

                <View style={styles.continental}>
                    <FlatListItem data={this.state.continentalData} title="Country Specials" handleTabOnList={this.handleTabOnList}/>
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