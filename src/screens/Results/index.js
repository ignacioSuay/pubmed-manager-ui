import React from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';


export default class Results extends React.PureComponent {

    static navigationOptions = {
        title: 'Results',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            publications: []
        }
    };

    fetchData = (term, start, end) => {
        console.log("fetching" + term);
        fetch('https://g3ws5fq4m5.execute-api.eu-west-1.amazonaws.com/dev/publications?term='+term+'&startPage='+start+'&endPage='+end)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({publications: JSON.stringify(responseJson)});
            }).catch(error => {
            console.log(error)
        });
    };

    render() {
        // const { navigation } = this.props;
        // const term = navigation.getParam('term');
        console.log("details loading...");
        const { navigation } = this.props;
        const term = navigation.getParam('term');
        console.log("term " + term);

        return (
            <View style={styles.container}>
                <Text>{term}</Text>

                <View style={styles.top}>
                    {/*<Button title="Fetch data" onPress={e => console.log("holaaaa!")}/>*/}

                    <Button title="Fetch data" onPress={() => this.fetchData(term,1,20)}/>
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

