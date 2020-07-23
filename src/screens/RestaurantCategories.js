import React, { Component } from 'react'
import { Text, StyleSheet, View,Image ,Dimensions,FlatList,TouchableOpacity} from 'react-native'

import {restaurantCategories,restaurants} from '../api/Api'
import ShortList from '../components/ShortList'
import Spinner from '../components/Spinner'

class RestaurantCategories extends Component {
    state={
        categoriesData:[],
        shortList:[],
        loading:true,
        index:0
    }

    componentDidMount (){
        this.fetchResData('Delivery')
        this.fetchCategories()
    }

    fetchCategories=async()=>{
        await restaurantCategories.get().then(res=>{
            var data=res.data.categories
            var shortList=[]
            data.map(item=>{
                shortList.push(item.categories.name)
            })
            this.setState({
                categoriesData:res.data.categories,
                shortList
            })
        })
    }

    fetchResData=async(type)=>{
        await restaurants(type).get().then(res=>{
            var data=res.data.restaurants
            var categoriesData=[]
            data.map(item=>{
                categoriesData.push(item.restaurant.name)
            })
            this.setState({
                categoriesData:res.data.restaurants,
                loading:false
            })
        })
    }

    renderFlatList=()=>{
        return(
            <FlatList
                data={this.state.categoriesData}
                keyExtractor={item=>item.restaurant.R.res_id}
                renderItem={
                    ({item})=>this.renderFlatListItem(item.restaurant)
                }
            />
        )
    }

    renderFlatListItem=(item)=>{
        return(
            <TouchableOpacity onPress={()=>this.handleTabOnCart(item)}>
                <View style={styles.ListCart}>
                    <View style={styles.ImgBlock}>
                        <Image source={item.thumb ? {uri:item.thumb}:require('../assets/img/resCat.png')} style={styles.itemImg}/>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={{fontSize:20,color:'black'}}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    handleShortListTab=(type,index)=>{
        this.setState({
            loading:true,
            index
        })
        this.fetchResData(type)
    }

    handleTabOnCart=(item)=>{
        this.props.navigation.navigate('restaurant',{item})
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.header}>
                    <Text style={{fontSize:25}}>Categories</Text>
                </View>

                <View style={styles.shortList}>
                    <ShortList data={this.state.shortList} handleShortListTab={this.handleShortListTab} indeX={this.state.index}/>
                </View>

                <View style={styles.mainBlock}>
                    {
                        this.state.loading ? <Spinner size="large"/> :
                        this.renderFlatList()
                    }
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

    header:{
        width:'80%',
        marginLeft:'10%',
        height:(screenHight/100)*10,
        backgroundColor:'white',
        elevation:2,
        marginTop:'25%',
        justifyContent:'center',
        alignItems:'center'
    },

    shortList:{
        width:'100%',
        height:(screenHight/100)*5,
        marginTop:'1%',
        justifyContent:'center',
        alignItems:'center'
    },

    mainBlock:{
        width:'94%',
        marginLeft:'3%',
        marginTop:'5%',
        height:'70%'
    },

    ListCart:{
        width:'100%',
        height:50,
        marginTop:'5%',
        flexDirection:'row',
        backgroundColor:'white',
        elevation:5,
    },

    ImgBlock:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    itemInfo:{
        width:'80%',
        height:'100%',
        justifyContent:'center',
    },

    itemImg:{
        width:'80%',
        height:'80%',
        borderRadius:10,
    },
})


export default RestaurantCategories