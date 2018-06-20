import React from "react";
import {Text, View, StyleSheet} from "react-native";
import DatePicker from "react-native-datepicker";


export default class DateFilter extends React.PureComponent {

    constructor(props) {
        super(props);
    };

    render(){
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
                            onDateChange={date => this.props.onDateChange(filter, date, "from")}/>
                <Text style={styles.textInput}>To:</Text>
                <DatePicker format="YYYY/MM/DD" mode="date" androidMode="spinner"
                            placeholder="Present" date={dateTo}
                            onDateChange={date => this.props.onDateChange(filter, date, "to")}/>
            </View>
        </View>

    }
}

const styles = StyleSheet.create({
    dateView: {
        flexDirection: "column",
        minHeight: 10
    },
    dateInputView: {
        flexDirection: "row",
    },
    textInput: {
        flex: 1,
        padding: 0,
        color: '#6a7989',
        fontSize: 16,
        margin: 5
        // fontWeight: 'bold',
    },
});
