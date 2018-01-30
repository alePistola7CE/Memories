import React, { Component } from 'react';
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-fa-icons';
import { Container, Spinner, Content, CardItem, Card, Body } from 'native-base';

export default class TodayScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Today',
    tabBarIcon: () => (
        <Icon name='calendar' style={{ fontSize: 17, color: 'black', marginTop: -8 }} />
    )
  }


  constructor(props) {
    super(props);
    this.state = { ricordi: [],
                   ready: false,
                   date: "14/01/2018"
                  };
  }

  getDate(){
    let date = "data";
    if(this.state.date != "14/01/2018"){
      date = this.state.date;
    } else {
      date = "14/01/2018";
    }
    return date;
  }

  componentWillMount() {
    axios.get('https://www.24htrading.com/api/ila.php')  /* dev http://localhost/api/ila.php prod https://www.24htrading.com/api/ila.php cell dev http://192.168.1.18/api/ila.php */
          .then(response => this.setState({ ricordi: response.data, ready: true }))
          .catch(err => console.log(err));

    AsyncStorage.getItem("date").then((value) => this.setState({date: value}));
  }

  getLastRicordo() {
    var ultimo = 0;
    const lunghezza = this.state.ricordi.length - 1;
    if(lunghezza >= 0){
      ultimo = this.state.ricordi[lunghezza];
    } else {
      ultimo = -1;
    }
    return ultimo;
  }



  renderRicordi() {
    return this.state.ricordi.map(ricordo =>
      <Text key={ricordo.giorno} style={styles.welcome}>
        {ricordo.descrizione}
      </Text>
    );
  }

  giorni_differenza(data1,data2){

    anno1 = parseInt(data1.substr(6),10);
    mese1 = parseInt(data1.substr(3, 2),10);
    giorno1 = parseInt(data1.substr(0, 2),10);

    anno2 = parseInt(data2.substr(6),10);
    mese2 = parseInt(data2.substr(3, 2),10);
    giorno2 = parseInt(data2.substr(0, 2),10);

   var dataok1=new Date(anno1, mese1-1, giorno1);
   var dataok2=new Date(anno2, mese2-1, giorno2);

   differenza = dataok2-dataok1;
   giorni_differenza = new String((differenza/86400000).toFixed(0));

   return giorni_differenza;

 }


  render() {
    console.log(this.state.ricordi); /* dev */

      if (this.state.ready === false) {
        return (

          <Container>
              <Spinner color='green' />
          </Container>

          );
      } else if (this.getLastRicordo() == -1) {
           return (

              <View style = {styles.containerError} >
                <Text style={styles.errorText}> { "Mi dispiace amor..." + '\n' +  "...ancora non sei partita" }</Text>
                <Image source={require('../img/planet.png')} style = {styles.planetImg} />
              </View>

           );
      } else if (this.state.ready === true) {
        const ultimo = this.getLastRicordo();
        console.log(ultimo.url);  /* dev */
        const ritorno = /*150 */(this.state.date != "14/01/2018") ? this.giorni_differenza("14/01/2018", this.state.date) : 150;
        return (

          <ScrollView  style={styles.container}>
          <View>
            <Text style={styles.h2}>mancano</Text>
            <Text style={styles.h1}>
              {ritorno - ultimo.giorno}{' giorni '}
            </Text>
            <Text style={styles.h3}>al tuo rientro</Text>
          </View>

            <Content style={{ flex: 1 }}>
              <Card style={styles.card}>
                <CardItem>
                  <Body>
                    <Text style={styles.title}>P I C  O F  T H E  D A Y</Text>
                  </Body>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{ uri: ultimo.url }}
                    style={styles.immagine}
                  />
                </CardItem>
                <CardItem style={styles.contenitoreDescrizione}>
                  <Body>
                    <Text note style={styles.descrizione}>-{ultimo.descrizione}</Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
            </ScrollView>

        );
      }
  }
}


const styles = {
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: 'rgba(236, 240, 241,1.0)'
  },
  h2: {
    textAlign: 'center',
    color: 'black',
    fontSize: 32,
    fontWeight: '400',
    marginTop: 15,
    fontFamily: 'Dosis'
  },
  h1: {
    textAlign: 'center',
    color: 'rgba(52, 152, 219,1.0)',
    fontWeight: '500',
    fontSize: 40,
    marginTop: 0,
    fontFamily: 'Dosis'
  },
  h3: {
    textAlign: 'center',
    color: 'black',
    fontSize: 28,
    fontWeight: '200',
    marginTop: 3,
    fontFamily: 'Dosis'
  },
  errorText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 35,
    padding: 10,
    fontFamily: 'Dosis',
    marginBottom: 30
  },
  card: {
    marginTop: 27,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 20,
    elevation: 3
  },
  title: {
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 4,
    marginBottom: 4,
    color: 'rgba(127, 140, 141,1.0)'
  },
  immagine: {
    height: 235,
    width: null,
    flex: 1,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15
  },
  contenitoreDescrizione: {
    marginTop: 10,
    marginBottom: 10
  },
  descrizione: {
    marginLeft: 15,
    marginRight: 8,
    fontFamily: 'vincHand',
    marginTop: -15,
    marginBottom: -8,
    fontSize: 26,
    color: 'black'
  },
  containerError: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  planetImg : {
    height: 200,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  }
};
