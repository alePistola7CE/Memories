import { TabNavigator } from 'react-navigation';
import TodayScreen from '../screen/TodayScreen';
import MemoryScreen from '../screen/MemoryScreen';
import NoteScreen from '../screen/NoteScreen';


const App = TabNavigator({
  Today: { screen: TodayScreen },
  Memories: { screen: MemoryScreen },
  Note: { screen: NoteScreen }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    pressColor: 'rgba(189, 195, 199,0.5)',
    style: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: 'black',
    },
    upperCaseLabel: false,
    indicatorStyle: {
            backgroundColor: 'rgba(46, 204, 113,0.8)',
            height: 3.5,
            borderRadius: 10,
    },
    labelStyle: {
      fontSize: 14.5,
      fontWeight: '400',
      marginTop: -4,
      marginBottom: -2,
      color: 'black'
    }
  }
});


export default App;
