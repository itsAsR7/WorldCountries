import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

const CountryDetailsScreen = ({ route }) => {

  const { country } = route.params;
  console.log(country);

  const onFormSubmitted = async () => {
    const favoriteCountry = {
      name: country.name,
      capital: country.capital,
      flag: country.flag,
      population: country.population
    };

    try {
      const querySnapshot = await getDocs(collection(db, "Favorites"));
      const existingDocuments = querySnapshot.docs.map(doc => doc.data());

      const isDuplicate = existingDocuments.some(doc => (
        doc.name === favoriteCountry.name &&
        doc.capital === favoriteCountry.capital &&
        doc.flag === favoriteCountry.flag &&
        doc.population === favoriteCountry.population
      ));

      if (isDuplicate) {
        alert(`You already have ${favoriteCountry.name} ${favoriteCountry.flag} as your favorite`);
      } else {
        // Add a new document with a generated id.
        const insertedDocument = await addDoc(collection(db, "Favorites"), favoriteCountry);
        // display success message
        console.log("Document written with ID: ", insertedDocument.id);
        alert(`${favoriteCountry.name} ${favoriteCountry.flag} added as favorite`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.flag}>{country.flag}</Text>
        <Text style={styles.name}>{country.name}</Text>
        <Text style={styles.details}>Capital: {country.capital}</Text>
        <Text style={styles.details}>Population: {country.population}</Text>
        <Text style={styles.details}>Area: {country.area}</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: country.capitalCoords[0],
          longitude: country.capitalCoords[1],
          latitudeDelta: 20.0000,
          longitudeDelta: 1.0000,
        }}
      >
        <Marker
          coordinate={{
            latitude: country.capitalCoords[0],
            longitude: country.capitalCoords[1],
          }}
          title={country.capital}
          pinColor="red"
        />  
      </MapView>
      <Pressable onPress={onFormSubmitted} style={styles.btn}>
          <Text style={styles.btnLabel}>Favorite this Country?</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor:"#f1f1f1",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    width: "85%"

  },
  flag: {
    marginTop: "2%",
    fontSize: 70,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: "5%",
  },
  details: {
    fontSize: 16,
    marginBottom: "1%",
  },
  map: {
    flex: 1.4,
    height: "40%",
    width: "100%",
  },
  btn: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#068FFF",
    borderRadius: 0,
    paddingVertical: 16,
  },
  btnLabel: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CountryDetailsScreen;
