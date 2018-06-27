import React from 'react';
import {Button, View} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import filterConfig from '../../config/filters.config'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import DateFilter from "../../components/DateFilter";
import {buildTerm} from './searchService'

export default class Search extends React.PureComponent {

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
                               style={styles.container}>

        <View style={styles.input}>
          <Hoshi label={""} borderColor={'#2b80c4'}
                 onChangeText={value => this.setUserProps("[All fields]", value)}/>
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

      </KeyboardAwareScrollView>
    );
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
      return <View key={index} style={styles.input}>
        <Hoshi
          label={filter.name} borderColor={'#2b80c4'}
          onChangeText={value => this.setUserProps(filter.filter, value)}/>
      </View>
    } else if (filter.type === "date") {
      return <DateFilter key={index} filter={filter} onDateChange={this.onChangeDate.bind(this)}
                         dateFrom={this.state.dates["from" + filter.filter]}
                         dateTo={this.state.dates["to" + filter.filter]}/>
    }
  }

  static navigationOptions = {
    title: 'Search',
    headerStyle: {
      backgroundColor: '#2b80c4'
    }
  };
}

