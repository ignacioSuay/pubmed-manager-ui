import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default class Favorite extends React.Component {

    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };


    render() {
        return (<View>
            <Text>holaaa</Text>
        </View>)
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 25
    },

});