import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client from "../sanity";

const Categories = () => {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then((data) => {
        setCat(data);
      });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {cat.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={category.image}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
