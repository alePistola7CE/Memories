import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container,
          Spinner,
          List,
          ListItem,
          Content,
          Text,
          Thumbnail,
          Left,
          Body,
          Right,
          Button } from 'native-base';
import axios from 'axios';

const urlImg = require('../img/picture.png');

let i = 0;

export default class MemoryScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Memories',
    tabBarIcon: () => (
        <Image
          source={urlImg}
          style={{ width: 19, height: 19, tintColor: 'black', marginTop: -6 }}
        />
    )
  }


    constructor(props) {
      super(props);
      this.state = { ricordi: [],
                     ready: false
                    };
    }

  componentWillMount() {
    axios.get('https://www.24htrading.com/api/ila.php')  /* dev http://localhost/api/ila.php prod https://www.24htrading.com/api/ila.php cell dev http://192.168.1.18/api/ila.php */
          .then(response => this.setState({ ricordi: response.data, ready: true }))
          .catch(err => console.log(err));
  }

  renderRicordi() {
    const ricordi = [];
    for (i = 0; i < this.state.ricordi.length - 1; i++) {
      ricordi[i] = this.state.ricordi[i];
      console.log(this.state.ricordi[i].url);
    }
    return ricordi.map(ricordo =>
      <ListItem key={ricordo.giorno} style={styles.elementoLista} avatar>
        <Left>
          <Thumbnail style={styles.img} source={{ uri: ricordo.url }} />
        </Left>
        <Body>
          <Text>Giorno {ricordo.giorno}</Text>
          <Text note>{ricordo.descrizione}</Text>
        </Body>
        <Right>
        <Button
          style={styles.button} transparent info
          onPress={() => this.props.navigation.navigate('SingleNote', { memory: ricordo })}
        >
            <Text>View</Text>
        </Button>
        </Right>
      </ListItem>
    );
  }

  getLunghezza(){
    const lunghezza = this.state.ricordi.length - 1;
    return lunghezza;
  }


  render() {
    if (this.state.ready === false) {
      return (
        <Container>
            <Spinner color='red' />
        </Container>
        );
    } else if (this.getLunghezza() < 0) {
      return(

      <View style = {styles.containerError} >
        <Text style={styles.errorText}> { "Se non sei partita..." + '\n' +  "non hai ricordi!" }</Text>
        <Image source={require('../img/travel.png')} style = {styles.planetImg} />
      </View>
    );
  } else if (this.getLunghezza() == 0) {
      return(

        <View style = {styles.containerError} >
          <Text style={styles.errorText}> { "Sorry cicc.." + '\n' +  "è il primo giorno" + '\n' + 'non ci sono ricordi' }</Text>
          <Image source={require('../img/travel.png')} style = {styles.planetImg} />
        </View>

      );
    } else if (this.state.ready === true) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Memories</Text>
          <Container style={styles.contenitore}>
            <Content style={styles.contenuto}>
              <List style={styles.lista}>
                {this.renderRicordi()}
              </List>
            </Content>
          </Container>
        </View>

      );
    } else if (this.state.ricordi.length < 1) {
      return (
      <Text>No memories at the moment! Sorry! </Text>
    );
    }
  }
}


const styles = {
  elementoLista: {
    marginLeft: 0,
    marginRight: 0,
    padding: 12
  },
  img: {
    height: 55,
    width: 55,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    margin: 'auto',
    height: 40
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontFamily: 'vincHand',
    color: 'black',
    fontSize: 55
  },
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: 'white'
  },
  contenitore: {
    backgroundColor: 'white'
  },
  errorText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 35,
    padding: 10,
    fontFamily: 'Dosis',
    marginBottom: 30
  },
containerError: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  planetImg : {
    height: 250,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  }
};
