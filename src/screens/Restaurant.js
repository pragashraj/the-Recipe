import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,Image,FlatList} from 'react-native'


class Restaurant extends Component {
   
    renderList=(type)=>{
        return(
            <View style={styles.foods}>
                <Text style={{fontSize:16,color:'white'}}>{type}</Text>
            </View>
        )
    }

    render() {
        const item=this.props.route.params.item
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.labelBlock}>
                    <Text style={styles.labelText}>{item.name}</Text>
                </View>

                <View style={styles.imgBlock}>
                    <Image source={{uri:item.thumb}} style={styles.img}/>
                </View>

                <View style={styles.addressBlock}>
                    <Text style={{fontSize:16,marginLeft:'1%'}}>{item.location.address}</Text>
                </View>

                <Text style={{fontSize:20,marginLeft:'5%',marginTop:'2%'}}>Food Types</Text>

                <FlatList
                    data={this.props.route.params.item.cuisines.split(',')}
                    keyExtractor={type=>type.index}
                    renderItem={
                        ({item})=>this.renderList(item)
                    }
                />
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
        height:Dimensions.get('screen').height/4.5
    },

    imgBlock:{
        width:'60%',
        height:'35%',
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:'7%',
        elevation:5,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    },

    img:{
        width:'99%',
        height:'99%',
        borderRadius:25,
    },

    labelBlock:{
        alignSelf:'center',
        marginTop:'10%',
    },

    labelText:{
        fontSize:22,
        color:'white',
        fontWeight:'bold'
    },

    addressBlock:{
        width:'90%',
        marginLeft:'5%',
        height:(screenHight/100)*10,
        marginTop:'3%',
        borderRadius:30,
        borderWidth:0.4,
        elevation:2,
        justifyContent:'center',
        alignItems:'center'
    },

    foods:{
        width:'90%',
        marginLeft:'5%',
        height:40,
        marginTop:'2%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green'
    },
})


export default Restaurant