import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const FavoritesListScreen = () => {

  const [favoritesData, setFavoritesData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchFavoritesData();
    }, [])
  );

  const fetchFavoritesData = async () => {
    try {
      const favorites = [];
      const favoritesDocs = await getDocs(collection(db, "Favorites"));
      favoritesDocs.forEach((doc) => {
        const country = {
          ...doc.data(),
        };
        favorites.push(country);
      });
      setFavoritesData(favorites);
    } catch (err) {
      console.log(`Error when getting favorites: ${err}`);
    }
  };

  return (
    <View style={styles.container}>
      {favoritesData.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites yet :/</Text>
      ) : (
      <FlatList
        data={favoritesData}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.countryName}>{item.name} {item.flag}</Text>
            <Text style={styles.capitalName}>{item.capital}</Text>
            <Text style={styles.population}>Population: {item.population}</Text>
          </View>
        )}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  noFavoritesText: {
    flex: 2,
    textAlign: "center",
    marginTop: "20%",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  listItem: {
    backgroundColor: "#fff",
    alignContent: "center",
    borderRadius: 10,
    width: "100%",
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  flag: {
    fontSize:20
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  capitalName: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  population: {
    fontSize: 14,
    color: "#888",
  },
});

export default FavoritesListScreen;
