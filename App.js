import React from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import CourseList from './components/CourseList';
import ModuleList from './components/ModuleList';
import LessonList from './components/LessonList';
import TopicList from './components/TopicList';
import { createStackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import WidgetList from "./components/WidgetList";
import AssignmentWidget from './elements/AssignmentWidget'
import AssignmentEditor from './elements/AssignmentEditor'
import ExamWidget from './elements/ExamWidget'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    constructor(props) {
        super(props)
    }
      render() {
        return (
          <ScrollView>
              <StatusBar/>
              <Button title="Course List"
                      buttonStyle={styles.courseListBtn}
                      onPress={() => this.props.navigation
                          .navigate('CourseList') } />
          </ScrollView>
        );
      }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentWidget,
    AssignmentEditor,
    ExamWidget
});

export default App;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    courseListBtn: {
      backgroundColor: 'blue',
      borderRadius: 10,
      marginTop: 30
    },

});

