import { View, Text,TouchableOpacity,SafeAreaView,Image,ScrollView } from 'react-native'
import React,{useState, useMemo} from 'react'
import {  useNavigation } from "@react-navigation/native";
import { selectRestaurant } from '../features/restaurantSlice';
import { useDispatch,useSelector } from "react-redux";
import { selectBasketItems, removeFromBasket ,selectBasketTotal} from '../features/basketSlice';
import {XCircleIcon,CurrencyRupeeIcon} from "react-native-heroicons/outline";
import { urlFor } from '../sanity';


const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsinbasket,setgroupedItemsinbasket] = useState([])

    useMemo(() => {
        const groupedItems = items.reduce((results,item) => {
           ( results[item.id] = results[item.id] || []).push(item);
           return results;
        },[])
        setgroupedItemsinbasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView classname = "flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 pt-5 border-b shadow-xs border-[#00CCBB] bg-white " >
                <View>
                    <Text className="text-lg font-bold text-center">Basket</Text>
                    <Text className="text-center text-gray-400">{restaurant.title}</Text>
                </View>
                <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-500 absolute top-3 right-3">
            <XCircleIcon color="white" size={30} />
          </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-4 px-4 py-3 my-5 bg-white ">
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru",
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full pl-4"
                />
                <Text className="flex-1 ml-3 font-semibold ">
                    Deliver in 50-75 min
                </Text>
                <TouchableOpacity>
                    <Text className="text-[#00CCBB]">Change</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="divide-y divide-gray-200">
                {Object.entries(groupedItemsinbasket).map(([key,items]) => (
                    <View className="flex-row items-center space-x-4 px-5 py-2 bg-white " key={key}>
                        <Text className="font-bold">
                            {items.length} x
                        </Text>
                        <Image 
                            source={{
                                uri:urlFor(items[0]?.image).url()
                            }}
                            className="h-12 w-12 rounded-full"
                        />
                        <Text className="flex-1">{items[0]?.name}</Text>
                        <Text className="text-gray-400 font-bold">
                            <CurrencyRupeeIcon size={25} color="#00CCBB" />
                            {items[0]?.price}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-[#00CCBB] text-xs" onPress={() => dispatch(removeFromBasket({id:key}))}>
                                    Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View className="p-5 mt-5 space-y-4 bg-white">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400 ">SubTotal</Text>
                    <Text className="text-gray-400 font-bold">
                            <CurrencyRupeeIcon size={25} color="#00CCBB" />
                            {basketTotal}
                        </Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-400 ">Delivery Fees</Text>
                    <Text className="text-gray-400 font-bold">
                            <CurrencyRupeeIcon size={25} color="#00CCBB" />
                            {40}
                        </Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="font-extrabold text-lg ">Order Total</Text>
                    <Text className="font-extrabold text-lg ">
                            <CurrencyRupeeIcon size={25} color="#00CCBB" />
                            {40+basketTotal}
                        </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PlaceOrderScreen")} className="rounded-lg bg-[#00CCBB] p-4">
                    <Text className="text-center text-lg font-bold text-white ">Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>

    </SafeAreaView>
  )
}

export default BasketScreen