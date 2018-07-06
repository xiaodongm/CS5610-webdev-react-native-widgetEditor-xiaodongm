import React, {Component} from 'react'
import {ScrollView, Text} from 'react-native'
import {Button, ListItem} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'
import AssignmentList from "./AssignmentList";
import ExamList from "./ExamList";

class WidgetList extends Component {
    static navigationOptions = {title: 'Widget List'};
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId : '',
            assignment: {
                title : 'New Assignment',
                description: '',
                points:'',
                widgetType: 'assignment',
            }
        };
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({
            topicId: topicId
        });
    }


    render() {
        return(
            <ScrollView style={{padding: 15}}>
                            <AssignmentList navigation={this.props.navigation}
                                            topicId={this.props.navigation.getParam('topicId')}/>
                            <ExamList navigation={this.props.navigation}
                                      topicId={this.props.navigation.getParam('topicId')}/>
            </ScrollView>
        )
    }
}
export default WidgetList