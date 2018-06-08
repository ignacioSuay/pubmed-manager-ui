import React from 'react';
import Search from '../../screens/Search'
import Results from '../../screens/Results'
import Details from '../../screens/Details'
import {createStackNavigator} from 'react-navigation';

export default class AppContainer extends React.Component {

    render() {
        return <RootStack/>;
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
