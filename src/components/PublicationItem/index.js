import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";


export default class PublicationItem extends React.PureComponent {

    _onPress = () => {
        console.log("Pressed item with id: " + this.props.id);
        this.props.onPressItem(this.props.id, this.props.item)
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: textColor }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}
