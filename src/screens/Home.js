import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import axios from 'axios'
import Api from '../api/Api'

class Home extends Component {

    componentDidMount(){
        this.fetchData()
    }

    fetchData=async ()=>{
        const API_KEY="08b99a7e0e12220737573be14114740b";
        const API_ID="b32179fc"

        // const response = await fetch(
        //     `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`
        //   )
        //   const data = await response.json();
        //   console.warn(data)
        // axios.get(`https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`).then(res=>{
        //     console.warn(res)
        // })

        Api.get().then(res=>{
                console.warn(res.data.hits[0].recipe.label)
            })
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

})


export default Home