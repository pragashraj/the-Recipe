import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image ,FlatList , Dimensions , TouchableOpacity} from 'react-native'

// import Api from '../api/Api'
import {coffee,pizza} from '../api/Api'
import RecipePoster from '../components/RecipePoster'

class Home extends Component {
    state={
        data:'',
        itemSortList:["All","Pizza","Chinese","Italian","Soup","Hamburger","SeaFood"],
        pzData:null
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData=async ()=>{
        // Api.get().then(res=>{
        //     // console.warn(res.data.hits[0])
        //     this.setState({
        //             data:res.data.hits
        //     })
        // })

        coffee.get().then(res=>{
            this.setState({
                data:res.data.hits
            })
        })

        pizza.get().then(res=>{
            this.setState({
                pzData:res.data.hits
            })
        })
    }

    renderFlatListItem=(item,ref,index)=>{
        switch(ref){
            case "shortList":
                return(
                    <View style={styles.shortListItemView}>
                        <TouchableOpacity>
                            <Text style={
                                index === 0 ? {...styles.shortListItem, color:'green'} : {...styles.shortListItem}                         
                            }>{item}</Text>
                        </TouchableOpacity>
                    </View>
                )

            case "poster":
                return(
                    <View style={styles.img}>
                        <TouchableOpacity>
                            <RecipePoster uri={item.recipe.image}/>
                        </TouchableOpacity>
                    </View>
                )
                
            default : return null
        }
    }

    renderFlatList=(data,ref)=>{
        return(
            <FlatList
                data={data}
                keyExtractor={()=>Math.random()}
                renderItem={
                    ({item,index})=>this.renderFlatListItem(item,ref,index)
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
                    {this.renderFlatList(this.state.itemSortList,"shortList")}
                </View>

                <View style={styles.todayList}>
                    <View style={styles.ListTitleView}>
                        <Text style={styles.ListTitle}>Today's best deals</Text>
                    </View>
                    <View style={styles.ListComponent}>
                        {
                            this.renderFlatList(this.state.data,"poster")
                        }
                    </View>
                </View>

                <View style={styles.continental}>
                    <View style={styles.ListTitleView}>
                        <Text style={styles.ListTitle}>Continental</Text>
                    </View>
                    <View style={styles.ListComponent}>
                        {
                            this.renderFlatList(this.state.pzData,"poster")
                        }
                    </View>
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
        // backgroundColor:'yellow',
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
        // backgroundColor:'pink',
        // marginTop:'0%'
    },

    ListTitleView:{
        // backgroundColor:'yellow',
        width:'100%',
        height:'20%',
        justifyContent:'center',
    },

    ListTitle:{
        fontSize:18,
        color:'green',
        marginLeft:'10%',
        fontWeight:'900'
    },


    ListComponent:{
        // backgroundColor:'yellow',
        width:'94%',
        marginLeft:'6%'
    },

    img:{
        width:250,
        height:150,
        // marginTop:'3%',
        marginLeft:10
    },

    continental:{
        width:'100%',
        height:'30%',
        // backgroundColor:'green',
        // marginTop:'0%'
    },

    restaurants:{
        width:'100%',
        height:'10%',
        backgroundColor:'silver',
        // marginTop:'0%'
    },
})


export default Home