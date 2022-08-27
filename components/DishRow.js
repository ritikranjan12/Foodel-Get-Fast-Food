import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import {
  CurrencyRupeeIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selecteBasketItemWithId,
} from "../features/basketSlice";
import BasketIcon from "../components/BasketIcon";

const DishRow = ({ id, name, description, price, image }) => {
  const [isProcessed, setProcessed] = useState(false);
  const items = useSelector((state) => selecteBasketItemWithId(state, id));
  const dispatch = useDispatch();
  const addItemsToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setProcessed(!isProcessed)}
        className={`bg-white border p-4 border-gray-200 ${
          isProcessed && "border-b-0"
        } `}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-xs ">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <CurrencyRupeeIcon size={25} color="#00CCBB" />
              {price}
            </Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isProcessed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemsFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
