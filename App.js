import React from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import CourseList from "./components/CourseList";
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Course Manager: Home'
    };
    constructor(props) {
        super(props)
    }
      render() {
        return (
          <ScrollView>
              <StatusBar barStyle='light-content'/>
              <Button title="Course List"
                      onPress={() => this.props.navigation
                          .navigate('CourseList') } />
          </ScrollView>
        );
      }
}


const App = createStackNavigator({
    Home,
    CourseList,
});

export default App;





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
