import React, { Component } from 'react';
import { View, AsyncStorage, ToastAndroid } from 'react-native';
import Icon from 'react-native-fa-icons';
import DatePicker from 'react-native-datepicker';
import { Button, Text } from 'native-base';


export default class Notescreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: () => (
        <Icon name='cogs' style={{ fontSize: 18.5, color: 'black', marginTop: -6 }} />
    )
  }
  constructor(props){
    super(props)
    this.state = {date:"14/01/2018"}
  }

  componentWillMount(){
    AsyncStorage.getItem("date").then((value) => this.setState({date: value}));
  }

  saveDate(){
    AsyncStorage.setItem("date", this.state.date);
    /*console.log(this.state.date);*/
    ToastAndroid.show('Data del rientro salvata', ToastAndroid.LONG);

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


  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.tit}>Ciao Ily!</Text>
          <Text style={styles.sec}> {"Seleziona la data" + '\n' + "del tuo rientro" } </Text>
          <DatePicker
            style={styles.date}
            date={this.getDate()}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="15/01/2018"
            maxDate="31/06/2018"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
        />

        <Button rounded style={styles.button} onPress={() => this.saveDate()}>
            <Text>Salva</Text>
        </Button>

      </View>
    );
  }
}

const styles = {
  container: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  date: {
    width: 195,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 10,
  },
  tit: {
    marginTop: -50,
    color: 'black',
    fontFamily: 'vincHand',
    textAlign: 'center',
    fontSize: 60
  },
  sec : {
    color:'black',
    fontFamily: 'Dosis',
    textAlign: 'center',
    fontSize: 28,
    marginTop: 40,
    marginBottom: 10
  },
  button:{
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 25,
    marginTop: 35
  }
};
