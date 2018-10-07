import React from 'react';
import {Button, View} from 'react-native';
import filterConfig from '../../config/filters.config'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import DateFilter from "../../components/DateFilter";
import {buildTerm} from './searchService'
import {Icon, Input} from "react-native-elements";


export default class Search extends React.PureComponent {

  static navigationOptions = {
    title: 'Search',
    headerStyle: {
      backgroundColor: '#2b80c4'
    }
  };
  state = {
    term: {},
    dates: {},
    showBasicFilters: false,
    showAdvancedFilters: false
  };

  constructor(props) {
    super(props);
  };

  setUserProps(key, value) {
    this.setState({term: Object.assign({}, this.state.term, {[key]: value})});
  }

  search() {
    const searchTerm = buildTerm(this.state.term, this.state.dates);
    console.log("term" + searchTerm);
    this.props.navigation.navigate('Results', {term: searchTerm});
  }

  showFilters(visibility, isBasic) {
    isBasic ? this.setState({showBasicFilters: visibility}) : this.setState({showAdvancedFilters: visibility});
  }

  onChangeDate(filter, date, prefix) {
    const key = prefix + filter.filter;
    this.setState({dates: Object.assign({}, this.state.dates, {[key]: date})});
  }

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={110} extraScrollHeight={110}
                               style={styles.container} keyboardShouldPersistTaps="always">
          <View style={{margin: 10}}>
              <View style={styles.input}>

                  {this.createFilter("[All fields]", null, "Search")}

              </View>
              {this.showHideFilters("+ filters", "- filters", true)}
              <View style={styles.search}>
                  <Button title="Search" onPress={this.search.bind(this)}/>
              </View>

              {this.renderBasicFilters()}

              {this.state.showBasicFilters &&
              <View style={styles.search}>
                  <Button title="Search" onPress={this.search.bind(this)}/>
              </View>}

          </View>

      </KeyboardAwareScrollView>
    );
  }

  createFilter(filter, label, placeholder) {
    return <Input
      placeholder={placeholder}
      label={label}
      onChangeText={value => this.setUserProps(filter, value)}
      ref={input => this[filter] = input}
      leftIcon={<Icon name='search'/>}
      containerStyle={{width: "100%"}}
      rightIcon={
        <Icon
          name='clear'
          onPress={() => {
            this[filter].clear();
            this.setUserProps(filter, "")
          }}
        />}
    />;
  }

  showHideFilters(showText, hideText, isBasic) {
    const checkVar = isBasic ? this.state.showBasicFilters : this.state.showAdvancedFilters;
    return <View style={styles.filtersButtons}>
      {!checkVar &&
      <Button title={showText} onPress={() => this.showFilters(true, isBasic)}/>}

      {checkVar &&
      <Button style={styles.minusFilter} color={'#ff3246'} title={hideText}
              onPress={() => this.showFilters(false, isBasic)}/>}
    </View>
  }

  renderBasicFilters() {
    if (this.state.showBasicFilters) {
      return (
        <View style={styles.basicFilters}>
          {filterConfig.basicFilters.map((filter, index) => this.renderFilters(filter, index))}
          {this.showHideFilters("+ Advanced filters", "- Advanced filters", false)}
          {this.renderAdvancedFilters()}
        </View>
      )
    }
  }

  renderAdvancedFilters() {
    if (this.state.showAdvancedFilters) {
      return (<View style={styles.basicFilters}>
          {
            filterConfig.advancedFilters.map((filter, index) => this.renderFilters(filter, index))
          }
        </View>
      )
    }
  }

  renderFilters(filter, index) {
    if (filter.type === "text") {
      return <View key={index}>
        {this.createFilter(filter.filter, filter.name, filter.name)}
      </View>
    } else if (filter.type === "date") {
      return <DateFilter key={index} filter={filter} onDateChange={this.onChangeDate.bind(this)}
                         dateFrom={this.state.dates["from" + filter.filter]}
                         dateTo={this.state.dates["to" + filter.filter]}/>
    }
  }
}

