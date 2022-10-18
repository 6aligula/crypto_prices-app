import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Crypto } from '../modules/crypto';
import { socket } from '../App';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    /*cryptoList is a constant and setCryptoList is a function*/
    const [cryptoList, setCryptoList] = useState();
    //let homeOK = loaded;
    const [cryptoDataLoadedHome, setcryptoDataLoadedHome] = useState(false);

    const getData = () => {
        socket.on('crypto', data => {
            //console.log(data);
            setCryptoList(data);
            /*App await 7 seconds because the server send data every 6s: Solve warning when launch app*/
            setTimeout(() => {
                setcryptoDataLoadedHome(true);
            }, 7000);
        });
    }
    getData();

    /*fin pruebas */
    const openCryptoDetail = (id: string) => {
        navigation.navigate('Detail', { id: id });
    };
    /*function for extract the data*/
    const renderItem = ({ item }: { item: Crypto }) => {

        return (

            <Pressable style={styles.containerItem}
                onPress={() => openCryptoDetail(item.id)}>
                {/* <View style={styles.coinName}> */}
                {/* <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                    /> */}
                {/* <View style={styles.containerNames}> */}
                <Text style={styles.textName}>{item.name}</Text>
                {/* <Text style={styles.coinSymbol}>{item.symbol}</Text> */}
                {/* </View>
                </View>*/}
                <View>
                    <Text style={styles.textPrice}>{Math.round(item.price * 100) / 100} $</Text>

                </View>
            </Pressable>

        );
    };
    /*View en home screen*/
    return (
        <>
            {/*cryptoDataLoaded is true then show <View></View>  */}
            {cryptoDataLoadedHome &&
                (< View style={styles.list} >
                    <FlatList
                        data={cryptoList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View >
                )}
            {!cryptoDataLoadedHome && (
                <ActivityIndicator size="large" color="#00ff00" />)}
        </>

    );
};

//darle estilos al view
const styles = StyleSheet.create({
    containerItem: {
        //flex 1 ocupa toda la pantalla style:crypto
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        //colocar imagen junto a nambre de crypto
        flexDirection: 'row',
        //separar la imagen del nombre y precio
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 2,


    },
    /*style: container*/
    list: {
        width: '100%',
        //backgroundColor: 'black',
        backgroundColor: '#141414',
    },
    textName: {
        color: '#ffffff',
        textTransform: 'capitalize',
    },
    image: {
        width: 30,
        height: 30
    },
    coinName: {
        flexDirection: 'row',

    },
    coinSymbol: {
        color: '#434343',
        textTransform: 'uppercase'
    },
    containerNames: {
        marginLeft: 10
    },
    textPrice: {
        color: 'white',
        textAlign: 'right'
    },

});