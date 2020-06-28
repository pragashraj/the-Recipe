import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image ,FlatList} from 'react-native'

import Api from '../api/Api'
import RecipePoster from '../components/RecipePoster'

class Home extends Component {
    state={
        data:''
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData=async ()=>{
        Api.get().then(res=>{
            console.warn(res.data.hits[0])
            this.setState({
                    data:res.data.hits
            })
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={
                        ({item})=>{
                            return (
                                <View style={styles.img}>
                                    <RecipePoster uri={item.recipe.image}/>
                                </View>
                            )
                        }
                    }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    img:{
        width:300,
        height:190,
        marginTop:'3%',
        marginHorizontal:'10%',
    },
})


export default Home