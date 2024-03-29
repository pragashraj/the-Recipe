import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity} from 'react-native'

import {coffee, foodAPI} from '../api/Api'
import FlatListItem from '../components/FlatListItem'

import CustomSearch from '../components/CustomSearch'
import ShortList from '../components/ShortList'

import Spinner from '../components/Spinner'

class Home extends Component {
    state = {
        itemSortList: ["All","Pizza","Chinese","Italian","Soup","Hamburger","SeaFood"],
        todayData: '',
        continentalData: null,
        loadingMeals: true,
        loadingCountries: true
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = async() => {
        try {
            const coffeeRes = await coffee.get()
            this.setState({
                todayData: coffeeRes.data.hits,
                loadingMeals: false
            })

            const pizzaRes = await foodAPI("pizza").get()
            this.setState({
                continentalData: pizzaRes.data.hits,
                loadingCountries: false
            })
        } catch(e) {
            console.log(e)
        }
    }
    

    handleShortListTab = (item) => {
        this.props.navigation.navigate('foodList',{item, nav: this.props.navigation})
    }

    handleTabOnList = (item) => {
        this.props.navigation.navigate('itemDetail', {item})
    }

    handleTabOnTitle = (item) => {
        this.props.navigation.navigate('foodList', {item, nav: this.props.navigation})
    }

    handleTabOnRestaurantCategories = () => {
        this.props.navigation.navigate('restaurantCategories', {nav: this.props.navigation})
    }

    render() {
        return (
            <View style = {styles.container}>
                <Image source = {require('../assets/img/theme.png')} style = {styles.themeImg}/>

                <View style = {styles.searchView}>
                    <CustomSearch nav = {this.props.navigation}/>
                </View>

                <View style = {styles.shortList}>
                    <ShortList data = {this.state.itemSortList} handleShortListTab = {this.handleShortListTab} indeX = {0}/>
                </View>

                <View style = {styles.todayList}>
                    {
                        this.state.loadingMeals ? <Spinner size = "large"/> 
                        :
                        <FlatListItem 
                                data = {this.state.todayData} 
                                title = "Today's best deals" 
                                handleTabOnList = {this.handleTabOnList}
                                handleTabOnTitle = {this.handleTabOnTitle}
                        />
                    }
                </View>

                <View style = {styles.continental}>
                {
                    this.state.loadingCountries ? <Spinner size="large"/> 
                    :
                    <FlatListItem 
                        data = {this.state.continentalData} 
                        title = "Country Specials" 
                        handleTabOnList = {this.handleTabOnList}
                        handleTabOnTitle = {this.handleTabOnTitle}
                    />
                }
                </View>
                
                <View style = {styles.restaurants}>
                    <View style = {styles.restaurantsTextBlock}>
                        <TouchableOpacity onPress = {this.handleTabOnRestaurantCategories}>
                            <Text style = {styles.restaurantsText}>Restaurants</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.restaurantsImgBlock}>
                        <Image source = {require('../assets/img/restaurant.png')}/>
                    </View>
                </View>
            </View>
        )
    }
}

var screenHight = Dimensions.get('screen').height

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
        height:(screenHight/100)*23,
    },

    continental:{
        width:'100%',
        height:(screenHight/100)*23,
        marginTop:'3%'
    },

    restaurants:{
        width:'100%',
        height:(screenHight/100)*5,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:'5%',
        
    },

    restaurantsTextBlock:{
        width:'80%',
        marginLeft:'3%'
    },

    restaurantsText:{
        fontSize:18,
        color:'green',
        marginLeft:'5%',
        alignSelf:'flex-start'
    },
})

export default Home