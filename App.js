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
import ExamEditor from './elements/ExamEditor'
import QuestionCreator from  './elements/QuestionCreator'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
import FillInTheBlanksQuestionEditor from './elements/FillInTheBlanksQuestionEditor'

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
    ExamWidget,
    ExamEditor,
    QuestionCreator,
    MultipleChoiceQuestionEditor,
    EssayQuestionEditor,
    FillInTheBlanksQuestionEditor
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

