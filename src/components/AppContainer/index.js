import React from 'react';
import Search from '../../screens/Search'
import Results from '../../screens/Results'
import Details from '../../screens/Details'
import {createStackNavigator} from 'react-navigation';
import { Font, AppLoading } from "expo";
import FontAwesome from "@expo/vector-icons/fonts/FontAwesome.ttf";
import MaterialIcons from "@expo/vector-icons/fonts/MaterialIcons.ttf";


export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  async componentWillMount() {
    await Font.loadAsync({
       FontAwesome,
      MaterialIcons
    });
    this.setState({loading: false});
  }

  render() {
    return (!this.state.loading && <RootStack/>);
  }
}

const RootStack = createStackNavigator(
  {
    Search: Search,
    Results: Results,
    Details: Details
  },
  {
    initialRouteName: 'Search',
  }
);
