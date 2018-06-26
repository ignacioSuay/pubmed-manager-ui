import React from 'react';
import {ActivityIndicator, StyleSheet, Modal, View} from "react-native";


export default class Loader extends React.PureComponent {

  constructor(props) {
    super(props);
  };

  render(){
    return (
      <Modal visible={this.props.loading} transparent={true}
             onRequestClose={() => console.log('Modal has been closed.')}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="#7B7B7B" animating={this.props.loading}/>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  }
});
