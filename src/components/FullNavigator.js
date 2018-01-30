import { StackNavigator } from 'react-navigation';
import App from './App';
import SingleNoteScreen from '../screen/SingleNoteScreen';

const FullNavigator = StackNavigator({
  TabMenu: { screen: App },
  SingleNote: { screen: SingleNoteScreen }
}, {
  headerMode: 'none'
});

export default FullNavigator;
