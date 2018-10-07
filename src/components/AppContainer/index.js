import React from 'react';
import Search from '../../screens/Search'
import Results from '../../screens/Results'
import Details from '../../screens/Details'
import Favorite from '../../screens/Favorites'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Font, AppLoading} from "expo";
import FontAwesome from "@expo/vector-icons/fonts/FontAwesome.ttf";
import MaterialIcons from "@expo/vector-icons/fonts/MaterialIcons.ttf";
import {Icon} from "react-native-elements";


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
        return (!this.state.loading && <TabNavigator/>);
    }
}

const SearchStack = createStackNavigator(
    {
        Search: Search,
        Results: Results,
        Details: Details
    },
    {
        initialRouteName: 'Search',
    }
);

const FavoritesStack = createStackNavigator(
    {
        Favorites: Favorite,
        Details: Details
    },
    {
        initialRouteName: 'Favorites',
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Search: SearchStack,
        Favorites: FavoritesStack,
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Search') {
                    iconName = `search`;
                } else if (routeName === 'Favorites') {
                    iconName = `favorite${focused ? '' : '-border'}`;
                }
                return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2b80c4',
            inactiveTintColor: 'gray',
        },
    }
);
