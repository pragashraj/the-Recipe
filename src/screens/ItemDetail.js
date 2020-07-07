import React, { Component } from 'react'
import { Text, StyleSheet, View,Image ,Dimensions,TouchableOpacity} from 'react-native'

import RecipeInfoCard from '../components/RecipeInfoCard'
import CustomButton from '../components/CustomButton'

class ItemDetail extends Component {
    state={
        quantity:0
    }

    increaseQuantity=()=>{
        var quantity=this.state.quantity
        if(quantity<10){
            this.setState({
                quantity:quantity+1
            })
        }
    }

    decreaseQunatity=()=>{
        var quantity=this.state.quantity
        if(quantity>0){
            this.setState({
                quantity:quantity-1
            })
        }
    }

    handleAddToBasket=()=>{

    }

    render() {
        const item=this.props.route.params.item
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/theme.png')} style={styles.themeImg}/>

                <View style={styles.labelBlock}>
                    <Text style={styles.labelText}>{item.label}</Text>
                </View>

                <View style={styles.imgBlock}>
                    <Image source={{uri:item.image}} style={styles.img}/>
                </View>

                <View style={styles.detailBlock}>

                    <View style={styles.infoCard}>
                        <RecipeInfoCard title={item.label}/>

                        <View style={styles.prizeBlock}>
                            <Text style={{...styles.price,marginLeft:'8%'}}>$50</Text>
                        </View>
                        
                    </View>

                    <View style={styles.addItemBlock}>
                        <Text style={styles.quantity}>Quantity :</Text>
                        <View style={styles.quantityBox}>
                            <Text style={styles.quantityValue}>{this.state.quantity}</Text>
                        </View>

                        <TouchableOpacity onPress={this.decreaseQunatity}>
                            <Image source={require('../assets/img/minus.png')} style={styles.operation}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.increaseQuantity}>
                            <Image source={require('../assets/img/plus.png')} style={styles.operation}/>
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.price}>${this.state.quantity*50}</Text>
                        </View>
                    </View>

                    <View style={styles.addToBasketBlock}>
                        <View style={styles.addToBasketBtn}>
                            <CustomButton btnText="Add to Basket" handleBtnClick={this.handleAddToBasket}/> 
                        </View>
                    </View>

                </View>

            </View>
        )
    }
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

    imgBlock:{
        width:'80%',
        height:'45%',
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

    detailBlock:{
        width:'100%',
        height:'48%',
    },

    infoCard:{
        width:'60%',
        height:'30%',
        marginLeft:'10%',
        marginTop:'4%',
        flexDirection:'row',
    },

    prizeBlock:{
        alignItems:'center',
        justifyContent:'center',
        marginLeft:'10%',
    },

    price:{
        fontSize:20,
    },
    

    addItemBlock:{
        width:'100%',
        height:'30%',
        flexDirection:'row',
        alignItems:'center'
    },

    quantity:{
        fontSize:18,
        marginLeft:'10%',
    },

    quantityBox:{
        marginLeft:'2%',
        width:'15%',
        height:'40%',
        borderWidth:0.4,
        alignItems:'center',
        justifyContent:'center',
        marginRight:'4%'
    },

    quantityValue:{
        fontSize:22
    },

    operation:{
        width:40,
        height:40,
        marginLeft:'5%'
    },

    addToBasketBlock:{
        width:'100%',
        height:'30%',
        alignItems:'center',
        justifyContent:'flex-start',
    },

    addToBasketBtn:{
        width:'80%',
        height:'50%'
    }
})


export default ItemDetail