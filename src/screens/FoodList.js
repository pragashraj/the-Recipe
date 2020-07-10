import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View,Image ,Dimensions,TouchableOpacity,FlatList} from 'react-native'

import {foodAPI} from '../api/Api'
import RecipeInfoCard from '../components/RecipeInfoCard'

import Spinner from '../components/Spinner'

const FoodList = (props) => {
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(true)
    const params=props.route.params

    useEffect(()=>{

        foodAPI("pizza").get().then(res=>{
            setData(res.data.hits)
            setLoading(false)
        })

    },[])

    const handleTabOnList=(item)=>{
        params.nav.navigate('itemDetail',{item})
    }


    const renderFlatListItem=(item,index)=>{
        return(
            index === 0 ? null : index === 1 ? null :
            <TouchableOpacity onPress={()=>handleTabOnList(item)}>
                <View style={styles.img}>
                    <View style={styles.itemImgBlock}>
                        <Image source={{uri:item.image}} style={styles.itemImg}/>
                    </View>

                    <View style={styles.itemInfoBlock}>
                         <RecipeInfoCard  title={item.label}/>
                    </View>

                    <View style={styles.itemPrizeBlock}>
                        <Text style={styles.price}>$450</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    const renderFlatList=()=>{
        return(
            <FlatList
                data={data}
                keyExtractor={()=>Math.random().toString()}
                renderItem={
                    ({item,index})=>renderFlatListItem(item.recipe,index)
                }
            />
        )
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>
            <View style={styles.titleBlock}>
                <Text style={styles.title}>{params.title}</Text>
            </View>
            <View style={styles.listView}>
                {
                    loading ? <Spinner size='large'/>:renderFlatList()               
                }
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },

    themeImg:{
        position:'absolute',
        width:'100%',
        height:Dimensions.get('screen').height/4.5
    },

    titleBlock:{
        width:'100%',
        height:'5%',
        position:'absolute',
        marginTop:'12%',
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontSize:23,
        color:'white',
        fontWeight:'bold',
        marginLeft:'5%'
    },

    listView:{
        width:'100%',
        marginTop:'40%'
    },

    img:{
        width:'90%',
        height:80,
        marginLeft:'5%',
        marginTop:'3%',
        flexDirection:'row'
    },

    itemImgBlock:{
        width:'30%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    itemInfoBlock:{
        width:'50%',
        height:'100%',
        padding:5
    },

    itemPrizeBlock:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    itemImg:{
        width:'90%',
        height:'90%',
        borderRadius:10,
    },

    price:{
        fontSize:17,
        fontWeight:'bold'
    }

})

export default FoodList