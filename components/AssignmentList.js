import React, {Component} from 'react'
import AssignmentService from "../services/AssignmentService";
import {ScrollView} from 'react-native'
import {Button, ListItem, Text} from 'react-native-elements'

class AssignmentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            assignments: [],
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
        this.findAllAssignmentsForTopic = this.findAllAssignmentsForTopic.bind(this);
    }

    componentDidMount() {
        this.setState({
            topicId: this.props.topicId
        });
        this.findAllAssignmentsForTopic(this.props.topicId)
            .then(assignments => this.setState({assignments}))
    }

    findAllAssignmentsForTopic(topicId){
        return this.assignmentService.findAllAssignmentsForTopic(topicId)
    }

    createAssignment() {
        this.assignmentService
            .createAssignment(this.state.topicId, this.state.assignment);
    }

    render() {
        return(
            <ScrollView>
                <Text h3 style={{marginLeft:15, marginBottom: 5 }}>Assignments</Text>
                <Button title="Add Assignment"
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10}}
                        onPress={() =>{ this.createAssignment();
                            this.props.navigation.navigate('AssignmentWidget') }}
                        topicId={this.state.topicId}/>
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate('AssignmentWidget', {assignmentId: assignment.id})}
                            key={index}
                            title={assignment.title}/>))}
            </ScrollView>
        )
    }


}

export default AssignmentList;