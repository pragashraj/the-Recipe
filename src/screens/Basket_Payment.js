import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View ,Image, Dimensions,FlatList ,TouchableOpacity,ToastAndroid} from 'react-native'

import CustomButton from '../components/CustomButton'

import {connect} from 'react-redux'
import {removeAnItem,removeAll} from '../redux/Actions/StoreData'

import {fbase,database} from '../config/config'

const Basket_Payment = ({data,removeAnItem,removeAll}) => {

    const [basketItems,setBasketItems]=useState([])

    useEffect(()=>{
        setBasketItems(data)
    },data)

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
                    <Text>{item.label}</Text>
                </View>

                <View style={styles.quantityBlock}>
                    <Text>${item.quantity}</Text>
                </View>

                <View style={styles.priceBlock}>
                    <Text>${item.prize}</Text>
                </View>

                <TouchableOpacity style={styles.cancelBlock} onPress={()=>handleCanceling(item.id)}>
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
            total+=item.prize*item.quantity
        })
        return total
    }

    const handleCanceling=(id)=>{
        removeAnItem(id)
        setBasketItems(basketItems.filter(item=>item.id!==id))
    }

    const handlePlaceOrder=()=>{
        const uid=fbase.auth().currentUser.uid
        const date=new Date()
        var data
        database.ref(`UserPayment/${uid}/cardInfo`).once('value').then(
            function(snapshot){
                const exist=(snapshot.val()!==null)
                if(exist) data=snapshot.val()
                if(data.Card_No && basketItems.length>0){
                    database.ref(`Orders/${uid}/${date}`).set(basketItems).then(()=>{
                        ToastAndroid.show('Your Order Send',ToastAndroid.SHORT)
                        removeAll()
                    })
                }else{
                    ToastAndroid.show('Please Add Your payment Card details first!!',ToastAndroid.SHORT) 
                }
        }).catch(err=>console.warn(err))

    }
    

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>
            <Image source={require('../assets/img/billingCard.jpg')} style={styles.cardImg}/>
            <Text style={styles.heading}>Delivery & Payment</Text>

            <View style={styles.basketItems}>
                {
                    basketItems.length === 0 ? <View style={{...styles.card,justifyContent:'center',alignItems:'center'}}>
                        <Text>No Items In basket</Text>
                    </View> : 
                    renderFlatList()
                }
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
                <CustomButton btnText="Place Order" handleBtnClick={handlePlaceOrder}/>
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
        marginTop:'40%'
    },

    heading:{
        position:'absolute',
        fontSize:25,
        color:'white',
        marginLeft:'28%',
        marginTop:'12%',
        fontWeight:'bold'
    },

    basketItems:{
        width:'100%',
        marginTop:'27%',
        height:(screenHight/100)*28
    },

    card:{
        width:'90%',
        marginLeft:'5%',
        marginTop:'2%',
        marginBottom:'1%',
        elevation:6,
        backgroundColor:'white',
        flexDirection:'row',
        height:(screenHight/100)*7
    },

    titleBlock:{
        width:'30%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    quantityBlock:{
        width:'20%',
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
        width:'90%',
        marginLeft:'5%',
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


const mapStateToProps=({data:{data}})=>{
    return{
        data
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        removeAnItem:item=>dispatch(removeAnItem(item)),
        removeAll:()=>dispatch(removeAll())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket_Payment)