import React, { Component } from 'react'
import { Text, StyleSheet, View,Image ,Dimensions,FlatList,TouchableOpacity} from 'react-native'

import {restaurantCategories} from '../api/Api'

class RestaurantCategories extends Component {
    state={
        categoriesData:[]
    }

    componentDidMount(){
        // restaurants('').get().then(res=>{
        //     console.warn(res.data.restaurants.length)
        // })

        restaurantCategories.get().then(res=>{
            this.setState({
                categoriesData:res.data.categories
            })
            // console.warn(res.data.categories)
        })
        
    }

    renderFlatList=()=>{
        return(
            <FlatList
                data={this.state.categoriesData}
                keyExtractor={item=>item.categories.id}
                renderItem={
                    ({item})=>this.renderFlatListItem(item.categories)
                }
            />
        )
    }

    renderFlatListItem=(item)=>{
        return(
            <TouchableOpacity>
                <View style={styles.ListCart}>
                    <View style={styles.ImgBlock}>
                        <Image source={require('../assets/img/resCat.png')} style={styles.itemImg}/>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={{fontSize:23,color:'white'}}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.header}>
                    <Text style={{fontSize:25}}>Categories</Text>
                </View>

                <View style={styles.mainBlock}>
                    {this.renderFlatList()}
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
        backgroundColor:'#5ada58',
        elevation:5
    },

    ImgBlock:{
        width:'30%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    itemInfo:{
        width:'70%',
        height:'100%',
        justifyContent:'center',
    },

    // itemImg:{
    //     width:'90%',
    //     height:'90%',
    //     borderRadius:10,
    // },
})


export default RestaurantCategories