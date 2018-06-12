import React from 'react';
import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import filterConfig from '../../config/filters.config';


export default class Search extends React.PureComponent {

    state = {};

    constructor(props) {
        super(props);
    };

    setUserProps(key, value) {
        this.setState({
            [key]: value
        });
    }

    buildTerm() {
        let res = "";

        Object.entries(this.state).forEach(entry => {
            if(entry[1]) {
                res += entry[1] + entry[0] + " AND ";
            }
        });

        res = res.replace(/AND\s$/, "").trim().replace(/\s/g, "+");
        return res;
    }

    search() {
        const searchTerm = this.buildTerm();
        console.log("RESULTADO " + searchTerm);

        this.props.navigation.navigate('Results', {term: searchTerm});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.container}>
                    <View style={styles.top}>
                        <TextInput style={styles.input} onChangeText={value => {
                            this.setUserProps("[All fields]", value)
                        }} placeholder={"Search..."}/>
                    </View>

                    <View>
                        {
                            filterConfig.map((filter, index) => (
                                <View key={index}>
                                    <Text>{filter.name}</Text>
                                    <TextInput style={styles.input} placeholder={filter.name} onChangeText={value => {
                                        this.setUserProps(filter.filter, value)
                                    }}/>
                                </View>
                            ))
                        }
                    </View>

                    <View style={styles.bottom}>
                        <Button title="Search" onPress={this.search.bind(this)}/>
                    </View>

                </View>
            </TouchableWithoutFeedback>

        );
    }

    static navigationOptions = {
        title: 'Search',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30
    },
    top: {
        flex: 1,
        alignItems: 'center'
    },
    bottom: {
        flex: 4,
        width: 200,
        margin: 3,
        padding: 10,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        width: 200,
        margin: 3,
        padding: 10
    },
});

