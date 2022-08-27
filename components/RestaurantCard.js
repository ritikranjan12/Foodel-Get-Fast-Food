import { View, Text,TouchableOpacity,Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";
import {BookmarkSlashIcon} from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity 
    onPress = {() => {
      navigation.navigate("Restaurant",{
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
      });

    }} className="bg-white mr-3 shadow-sm   ">
      <Image source={{
            uri: urlFor(imgurl).url(),
        }}
        className="h-36 w-64 rounded-sm"
        />
        <View className="px-3 pb-4 ">
            <Text className="font-bold text-lg pt-2">{title}</Text>
            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22}/>
                <Text className="text-gray-600 text-xs">
                    <Text className="text-green-600">{rating}</Text> . {genre}
                </Text>
            </View>
            <View className="flex-row items-center space-x-1">
                <BookmarkSlashIcon color="gray" opacity={0.4} size={22}/>
                <Text className="text-xs text-gray-600 ">Nearby - {address}</Text>
            </View>
        </View>

    </TouchableOpacity>
  );
};

export default RestaurantCard;
