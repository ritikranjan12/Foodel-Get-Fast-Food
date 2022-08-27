import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restc, setrestC] = useState([]);
  useEffect(() => {
    client.fetch(
        `*[_type == "featured" && _id== $id]{
            ...,
            restaurants[]->{
              ...,
              dishes[]->{
...,
              },
              type->{
                name,
              } 
          },
           }[0]`,{id}
      )
      .then((data) => {
        setrestC(data?.restaurants);
      });
  }, []);  
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between p-2">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          padingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="p-4"
      >
        {/* Restaurant Card */}
        {restc?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgurl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_desc={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
