import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import PublicationItem from "../../components/PublicationItem";
import Loader from "../../components/Loader";

export default class Favorite extends React.Component {

    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    state = {
        publications: [],
        selected: {},
        page: 0,
        loading: false
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.setState({loading: true}, () => this.fetchData())
    }

    fetchData = () => {
        let url = 'https://g3ws5fq4m5.execute-api.eu-west-1.amazonaws.com/dev/favorites/'+ Expo.Constants.deviceId;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({publications: responseJson, loading: false}))
            .catch(error => console.log(error));
    };

    _renderItem = ({item}) => (
        <PublicationItem
            id={item.uid}
            onPressItem={this._onPressItem}
            selected={this.state.selected[item.uid]}
            item={item}
            title={item.title}
            authors={item.authors}
            type={item.pubtype}
            date={item.pubdate}
        />
    );

    _onPressItem = (id, item) => {
        this.setState((state) => {
            const selected = state.selected;
            selected.id = true;
            return {selected};
        });
        this.props.navigation.navigate('Details', {id: id, publication: item});
    };

    renderSeparator = () => {
        return (<View style={styles.separator}/>);
    };

    handleLoadMore() {
        if (!this.state.loading) {
            this.setState({page: this.state.page + 1, loading: true}, () => this.fetchData());
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading}/>
                <FlatList
                    data={this.state.publications}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.uid}
                    ItemSeparatorComponent={this.renderSeparator}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10
    },
    separator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%",
        marginBottom: "2%",
        marginTop: "2%"
    },
    numberResultsContainer: {
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    numberResults: {
        backgroundColor: "#4B484F",
        borderRadius: 20,
        color: 'white',
        padding: 10,
    }
});