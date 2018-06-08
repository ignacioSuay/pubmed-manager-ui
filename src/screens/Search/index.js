import React from 'react';
import {StyleSheet, Text, Button, View, TextInput} from 'react-native';


export default class Search extends React.PureComponent {

    static navigationOptions = {
        title: 'Search',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
    };

    setUserProps(key, value) {
        this.setState({
            [key]: value
        })
    }

    search(){
        this.props.navigation.navigate('Results', {term: this.state.term});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Search</Text>
                <View style={styles.top}>
                    <TextInput style={styles.input} onChangeText={value => {
                        this.setUserProps("term", value)
                    }} placeholder={"Search..."}/>
                </View>

                <View style={styles.bottom}>
                    <Button title="Search" onPress={this.search.bind(this)}/>
                </View>
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
        flex: 1,
        alignItems: 'center',
        margin: 30
    },
    bottom: {
        flex: 4,
        width: 200,
        margin: 3,
        padding: 10,
        alignItems: 'flex-start',
    },
    input: {
        fontSize: 20,
        width: 200,
        margin: 3,
        padding: 10
    },
});

