import React, {Component} from 'react'
import { ScrollView, View, TextInput } from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
// import AssignmentService from '../services/AssignmentService'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentWidget'};
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            points: '',
            widgetType: 'assignment',
            topicId:''
        };
        // this.assignmentService = AssignmentService.instance;
        // this.createAssignment = this.createAssignment.bind(this);
        // this.setTopicId = this.setTopicId.bind(this);
    }

    // componentDidMount() {
    //     this.setTopicId(this.props.topicId);
    // }

    componentWillReceiveProps(newProps){
        this.setTopicId(newProps.topicId);
    }

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    // createAssignment() {
    //     this.assignmentService
    //         .createAssignment(this.state.topicId, {
    //             title: this.state.title,
    //             description: this.state.description,
    //             points: this.state.points});
    // }



    render(){
        return(
            <ScrollView>
                <FormLabel>Assignment Title</FormLabel>
                <FormInput onChangeText={
                    text => this.setState({title : text})}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Assignment Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Assignment Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})}/>
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
                        // onPress={() => this.createAssignment()}
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>

            </ScrollView>
        )
    }
}


export default AssignmentWidget;