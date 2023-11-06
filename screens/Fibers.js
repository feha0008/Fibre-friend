import { View, Text, ActivityIndicator, SectionList } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles";

function Fibers(navigation) {
  const [isloading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const apiUrl = "https://api.ravelry.com/fiber_categories.json";
      axios
        .get(apiUrl)
        .then((response) => {
          // Handle the response data
          const mainCategories = response.data.fiber_categories;
          let allCategories = [];

          mainCategories.forEach((mainCategory) => {
            const underCategories = mainCategory.children.map(
              (underCategory) => ({
                id: underCategory.id,
                name: underCategory.name,
                permalink: underCategory.permalink,
                short_name: underCategory.short_name,
              })
            );

            allCategories.push({
              title: mainCategory.name,
              data: underCategories,
              isMainCategory: true, // Indicate that it's a main category
            });
          });

          setData(allCategories);
          setLoading(false);
        })
        .catch((error) => {
          // Handle errors
          alert("Error loading:", error);
        });
      return () => {
        // Optionally, you can clean up any resources here
      };
    }, []) // Empty dependency array to ensure the effect runs only once when the component is mounted
  );
  return (
    <View style={styles.fiberContainer}>
      {isloading == true ? (
        <ActivityIndicator size="large" color="#9DC9BD" />
      ) : (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Text style={styles.labelText}>{item.name}</Text>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headingText}>{title}</Text>
          )}
        />
      )}
    </View>
  );
}
export default Fibers;
