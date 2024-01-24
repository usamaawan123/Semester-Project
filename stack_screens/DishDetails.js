import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function DishDetails() {
    const [Dish, setDish] = useState([])
    useEffect(() => {
        loadDishesFromStorage(); // Load dishes from AsyncStorage on component mount
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const loadDishesFromStorage = async () => {
        try {
            const storedDishesJson = await AsyncStorage.getItem('key');
            if (storedDishesJson) {
                const storedDishes = JSON.parse(storedDishesJson);
                console.log('Dishes loaded from AsyncStorage:', storedDishes);
                setDish(storedDishes);
            }
        } catch (error) {
            console.error('Error loading dishes from AsyncStorage:', error);
        }
    };
    console.log(Dish)
    return (
        <View style={styles.container}>
            <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center'}}>DishDetails</Text>
            {Dish.map((dish) => (
                    <View>
                        <Text style={styles.text}>{dish}</Text>
                    </View>  
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"lightgrey"

    },
    text1:{
        fontSize:30,
        fontWeight:'bold'

    },
    text:{
        fontSize:20,
        borderWidth:1,
        color:'white',
        backgroundColor:'grey',
        padding:10,
        margin:10
    }

})