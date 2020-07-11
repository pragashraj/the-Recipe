import React from 'react'
import { StyleSheet, Text, View ,Image, Dimensions,FlatList ,TouchableOpacity} from 'react-native'

import CustomButton from '../components/CustomButton'

const Basket_Payment = () => {
    const basketItems=[
        {id:'1',title:'pizza',prize:750},
        {id:'2',title:'Hamburger',prize:450},
        {id:'3',title:'Soup',prize:200},
        {id:'4',title:'Cake',prize:200},
        {id:'5',title:'Italian',prize:200},
    ]

    const renderFlatList=()=>{
        return(
            <FlatList
                data={basketItems}
                keyExtractor={item=>item.id}
                renderItem={
                    ({item})=>renderFlatListItem(item)
                }
            />
        )
    }

    const renderFlatListItem=(item)=>{
        return(
            <View style={styles.card}>
                <View style={styles.titleBlock}>
                    <Text>{item.title}</Text>
                </View>

                <View style={styles.priceBlock}>
                    <Text>${item.prize}</Text>
                </View>

                <TouchableOpacity style={styles.cancelBlock} onPress={handleCanceling}>
                    <View >
                        <Image source={require('../assets/img/clear.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const calculateTotal=()=>{
        var total=0
        basketItems.map(item=>{
            total+=item.prize
        })
        return total
    }

    const handleCanceling=()=>{

    }

    const handleBtnClick=()=>{
        
    }
    

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>
            <Image source={require('../assets/img/billingCard.jpg')} style={styles.cardImg}/>
            <Text style={styles.heading}>Delivery Options</Text>

            <View style={styles.basketItems}>
                {renderFlatList()}
            </View>

            <View style={styles.paymentBlock}>
                <View style={styles.paymentDetail}>
                    <Image source={require('../assets/img/invoice.png')} style={{width:'100%',height:'90%'}}/>
                </View>
                <View style={styles.total}>
                    <Text style={styles.amountText}>Order Total : ${calculateTotal()}</Text>
                </View>
            </View>

            <View style={styles.payBtn}>
                <CustomButton btnText="Place Order" handleBtnClick={handleBtnClick}/>
            </View>

            
        </View>
    )


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

    cardImg:{
        position:'absolute', 
        width:'100%',
        height:'70%',
        marginTop:'50%'
    },

    heading:{
        position:'absolute',
        fontSize:22,
        color:'white',
        marginLeft:'32%',
        marginTop:'12%',
        fontWeight:'bold'
    },

    basketItems:{
        width:'100%',
        marginTop:'40%',
        height:(screenHight/100)*28
    },

    card:{
        width:'80%',
        marginLeft:'10%',
        marginTop:'2%',
        marginBottom:'1%',
        elevation:6,
        backgroundColor:'white',
        flexDirection:'row',
        height:(screenHight/100)*7
    },

    titleBlock:{
        width:'50%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    priceBlock:{
        width:'25%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    cancelBlock:{
        width:'25%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    paymentBlock:{
        width:'80%',
        marginLeft:'10%',
        height:(screenHight/100)*26,
        marginTop:'4%',
        backgroundColor:'white',
        elevation:5,
        borderWidth:0.4
    },

    paymentDetail:{
        width:'100%',
        height:'85%',
        borderBottomWidth:0.3,
        borderTopWidth:0.3,
        justifyContent:'center',
        alignItems:'center',
    },

    total:{
        width:'100%',
        height:'15%',
        justifyContent:'center',
        alignItems:'center',
    },

    amountText:{
        fontSize:16
    },

    payBtn:{
        width:'80%',
        marginLeft:'10%',
        height:(screenHight/100)*6,
        marginTop:'4%',
    }

})



export default Basket_Payment