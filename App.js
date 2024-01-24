import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurants from "./stack_screens/Restaurants";
import Dishes from "./stack_screens/Dishes";
import DishDetails from "./stack_screens/DishDetails";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "black",
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Res"
          component={Restaurants}
          options={{ headerBackVisible: false, headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Dis"
          component={Dishes}
          options={{ headerBackVisible: false, headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DishDetails}
          options={{ headerBackVisible: false, headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
