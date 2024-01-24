// src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dishes = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [dish, setdish] = useState([])
    useEffect(() => {
        // Fetch data from API endpoint
        fetch('https://658552e2022766bcb8c85fa7.mockapi.io/api/restaurants')
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data[0].dishes);
                console.log(restaurants)
            });
    }, []);
    const click = async () => {
        navigation.navigate("Details")
    }

    const handleOrder = (dishName) => {
        // Check if the dishName is already in the selectedDishes array
        if (!dish.includes(dishName)) {
            // If not, add it to the array
            setdish((prevSelectedDishes) => [...prevSelectedDishes, dishName]);
        }
    };
    const click1 = async () => {
        try {
            await AsyncStorage.setItem('key', JSON.stringify(dish));
            console.log('Dishes saved to AsyncStorage', dish);
        } catch (error) {
            console.error('Error saving dishes to AsyncStorage:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Dishes List</Text>
            <View style={{ flexDirection: 'row',marginTop:10 }}>
                <Text style={styles.text1}>Dish</Text>
                <Text style={styles.text1}>Price</Text>
            </View>
            <FlatList
                data={restaurants}
                renderItem={({ item }) => (
                    <View>
                        <View style={{ flexDirection: 'row', borderWidth: 3, margin: 10, padding: 10, backgroundColor: 'grey' }}>
                            <Text style={styles.text2}>{item.dishName}</Text>
                            <Text style={styles.text2}>{item.price}</Text>
                            <TouchableOpacity style={styles.button1} onPress={() => handleOrder(item.dishName)}>
                                <Text style={styles.text}>Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={click}>
                <Text style={styles.text}>Place Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={click1}>
                <Text style={styles.text}>Save Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flex: 1
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginLeft: 50,

    },
    text2: {
        fontSize: 15,
        marginLeft: 30,
        marginTop: 10,
        color: 'white'

    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'grey',
        borderWidth: 1,
        color: 'grey',
        borderRadius: 10,
        padding: 2,
        margin: 10,
        height: 50,
        width: 100,
    },
    button1: {
        backgroundColor: 'darkgrey',
        borderWidth: 1,
        color: 'grey',
        borderRadius: 10,
        height: 30,
        width: 80,
        right: 3,
        position: 'absolute'
    }
});

export default Dishes;
