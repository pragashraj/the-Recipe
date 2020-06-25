import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'

const CustomButton = ({btnText,handleBtnClick}) => {
    return (
        <View>
            <TouchableOpacity onPress={handleBtnClick}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>{btnText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    btn:{
        width:'100%',
        height:'100%',
        backgroundColor:'#5ada58',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    },

    btnText:{
        fontSize:19,
        color:'white'
    },

})


export default CustomButton