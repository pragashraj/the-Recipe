import React,{Component} from 'react'
import { View, StyleSheet ,Image , Animated, Text ,TouchableOpacity} from 'react-native'

import CustomButton from '../components/CustomButton'

class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
      nav:false
    }

    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    }

    render() {
      return (
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            this.props.style,
          ]}
        />

      );
    }
  }
  
  const handleNav=(props)=>{
    props.navigation.navigate('mainFlow')
  }

  const StartUp = (props) => (
    <View style={styles.container}>
        <View style={styles.blocks}>
                        
            <View style={styles.logoBlock}>
                <ImageLoader
                    style={styles.logo}
                    source={require("../assets/img/logo.png")}
                />
            </View>
                    
             <View style={styles.logoTitleBlock}>
                <Image source={require("../assets/img/logoTitle.png")} style={styles.Title}/>
             </View>

             <View style={styles.addToBasketBtn}>
                  <TouchableOpacity onPress={()=>handleNav(props)}>
                      <Text style={{fontSize:24,color:'white',fontWeight:'bold'}}>Go</Text>
                  </TouchableOpacity>
             </View>

        </View>
    </View>
  );

const styles=StyleSheet.create({

    blocks:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5ada58',
    },

    logoBlock:{
        width:'80%',
        height:'40%',
        alignItems:'center',
        justifyContent:'flex-end',
    },

    logo:{
        width:'70%',
        height:'50%',
    },

    logoTitleBlock:{
        width:'80%',
        height:'40%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:'5%'
    },

    Title:{
        width:'70%',
        height:'50%'
    },

    addToBasketBtn:{
      width:'100%',
      height:'10%',
      alignItems:'center',
      justifyContent:'center',
  }

})


 export default StartUp