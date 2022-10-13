import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DetailScreen = ({ route }: { route: any }) => {
    const id = route.params.id;
    const [cryptoProfile, setCryptoProfile] = useState();
    const [cryptoMarketData, setcryptoMarketData] = useState();

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:3000/cryptos/market-data/${id}`)
    //         .then(response => {
    //             setcryptoMarketData(response.data);
    //         });
    //     axios
    //         .get(`http://localhost:3000/cryptos/profile/${id}`)
    //         .then(response => {
    //             setCryptoProfile(response.data);
    //         });
    // }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#000000' }}>
                {/* {JSON.stringify(cryptoProfile)} */}
                {id}
            </Text>
        </View>
    );
}