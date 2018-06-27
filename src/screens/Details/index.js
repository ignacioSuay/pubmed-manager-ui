import React from 'react';
import {StyleSheet, Text, View, Linking, ScrollView} from 'react-native';
import Loader from "../../components/Loader";


export default class Details extends React.Component {

  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#2b80c4'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: false
    };
  };

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id');
    const publication = navigation.getParam('publication');

    this.setState({id: id, publication: publication, loading: true}, () => this.fetchData())
  }

  fetchData = () => {
    const url = `https://g3ws5fq4m5.execute-api.eu-west-1.amazonaws.com/dev/publications/${this.state.id}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({details: responseJson, loading: false});
      }).catch(error => this.setState({loading: false}));
  };

  render() {
    console.log("details loading...");
    const {id, publication, details} = this.state;
    if (publication && details) {
      const pubUrl = `https://www.ncbi.nlm.nih.gov/pubmed/${id}`;
      return (
        <ScrollView style={styles.container}>
          <Loader loading={this.state.loading}/>
          <Text style={styles.title}> {publication.title}</Text>
          <Text style={styles.authors}> {publication.authors.map(a => a.name).join(", ")}</Text>

          <View style={styles.bottom}>
            <Text style={styles.pubType}>
              <Text style={{fontWeight: "bold"}}>Type:</Text> {publication.pubtype.join(", ")}
            </Text>
            <Text style={styles.pubdate}>
              <Text style={{fontWeight: "bold"}}>Date:</Text> {publication.pubdate}
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.pubType}>
              <Text style={{fontWeight: "bold"}}>Language:</Text> {publication.lang}
            </Text>
            <Text style={styles.pubdate}>
              <Text style={{fontWeight: "bold"}}>Issue:</Text> {publication.issue}
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.pubType}>
              <Text style={{fontWeight: "bold"}}>Pages:</Text> {publication.pages}
            </Text>
            <Text style={styles.pubdate}>
              <Text style={{fontWeight: "bold"}}>ISSN:</Text> {publication.issn}
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.pubType}>
              <Text style={{fontWeight: "bold"}}>Pubmed Id:</Text> {id}
            </Text>
            <Text style={styles.pubdate}>
              <Text style={{fontWeight: "bold"}}>DOI:</Text> {publication.doi}
            </Text>
          </View>

          <Text>
            <Text style={{fontWeight: "bold"}}>Source:</Text> {publication.source}
          </Text>
          <Text onPress={() => Linking.openURL(pubUrl)}>
            <Text style={{fontWeight: "bold"}}>Url:</Text> <Text style={{color: 'blue'}}>{pubUrl}</Text>
          </Text>


          <Text style={styles.abstract}> {details.abstract}</Text>
          {/*<Text>{JSON.stringify(publication)}</Text>*/}
          {/*<Text>{JSON.stringify(details)}</Text>*/}
          <View style={{height: 50}}/>

        </ScrollView>
      );
    } else {
      return (<View/>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: 30,
    padding: 25
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  authors: {
    color: "#6a7989"
  },
  bottom: {
    flexDirection: "row"
  },
  pubType: {
    flex: 1,
    margin: 2
  },
  pubDate: {
    flex: 1,
    margin: 2,
  },
  abstract: {}

});

