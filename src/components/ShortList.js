import React from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'

const ShortList = ({data,handleShortListTab}) => {

    const renderFlatListItem=(item,index)=>{
        return(
            <View style={styles.shortListItemView}>
                <TouchableOpacity onPress={()=>handleShortListTab(item)}>
                    <Text style={
                        index === 0 ? {...styles.shortListItem, color:'green'} : {...styles.shortListItem}                         
                    }>{item}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderFlatList=(data)=>{
        return(
            <FlatList
                data={data}
                keyExtractor={()=>Math.random().toString()}
                renderItem={
                    ({item,index})=>renderFlatListItem(item,index)
                }
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        )
    }

    return (
        <View style={styles.container}>
            {renderFlatList(data)}
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        width:'100%',
        height:'100%'
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

})


export default ShortList