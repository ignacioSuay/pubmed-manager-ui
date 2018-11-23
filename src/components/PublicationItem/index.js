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
                <View style={{flex: 20}}>
                    <View style={styles.pubTypeView}>
                        <Text style={styles.pubType}>
                            {this.props.type.join(", ")}
                        </Text>
                    </View>
                </View>

                <View style={{flex: 80}}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.authors}>
                        {authors}
                    </Text>
                    <View style={styles.bottom}>
                        <View style={styles.source}>
                            <Text>{this.props.source}</Text>
                        </View>
                        <View style={styles.pubDate}>
                            <Text style={styles.pubDateText}>{this.props.date}</Text>
                        </View>
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
        flexDirection: "row"
    },
    title: {
        fontWeight: "bold"
    },
    authors: {
        color: "#6a7989"
    },
    bottom: {
        flexDirection: "row"
    },
    pubTypeView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // alignContent: "space-between",
        backgroundColor: "#1c7189",
        borderRadius: 40,
        margin: 4
    },
    pubType: {
        alignSelf: "center",
        // justifyContent: "center",
        // alignItems: "center",
        color: "white",
        textAlign: "center"
        // margin: 10

    },
    pubDate: {
        flex: 1,
        margin: 2,

    },
    source: {
        flex: 3,
        margin: 2,
    },
    pubDateText: {
        color: "#365b89"
    }

});
