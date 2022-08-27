import {  Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CategoryCard = ({imgUrl,title}) => {
  return (
    <TouchableOpacity className="relative mr-2 ">
        <Image source={{
            uri: urlFor(imgUrl).url(),
        }}
        className="h-20 w-40 rounded-md"
         />
        <Text className="absoulte bottom-1 left-1 font-bold ">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard