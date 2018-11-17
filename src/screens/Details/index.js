import React from 'react';
import {StyleSheet, Text, View, Linking, ScrollView} from 'react-native';
import Loader from "../../components/Loader";
import {Icon} from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import * as store from "react-redux";
import {addPublication} from "../../actions/publication.actions";
import {connect} from "react-redux";

const constants = require('../../config/constants.json');

class Details extends React.Component {

    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            loading: false
        };
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        const publication = navigation.getParam('publication');

        this.setState({id: id, publication: publication, loading: true}, () => this.fetchData())
    }

    fetchData = () => {
        const url = constants.server.url + `publications/${this.state.id}`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({details: responseJson, loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error)
            });
    };

    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    saveFavorite() {
        const uniqueId = Expo.Constants.deviceId;
        console.log("saving favorite!", uniqueId);
        const url = constants.server.url + `favorites`;
        const {publication} = this.state;
        const body = {id: uniqueId, item: publication};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(() => {
            console.log("saved favorite");
            this.props.dispatch(addPublication(publication))
        })
            .catch(error => {
                console.log("Error saving favorites", error);
            });
        console.log("adding to favorites");
    }


    render() {
        console.log("details loading...");
        const {id, publication, details} = this.state;
        if (publication && details) {
            const pubUrl = `https://www.ncbi.nlm.nih.gov/pubmed/${id}`;
            return (
                <ScrollView style={styles.container}>
                    <Loader loading={this.state.loading}/>
                    <Text style={styles.title}> {publication.title}</Text>
                    <Text style={styles.authors}> {publication.authors.map(a => a.name).join(", ")}</Text>

                    <View style={styles.bottom}>
                        <Text style={styles.pubType}>
                            <Text style={{fontWeight: "bold"}}>Type:</Text> {publication.pubtype.join(", ")}
                        </Text>
                        <Text style={styles.pubdate}>
                            <Text style={{fontWeight: "bold"}}>Date:</Text> {publication.pubdate}
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.pubType}>
                            <Text style={{fontWeight: "bold"}}>Language:</Text> {publication.lang}
                        </Text>
                        <Text style={styles.pubdate}>
                            <Text style={{fontWeight: "bold"}}>Issue:</Text> {publication.issue}
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.pubType}>
                            <Text style={{fontWeight: "bold"}}>Pages:</Text> {publication.pages}
                        </Text>
                        <Text style={styles.pubdate}>
                            <Text style={{fontWeight: "bold"}}>ISSN:</Text> {publication.issn}
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.pubType}>
                            <Text style={{fontWeight: "bold"}}>Pubmed Id:</Text> {id}
                        </Text>
                        <Text style={styles.pubdate}>
                            <Text style={{fontWeight: "bold"}}>DOI:</Text> {publication.doi}
                        </Text>
                    </View>

                    <Text>
                        <Text style={{fontWeight: "bold"}}>Source:</Text> {publication.source}
                    </Text>
                    <View style={styles.linkButtonsView}>
                        <Text onPress={this.saveFavorite.bind(this)} style={styles.saveButton}>Save to favorites</Text>
                        <Text onPress={() => Linking.openURL(pubUrl)} style={styles.linkButton}>Visit on Pubmed</Text>
                    </View>
                    {!this.isEmpty(details.abstract) &&
                    <View>
                        <Text style={styles.title}>Abstract</Text>
                        <Text style={styles.abstract}> {details.abstract}</Text>
                    </View>}
                    <View style={{height: 50}}/>

                </ScrollView>
            );
        } else {
            return (<View/>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 30,
        padding: 25
    },
    title: {
        fontWeight: "bold",
        fontSize: 20
    },
    authors: {
        color: "#6a7989"
    },
    bottom: {
        flexDirection: "row"
    },
    pubType: {
        flex: 1,
        margin: 2
    },
    pubDate: {
        flex: 1,
        margin: 2,
    },

    linkButton: {
        backgroundColor: "#2B80C4",
        borderRadius: 20,
        color: 'white',
        padding: 10,
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center",
    },
    saveButton: {
        backgroundColor: "#f80f31",
        borderRadius: 20,
        color: 'white',
        padding: 10,
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center",
    },
    abstract: {
        fontSize: 16,
        textAlign: "justify"
    },
    linkButtonsView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,
        marginBottom: 10
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

export default connect(state => state, mapDispatchToProps)(Details);