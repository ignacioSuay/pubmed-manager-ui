import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PublicationItem from '../../components/PublicationItem'
import Loader from '../../components/Loader'

export default class Results extends React.PureComponent {

    static navigationOptions = {
        title: 'Results',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    state = {
        publications: [],
        selected: {},
        page: 0,
        loading: false,
        numPubs: "",
        webEnv: null,
        queryKey: null
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        const {navigation} = this.props;
        const term = navigation.getParam('term');
        this.setState({term: term, page: 0, loading: true}, () => this.fetchData())
    }

    fetchData = () => {
        let url = this.buildUrl();
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                    const pubs = [...this.state.publications, ...responseJson.publications];
                    this.setState({
                        publications: pubs,
                        loading: false,
                        numPubs: responseJson.count,
                        webEnv: responseJson.webEnv,
                        queryKey: responseJson.queryKey
                    });
                }
            )
            .catch(error => console.log(error));
    };

    buildUrl() {
        const {term, page} = this.state;
        const resultsPerPage = 20;
        const start = page * resultsPerPage;
        let url = 'https://g3ws5fq4m5.execute-api.eu-west-1.amazonaws.com/dev/publications?term=' + term + '&startPage=' + start + '&endPage=' + resultsPerPage;
        if (this.state.webEnv && this.state.queryKey) {
            url += `&webEnv=${this.state.webEnv}&queryKey=${this.state.queryKey}`
        }
        console.log("fetching: " + term);
        console.log(url);
        return url;
    }

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
        console.log("PRESSING id : " + JSON.stringify(id));
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
                <View style={styles.numberResultsContainer}>
                    <Text
                        style={styles.numberResults}>Results: {this.state.numPubs.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
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

