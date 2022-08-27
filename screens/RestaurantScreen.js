import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect , useEffect} from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import {
    setRestaurant,
  } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgurl,
      title,
      rating,
      genre,
      address,
      short_desc,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  useEffect(() => {
    dispatch(setRestaurant({
        id,
      imgurl,
      title,
      rating,
      genre,
      address,
      short_desc,
      dishes,
      long,
      lat,
    }))
  }, [])
  
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgurl).url(),
            }}
            className="w-full h-56 bg-gray-400 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 rounded-full bg-black p-1"
          >
            <ArrowLeftIcon size={35} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className="flex-row items-center spacce-x-2">
                  <StarIcon size={20} opacity={0.5} color="green" />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> . {genre}
                  </Text>
                </View>

                <View className="flex-row items-center spacce-x-2">
                  <HomeIcon size={20} opacity={0.4} color="gray" />
                  <Text className="text-xs text-gray-500">
                    Nearby - {address}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mt-2 pb-4">{short_desc}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center space-x-2 p-2 border-y border-gray-300 ">
              <QuestionMarkCircleIcon size={30} color="#00CCBB" opacity={0.5} />
              <Text className="pl-2 flex-1 text-md font-bold">
                Have a Food Allergy?
              </Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>
          <View className="pb-36">
            <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

            {/* Dishes Row */}
            {dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
