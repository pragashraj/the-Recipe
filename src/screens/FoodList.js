import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View,Image ,Dimensions,TouchableOpacity,FlatList} from 'react-native'

import {foodAPI} from '../api/Api'
import RecipeInfoCard from '../components/RecipeInfoCard'

const FoodList = (props) => {
    const [data,setData]=useState(null)
    const id=props.route.params

    useEffect(()=>{

        foodAPI("pizza").get().then(res=>{
            setData(res.data.hits)
        })

    },[])

    const handleTabOnList=()=>{

    }


    const renderFlatListItem=(item,index)=>{
        return(
            index === 0 ? null : index === 1 ? null :
            <TouchableOpacity onPress={handleTabOnList}>
                <View style={styles.img}>
                    <View style={styles.itemImgBlock}>
                        <Image source={{uri:item.image}} style={styles.itemImg}/>
                    </View>

                    <View style={styles.itemInfoBlock}>
                         <RecipeInfoCard  title={item.label}/>
                    </View>

                    <View style={styles.itemPrizeBlock}></View>
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
            <View style={styles.listView}>
                {renderFlatList()}
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

    listView:{
        width:'100%',
        // height:'70%',
        marginTop:'40%'
    },

    img:{
        width:'90%',
        height:80,
        marginLeft:'5%',
        backgroundColor:'yellow',
        marginTop:'3%',
        flexDirection:'row'
    },

    itemImgBlock:{
        width:'30%',
        height:'100%',
        backgroundColor:'pink',
        justifyContent:'center',
        alignItems:'center'
    },

    itemInfoBlock:{
        width:'50%',
        height:'100%',
        backgroundColor:'green',
        padding:5
    },

    itemPrizeBlock:{
        width:'20%',
        height:'100%',
        backgroundColor:'pink'
    },

    itemImg:{
        width:'90%',
        height:'90%',
    }
})

export default FoodList