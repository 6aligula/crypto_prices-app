import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MY_API_URL } from '../consts/app-consts';
import { convert } from '../functions/convert';
import { CryptoMarketDataInit, CryptoProfileInit } from '../modules/crypto';

export const DetailScreen = ({ route }: { route: any }) => {
    const id = route.params.id;
    const [cryptoProfile, setCryptoProfile] = useState(CryptoProfileInit);
    const [cryptoMarketData, setcryptoMarketData] = useState(CryptoMarketDataInit);
    const [cryptoDataLoaded, setcryptoDataLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            axios.get(`${MY_API_URL}/cryptos/market-data/${id}`),
            axios.get(`${MY_API_URL}/cryptos/profile/${id}`)
        ])
            .then(([resMarketdata, resProfile]) => {
                setcryptoMarketData(resMarketdata.data);
                setCryptoProfile(resProfile.data);
                setcryptoDataLoaded(true);
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }, []);


    return (
        /*Se usan <> </> para meter dos objetos en un view*/
        <>
            {/*cryptoDataLoaded is true then show <View></View>  */}
            {cryptoDataLoaded && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerInfo}>

                            <Text style={styles.name}>{cryptoProfile.name}</Text>
                            <Text style={styles.symbol}>{cryptoProfile.symbol}</Text>
                            <Text style={styles.price}>{convert(cryptoMarketData.market_data.price_usd)}$</Text>

                        </View>
                        <View style={styles.headerTagLine}>
                            <Text>{cryptoProfile.profile.general.overview.tagline}</Text>
                            {/* en el estilo hay un arreglo para el cambio de color entre verde y rojo */}
                            <Text style={[styles.pricePercentage, convert(cryptoMarketData.market_data.percent_change_usd_last_24_hours) > 0 ? styles.priceUp : styles.priceDown]}>{convert(cryptoMarketData.market_data.percent_change_usd_last_24_hours)} %</Text>
                        </View>
                    </View>

                </View>
            )}
            {/*cryptoDataLoaded is false then show ActivityIndicator*/}
            {!cryptoDataLoaded && (
                <ActivityIndicator size="large" color="#00ff00" />)}
        </>

    );
}

//darle estilos al view
const styles = StyleSheet.create({
    container: {
        //flex 1 ocupa toda la pantalla style:crypto
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
        // padding: 20,
        // //colocar imagen junto a nambre de crypto
        // flexDirection: 'row',
        // //separar la imagen del nombre y precio
        // justifyContent: 'space-between',
        // textAlign: 'center',
        // borderRadius: 10,
        // borderWidth: 2,
    },
    header: {
        backgroundColor: '#000',
        height: 100,
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    headerTagLine: {

    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    name: {
        fontSize: 24,

    },
    symbol: {
        fontSize: 15,
        padding: 5,
        // backgroundColor: '#272d42',

    },
    price: {

    },
    //estilos para el cambio del precio de rojo a verde
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: 'green'
    },
    priceDown: {
        color: 'red'
    }

});
