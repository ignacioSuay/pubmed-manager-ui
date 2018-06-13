import React from 'react';
import {Button, Keyboard, StyleSheet, TouchableWithoutFeedback, View, TouchableHighlight} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import filterConfig from '../../config/filters.config'


export default class Search extends React.PureComponent {

    state = {
        term: {},
        showBasicFilters: false
    };

    constructor(props) {
        super(props);
    };

    setUserProps(key, value) {
        this.setState({term: Object.assign({}, this.state.term, {[key]: value})});
    }

    buildTerm() {
        let res = "";

        Object.entries(this.state.term).forEach(entry => {
            if (entry[1]) {
                res += entry[1] + entry[0] + " AND ";
            }
        });

        res = res.replace(/AND\s$/, "").trim().replace(/\s/g, "+");
        return res;
    }

    search() {
        const searchTerm = this.buildTerm();
        this.props.navigation.navigate('Results', {term: searchTerm});
    }

    showFilters(visibility) {
        this.setState({showBasicFilters: visibility});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.container}>

                    <View style={styles.input}>
                        <Hoshi label={'Search...'} borderColor={'#2b80c4'}
                               onChangeText={value => this.setUserProps("[All fields]", value)}/>
                    </View>

                    <View style={styles.filtersButtons}>
                        {!this.state.showBasicFilters && <Button title="+ Filters" onPress={() => this.showFilters(true)}/>}
                        {this.state.showBasicFilters && <Button style={styles.minusFilter} color={'#ff3246'} title="- Filters" onPress={()=> this.showFilters(false)}/>}
                    </View>

                    <View style={styles.search}>
                        <Button title="Search" onPress={this.search.bind(this)}/>
                    </View>

                    {this.renderFilters()}

                </View>
            </TouchableWithoutFeedback>

        );
    }

    renderFilters() {
        if (this.state.showBasicFilters) {
            return (
                <View style={styles.basicFilters}>
                    {
                        filterConfig.map((filter, index) => (
                            <View key={index} style={styles.input}>
                                <Hoshi
                                    label={filter.name} borderColor={'#2b80c4'}
                                    onChangeText={value => this.setUserProps(filter.filter, value)}/>
                            </View>))
                    }
                </View>

            )
        }

    }

    static navigationOptions = {
        title: 'Search',
        headerStyle: {
            backgroundColor: '#2b80c4'
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
        // paddingTop: 30
    },
    input: {
        minWidth: 300,
        margin: 3,
        padding: 10,
        // minHeight: 50
    },
    basicFilters: {
        flex: 5,
    },
    filtersButtons:{
        padding: 10,
        margin: 10,
        alignSelf: 'flex-end'
    },
    plusFilter:{

        backgroundColor: '#2b80c4'
    },
    minusFilter:{
        padding: 10,
        color: '#ff3246'
    },
    search:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});

