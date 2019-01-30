import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";


export default class PublicationItem extends React.PureComponent {

    _onPress = () => {
        console.log("Pressed item with id: " + this.props.id);
        this.props.onPressItem(this.props.id, this.props.item)
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        const authors = this.props.authors.map(a => a.name).join(", ");
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={this._onPress}>

                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <Text style={styles.authors}>
                    {authors}
                </Text>
                <View style={styles.pubTypeView}>
                    {this.props.type.map(pt => <Text key={pt} style={styles.pubType}>{pt}</Text>)}
                </View>
                <View style={styles.bottom}>
                    <View style={styles.source}>
                        <Text>{this.props.source}</Text>
                    </View>
                    <View style={styles.pubDate}>
                        <Text style={styles.pubDateText}>{this.props.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        // flexDirection: "row"
    },
    title: {
        fontWeight: "bold",
        textAlign: "center"
        // backgroundColor: "#19576c",
        // color: "white"

    },
    authors: {
        color: "#6a7989"
    },
    bottom: {
        flexDirection: "row"
    },
    pubTypeView: {
        flexDirection: "row"
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // alignContent: "space-between",
        // backgroundColor: "#1c7189",
        // borderRadius: 40,
        // margin: 4
    },
    pubType: {
        alignSelf: "flex-start",
        // justifyContent: "center",
        // alignItems: "center",
        // color: "white",
        // textAlign: "center"
        backgroundColor: "#c5c9c9",
        padding: 5,
        borderRadius: 10,
        marginLeft: 3

    },
    pubDate: {
        flex: 1,
        margin: 2,
        alignContent: "flex-end"

    },
    source: {
        flex: 2,
        margin: 2,
    },
    pubDateText: {
        color: "#365b89"
    }

});
