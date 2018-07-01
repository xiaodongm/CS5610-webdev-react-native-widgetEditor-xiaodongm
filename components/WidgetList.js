import React, {Component} from 'react'
import {ScrollView, Text} from 'react-native'
import {Button, ListItem} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'
import AssignmentList from "./AssignmentList";

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
        this.assignmentService = AssignmentService.instance;
        this.createAssignment = this.createAssignment.bind(this);

    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({
            topicId: topicId
        });
    }

    createAssignment() {
        this.assignmentService
            .createAssignment(this.state.topicId, this.state.assignment);
    }



    render() {
        return(
            <ScrollView style={{padding: 15}}>
                {/*<Text h3>Other Widgets</Text>*/}
                {/*<Button title="Add Assignment"*/}
                        {/*buttonStyle={{backgroundColor: 'green', borderRadius: 10}}*/}
                        {/*onPress={() =>{ this.createAssignment();*/}
                        {/*this.props.navigation.navigate('AssignmentWidget') }}*/}
                        {/*topicId={this.state.topicId}/>*/}
                {/*<Button title="Add Exam"*/}
                        {/*buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop : 10}}/>*/}
                {/*{this.state.widgets.map(*/}
                    {/*(widget, index) => (*/}
                        {/*<ListItem*/}
                            {/*onPress={() => this.props.navigation*/}
                                {/*.navigate("QuestionList", {examId: widget.id})}*/}
                            {/*key={index}*/}
                            {/*// subtitle={widget.description}*/}
                            {/*title={widget.title}/>))}*/}
                            <AssignmentList navigation={this.props.navigation}
                                            topicId={this.props.navigation.getParam('topicId')}/>
            </ScrollView>
        )
    }
}
export default WidgetList