import React, {Component} from 'react'
import AssignmentService from "../services/AssignmentService";
import {Alert, ScrollView} from 'react-native'
import {Button, ListItem, Text, Icon} from 'react-native-elements'

class AssignmentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            assignments: [],
            topicId : '',
            assignment: {
                title : '',
                description: '',
                points:'',
                widgetType: 'assignment',
            }
        };
        this.assignmentService = AssignmentService.instance;
        this.findAllAssignmentsForTopic = this.findAllAssignmentsForTopic.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
    }

    componentDidMount() {

        this.setState({
            topicId: this.props.topicId
        });
        this.findAllAssignmentsForTopic(this.props.topicId)
            .then(assignments => this.setState({assignments}))
    }

    reRenderList(){
        this.findAllAssignmentsForTopic(this.props.topicId)
            .then(assignments => this.setState({assignments}))
    }

    findAllAssignmentsForTopic(topicId){
        return this.assignmentService.findAllAssignmentsForTopic(topicId)
    }


    deleteAssignment(id){
        this.assignmentService
            .deleteAssignment(id)
    }

    render() {
        return(
            <ScrollView>
                <Text h3 style={{marginLeft:15, marginBottom: 5 }}>Assignments</Text>
                <Button title="Add Assignment"
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10}}
                        onPress={() =>{this.props.navigation.navigate('AssignmentWidget',{
                            topicId : this.state.topicId})}}/>
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            rightIcon={<Icon name='delete' size={30} color='red'
                                        onPress={() => {this.deleteAssignment(assignment.id)}}/>}
                            // onPress={() => this.props.navigation
                            //     .navigate('AssignmentWidget', {assignmentId: assignment.id})}
                            key={index}
                            title={assignment.title}/>))}
            </ScrollView>
        )
    }
}

export default AssignmentList;