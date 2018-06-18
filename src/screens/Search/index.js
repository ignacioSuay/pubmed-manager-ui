import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import filterConfig from '../../config/filters.config'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


export default class Search extends React.PureComponent {

    state = {
        term: {},
        showBasicFilters: false,
        showAdvancedFilters: false
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

    showFilters(visibility, isBasic) {
        if (isBasic) {
            this.setState({showBasicFilters: visibility});
        } else {
            this.setState({showAdvancedFilters: visibility});
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={110} extraScrollHeight={110}
                                     style={styles.container}>

                <View style={styles.input}>
                    <Hoshi label={'Search...'} borderColor={'#2b80c4'}
                           onChangeText={value => this.setUserProps("[All fields]", value)}/>
                </View>
                <View style={styles.filtersButtons}>
                    {!this.state.showBasicFilters &&
                    <Button title="+ Filters" onPress={() => this.showFilters(true, true)}/>}

                    {this.state.showBasicFilters &&
                    <Button style={styles.minusFilter} color={'#ff3246'} title="- Filters"
                            onPress={() => this.showFilters(false, true)}/>}
                </View>

                <View style={styles.search}>
                    <Button title="Search" onPress={this.search.bind(this)}/>
                </View>

                {this.renderBasicFilters()}

                {this.state.showBasicFilters &&
                <View style={styles.search}>
                    <Button title="Search" onPress={this.search.bind(this)}/>
                </View>}

            </KeyboardAwareScrollView>
        );
    }

    renderBasicFilters() {
        if (this.state.showBasicFilters) {
            return (
                <View style={styles.basicFilters}>
                    {
                        filterConfig.basicFilters.map((filter, index) => {
                            if (filter.type === "text") {
                                return <View key={index} style={styles.input}>
                                    <Hoshi
                                        label={filter.name} borderColor={'#2b80c4'}
                                        onChangeText={value => this.setUserProps(filter.filter, value)}/>
                                </View>
                            } else if (filter.type === "date") {
                                return <View key={index} style={styles.dateView}>
                                    {/*<Text>From:</Text>*/}
                                    <Hoshi
                                        label={"From " + filter.name + " (YYYY/MM/DD)"} borderColor={'#2b80c4'}
                                        onChangeText={value => this.setUserProps(filter.filter, value)}/>
                                    {/*<Text>To:</Text>*/}
                                    <Hoshi
                                        label={"To " + filter.name + " (YYYY/MM/DD)"} borderColor={'#2b80c4'}
                                        onChangeText={value => this.setUserProps(filter.filter, value)}/>
                                </View>

                            }
                        })
                    }
                    <View style={styles.filtersButtons}>
                        {!this.state.showAdvancedFilters &&
                        <Button title="+ Advanced Filters" onPress={() => this.showFilters(true, false)}/>}
                        {this.state.showAdvancedFilters &&
                        <Button style={styles.minusFilter} color={'#ff3246'} title="- Advanced Filters"
                                onPress={() => this.showFilters(false, false)}/>}
                    </View>

                    {this.renderAdvancedFilters()}

                </View>
            )
        }
    }

    renderAdvancedFilters() {
        if (this.state.showAdvancedFilters) {
            return (<View style={styles.basicFilters}>
                    {
                        filterConfig.advancedFilters.map((filter, index) => (
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
        margin: 10
        // alignItems: 'center',
        // justifyContent: 'flex-start'
        // paddingTop: 30
    },
    input: {
        minWidth: 300,
        margin: 0,
        padding: 0,
        // minHeight: 50
    },
    basicFilters: {
        flex: 5,
    },
    filtersButtons: {
        padding: 10,
        margin: 10,
        alignSelf: 'flex-end'
    },
    plusFilter: {

        backgroundColor: '#2b80c4'
    },
    minusFilter: {
        padding: 10,
        color: '#ff3246'
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    dateView: {
        flexDirection: "column"
    }

});

