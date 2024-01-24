// src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Linking,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Restaurants = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isVisible, setisVisible] = useState(false)
    const [lat,setlat]=useState();
    const [long,setlong]=useState();

    const handleOpenMap = () => {
        const latitude =lat // Replace with the actual latitude
        const longitude = long // Replace with the actual longitude
    };
    useEffect(() => {
        // Fetch data from API endpoint
        fetch('https://658552e2022766bcb8c85fa7.mockapi.io/api/restaurants')
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);
                setlat(data[0].latLng.latitude);
                setlong(data[0].latLng.longitude)
            });
    }, []);
    console.log(lat)
    const handlePress = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setisVisible(true);
    };

    const closeModal = () => {
        setisVisible(false)
    };
    const Dish = () => {
        navigation.navigate("Dis")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Restaurant List</Text>
            <Image style={{height:100,width:100}} source={require("../assets/agricultural.png")}></Image>
            {restaurants.map((restaurant) => (
                <TouchableOpacity key={restaurant.id} onLongPress={() => handlePress(restaurant)} onPress={Dish}>
                    <View style={styles.restaurantItem}>
                        <Text style={styles.text}>{restaurant.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}

            {selectedRestaurant && (
                <Modal animationType="slide" transparent={false} visible={isVisible}>
                      <MapView
                            style={{ flex: 0.4 }}
                            initialRegion={{
                                latitude: lat, 
                                longitude: long, 
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: lat, longitude: long }} 
                                title="Marker Title"
                                description="Marker Description"
                            />
                        </MapView>
                    <View style={styles.modalContainer}>
                      
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text1}>Name</Text>
                            <Text style={styles.text1}>Ratings</Text>
                            <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
                                <View>
                                    <Text>OnMap</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text2}>{selectedRestaurant.name}</Text>
                            <Text style={styles.text2}>{selectedRestaurant.ratings}</Text>
                        </View>
                        <TouchableOpacity style={styles.button1} onPress={closeModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey'

    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        marginTop:30

    },
    restaurantItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 5,
        borderWidth: 3,
        marginLeft: 80
    },
    text2: {
        fontSize: 15,
        marginRight: 90,
        marginTop: 10,
    },
    button: {
        backgroundColor: "grey",
        height: 30,
        width: 100,
        marginLeft: 30
    },
    button1: {
        backgroundColor: "grey",
        height: 30,
        width: 100,
        margin: 30
    },
    text: {
        backgroundColor: 'grey',
        fontSize: 20,
        color: 'white',
        padding:10
    }

});

export default Restaurants;
