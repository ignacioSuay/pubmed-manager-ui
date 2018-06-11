import React from 'react';
import {StyleSheet, Text, Button, View, TextInput} from 'react-native';


export default class Details extends React.Component {

    static navigationOptions = {
        title: 'Details!',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    };

    fetchData = () => {
        fetch('https://q7eze12knl.execute-api.eu-west-1.amazonaws.com/prod/persons/2')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({data: JSON.stringify(responseJson)});
            }).catch(error => {
        });
    };

    render() {
        console.log("details loading...");
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        return (
            <View style={styles.container}>
                <Text> Loading id: {id}</Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30
    },
    top: {
        flex: 2,
        alignItems: 'center',
        margin: 30
    },
    bottom: {
        flex: 1,
        width: 200,
        margin: 3,
        padding: 10
    }
});

