import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CountriesListScreen from './screens/CountriesListScreen';
import CountryDetailsScreen from './screens/CountryDetailsScreen';
import FavoritesListScreen from './screens/FavoritesListScreen';

import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Countries") {
            iconName = "flag-usa";
            color = "black"
          } else if (route.name === "Favorites") {
            iconName = "heart";
            color = "pink"
          }

          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#24A0ED",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Countries"
        component={CountriesListScreen}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesListScreen}
      />
    </Tab.Navigator>
  );
}

function App() {

    return (
      <NavigationContainer>
        <Stack.Navigator>
            <>
              <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Country Details"
                component={CountryDetailsScreen}
              />
            </>
        </Stack.Navigator>
      </NavigationContainer>
    );  
}

export default App;
