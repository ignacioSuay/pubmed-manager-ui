import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import PublicationItem from '../../components/PublicationItem'

export default class Results extends React.PureComponent {

    static navigationOptions = {
        title: 'Results',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    state = {
        publications: [],
        selected: {}
    };

    constructor(props) {
        super(props);
    };

    fetchData = (term, start, end) => {
        console.log("fetching" + term);
        fetch('https://g3ws5fq4m5.execute-api.eu-west-1.amazonaws.com/dev/publications?term=' + term + '&startPage=' + start + '&endPage=' + end)
            .then(response => response.json())
            .then(responseJson => this.setState({publications: responseJson}))
            .catch(error => console.log(error));
    };

    _renderItem = ({item}) => (
        <PublicationItem
            id={item.uid}
            onPressItem={this._onPressItem}
            selected={this.state.selected[item.uid]}
            // selected={true}
            title={item.title}
        />
    );

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = state.selected;
            selected.id = true;
            return {selected};
        });
        console.log("PRESSING id : " + JSON.stringify(id));
        this.props.navigation.navigate('Details', {id: id});

    };

    renderSeparator = () => {
        return (<View style={styles.separator}/>);
    };


    componentDidMount(){
        const {navigation} = this.props;
        const term = navigation.getParam('term');
        this.fetchData(term, 1, 20);
    }

    render() {
        const {navigation} = this.props;
        const term = navigation.getParam('term');
        console.log("results loading...");
        return (
            <View style={styles.container}>
                <Text>Search term: {term}</Text>

                <View style={styles.top}>
                    <FlatList
                        data={this.state.publications}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.uid}
                        extraData={this.state}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
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
    },
    separator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%",
        marginBottom: "2%",
        marginTop: "2%"
    }
});

