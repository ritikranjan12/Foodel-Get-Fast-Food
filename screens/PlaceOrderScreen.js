import {SafeAreaView, View, Text } from 'react-native'
import React , {useEffect} from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import {  useNavigation } from "@react-navigation/native";

const PlaceOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Delivery")
      }, 5000);
    }, [])
    
  return (
    <SafeAreaView classname=" flex bg-[#00CCBB] flex-1 justify-between items-center">
        <Animatable.Image
        source={require("../assets/anim.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-full"
        />
        <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className="text-lg my-10 text-whie font-bold text-center"
        >Waiting for the Restaurant to accept your Order!</Animatable.Text>
        <View className="flex justify-between items-center">

        <Progress.Bar size={20} color="#00CCBB" indeterminate={true}  />
        </View>
    </SafeAreaView>
  )
}

export default PlaceOrderScreen