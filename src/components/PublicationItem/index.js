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
        <View>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <Text style={styles.authors}>
            {authors}
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.pubType}>
              {this.props.type.join(", ")}
            </Text>
            <Text style={styles.pubDate}>
              {this.props.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
      ;
  }

}


const styles = StyleSheet.create({
  itemContainer: {
    marginTop:5,
    marginBottom:5,
  },
  title: {
    fontWeight: "bold"
  },
  authors: {
    color: "#6a7989"
  },
  bottom:{
    flexDirection: "row"
  },
  pubType: {
    flex: 1,
    margin: 2
  },
  pubDate: {
    flex: 1,
    margin: 2,
  }
});
