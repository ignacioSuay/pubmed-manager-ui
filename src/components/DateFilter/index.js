import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DatePicker from "react-native-datepicker";


export default class DateFilter extends React.PureComponent {

  constructor(props) {
    super(props);
  };

  render() {
    const filter = this.props.filter;
    const dateFrom = this.props.dateFrom;
    const dateTo = this.props.dateTo;
    return <View style={styles.dateView}>
      <Text style={styles.textInput}>{filter.name}</Text>
      <View style={styles.dateInputView}>
        <Text style={styles.textInput}>From:</Text>
        <DatePicker format="YYYY/MM/DD" androidMode="spinner"
                    date={dateFrom}
                    placeholder="select date"
                    onDateChange={date => this.props.onDateChange(filter, date, "from")}
                    showIcon={false} style={styles.datePicker}/>
        <Text style={styles.textInput}> To:</Text>
        <DatePicker format="YYYY/MM/DD" mode="date" androidMode="spinner"
                    placeholder="Present" date={dateTo} style={styles.datePicker}
                    onDateChange={date => this.props.onDateChange(filter, date, "to")} showIcon={false}/>
      </View>
    </View>

  }
}

const styles = StyleSheet.create({
  dateView: {
    flexDirection: "column",
    minHeight: 10,
    marginRight: 10,
  },
  dateInputView: {
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    padding: 0,
    color: '#6a7989',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 5
  },
  datePicker:{
    flex: 1
  }
});
