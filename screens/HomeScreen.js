import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"]{
            ...,
            restaurants[]->{
              ...,
              dishes[]->{
                
              }
          }
           }`
      )
      .then((data) => {
        setFeaturedCategory(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white mt-4  pt-5 pb-36 ">
      <View className="flex-row pb-3 items-center space-x-2 mx-4  px-2 ">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-9 w-7 bg-gray-300 p-2 rounded-full "
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" className="ml-2 " />
      </View>
      <View className="flex flex-row space-x-2 mx-2 pb-2 ">
        <View className="flex-1 flex-row  space-x-2 bg-gray-200 p-2">
          <MagnifyingGlassIcon size={25} color="#00CCBB" />
          <TextInput
            placeholder="Restaurant and Cookies"
            keyboardType="default"
            className="flex-1"
          />
        </View>
        <AdjustmentsHorizontalIcon size={32} color="#00CCBB" />
      </View>

      {/* /* Body Scrooling */}
      <ScrollView>
        {/* Categories */}
        <Categories />

        {/* Featured Rowa */}
        {featuredCategory?.map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
