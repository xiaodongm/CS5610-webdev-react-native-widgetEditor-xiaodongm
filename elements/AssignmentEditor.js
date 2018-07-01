import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentEditor'};
    constructor(props){
        super(props);
        this.state = {
            assignments: [],
            topicId : '',
            assignmentId: '',
            title : '',
            description: '',
            points: '',
            widgetType: 'assignment'
        };
        this.assignmentService = AssignmentService.instance;
        this.updateAssignment = this.updateAssignment.bind(this);
        this.setAssignmentId = this.setAssignmentId.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }


    componentDidMount() {
        this.setAssignmentId(this.props.navigation.getParam('assignmentId'));
        this.setState({title: this.props.navigation.getParam('title')});
        this.setState({description: this.props.navigation.getParam('description')});
        this.setState({points: this.props.navigation.getParam('points')});
    }

    componentWillReceiveProps(newProps){
        this.setAssignmentId(newProps.assignmentId);
    }

    setAssignmentId(assignmentId) {
        this.setState({assignmentId: assignmentId});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateAssignment(assignmentId, newAssignment) {
        let reRender = this.props.navigation.getParam('reRender');
        this.assignmentService
            .updateAssignment(assignmentId, newAssignment)
            .then(
                () => {reRender()}
            )
    }



    render(){
        return(
            <ScrollView>
                <FormLabel>Assignment Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title : text})}
                    value={this.state.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Assignment Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})}
                           value={this.state.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Assignment Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})}
                           value={this.state.points}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>
                <Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>
                <Text style={{marginLeft:10}}>_______________________________________________________________</Text>

                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10}}>
                    <Text>{this.state.title}</Text>
                    <Text>{this.state.points}</Text>
                </View>

                <Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>

                <Text style={{marginLeft:10, marginTop:10}}>Essay Answer</Text>
                <TextInput multiline={true}
                           style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 80}}/>

                <Text style={{marginLeft:10, marginTop: 10}}>Upload a file</Text>
                <TextInput style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 40}}
                           placeholder='  No file chosen'>
                    {/*<Button title='Upload'/>*/}
                </TextInput>

                <Text style={{marginLeft:10, marginTop: 10}}>Submit a link</Text>
                <TextInput style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 40}}/>

                <View style={{ flexDirection: 'row'}}>
                    <Button title='Cancel'
                            buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>
                    <Button title='Submit'
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>

                <Text style={{marginLeft:10}}>_______________________________________________________________</Text>
                <Button title='Update and Save'
                        onPress={() => {
                            this.updateAssignment(this.state.assignmentId,
                                {title:this.state.title,
                                description: this.state.description,
                                points: this.state.points,
                                widgetType: this.state.widgetType});
                            this.props.navigation.goBack()}}
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>

            </ScrollView>
        )
    }
}


export default AssignmentWidget;