import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import PublicationItem from "../../components/PublicationItem";
import Loader from "../../components/Loader";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {loadedPublications, removePublication} from "../../actions/publication.actions";

const constants = require('../../config/constants.json');


class Favorite extends React.Component {

    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    state = {
        selected: {},
        page: 0,
        loading: false
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.setState({loading: true});
        this.props.dispatch(this.fetchData)
    }

    fetchData = (dispatch) => {
        let url = constants.server.url + 'favorites/' + Expo.Constants.deviceId;
        fetch(url)
            .then(response => response.json())
            .then(publications => {
                this.setState({loading: false});
                dispatch(loadedPublications(publications));
            })
            .catch(error => console.log(error));
    };

    _renderItem = ({item}) => (
        <View style={{flexDirection: "row"}}>
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
            <Icon name='clear'
                  onPress={() => this.props.dispatch(dispatch => this.deleteFavorite(item.uid, dispatch))}/>
        </View>

    );

    deleteFavorite = (publicationId, dispatch) => {
        const deviceId = Expo.Constants.deviceId;
        const url = constants.server.url + `favorites/` + deviceId + "/" + publicationId;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log("deleted favorite");
            dispatch(removePublication(publicationId));
        }).catch(error => {
            console.log("Error saving favorites", error);
        });
    };

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

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading}/>
                <FlatList
                    data={this.props.publications}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.uid}
                    ItemSeparatorComponent={this.renderSeparator}
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

// const mapStateToProps = (state) => {
//     console.log("state has changed");
//   return {
//       publications: state.publications
//   }
// };

export default connect(state => state, mapDispatchToProps)(Favorite);