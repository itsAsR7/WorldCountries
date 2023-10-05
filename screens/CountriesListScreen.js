import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const CountriesListScreen = ({ navigation }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/independent?status=true"
        );
        const json = await response.json();

        // only populate required info
        const filteredData = json.map((countryInfo) => ({
          name: countryInfo.name.common,
          capital: countryInfo.capital[0],
          population: countryInfo.population,
          area: countryInfo.area,
          flag: countryInfo.flag,
          capitalCoords: countryInfo.capitalInfo.latlng
        }));
        setCountriesData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountriesData();
  }, []);

  const onListItemPressed = (country) => {
    navigation.navigate("Country Details", { country: country });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={countriesData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onListItemPressed(item)}
            style={styles.listItem}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.countryName}>{item.name}</Text>
            <Text style={styles.capitalName}>Capital: {item.capital}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flag: {
    fontSize: 20
  },
  countryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  capitalName: {
    fontSize: 16,
  },
});

export default CountriesListScreen;
