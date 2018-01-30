import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Card, CardItem, Body, Text, Container } from 'native-base';
import CustomHeader from '../components/CustomHeader';

export default class SingleNoteScreen extends Component {

  render() {
    const title = 'Giorno ' + this.props.navigation.state.params.memory.giorno;
    const ricordo = this.props.navigation.state.params.memory;
    return (
      <Container>
        <CustomHeader title={title} nav={this.props.navigation} />
          <Content>
            <Card style={styles.card}>
              <CardItem>
                <Body>
                  <Text style={styles.title}>P I C  O F  T H E  D A Y</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: ricordo.url }}
                  style={styles.immagine}
                />
              </CardItem>
              <CardItem style={styles.contenitoreDescrizione}>
                <Body>
                  <Text note style={styles.descrizione}>-{ricordo.descrizione}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: 'rgba(236, 240, 241,1.0)'
  },
  card: {
    marginTop: 30,
    marginLeft: 12,
    marginRight: 12,
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
  }
};
