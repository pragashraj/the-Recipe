import React from 'react'
import { View, Text ,StyleSheet,TextInput} from 'react-native'

const InputField = ({placeholder,onTextChange,defaultValue,textSecure}) => {
    return (
        <View style={styles.container}>
            {
                defaultValue ? 
                <Text style={styles.animatedPlaceholder}>{placeholder}</Text>
                : null
            }
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={e=>onTextChange(e,placeholder)}
                defaultValue={defaultValue}
                secureTextEntry={textSecure}
            />
        </View>
    )
}

const styles=StyleSheet.create({

    container:{
        width:'100%',
        height:'100%'
    },

    animatedPlaceholder:{
        marginLeft:'1%',
        fontSize:15
    },

    input:{
       borderBottomWidth:0.2,
       fontSize:18
    },

})

export default InputField
