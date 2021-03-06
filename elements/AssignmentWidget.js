import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentWidget'};
    constructor(props){
        super(props);
        this.state = {
            assignments: [],
            topicId : '',
            title : '',
            description: '',
            points: '',
            widgetType: 'assignment'
        };
        this.assignmentService = AssignmentService.instance;
        this.createAssignment = this.createAssignment.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }


    componentDidMount() {
        this.setTopicId(this.props.navigation.getParam('topicId'));
    }

    componentWillReceiveProps(newProps){
        this.setTopicId(newProps.topicId);
    }

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createAssignment(topicId, newAssignment) {
        let reRender = this.props.navigation.getParam('reRender');
        this.assignmentService
            .createAssignment(topicId, newAssignment).then(
            () => {reRender()}
        )
    }



    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, margin:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Assignment Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Assignment Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               multiline={true}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Assignment Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})}/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>
                </View>

                <Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>

                <View style={{flexDirection: 'row',
                              justifyContent: 'space-between',
                              margin: 10}}>
                <Text style={{fontWeight:'bold'}}>{this.state.title}</Text>
                <Text style={{fontWeight:'bold'}}>{this.state.points}</Text>
                </View>

                <Text style={{marginLeft:10, marginTop: 10, marginRight: 10}}>{this.state.description}</Text>

                <Text style={{marginLeft:10, marginTop:10, fontWeight:'bold'}}>Essay Answer</Text>
                <TextInput multiline={true}
                           style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 100, borderColor: 'black', borderWidth: 1}}/>

                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginLeft:10, marginTop: 10, fontWeight:'bold'}}>Upload a file</Text>
                    <Button title='Choose file'
                            buttonStyle={{borderRadius:10}}/>
                </View>
                <TextInput style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 40, borderColor: 'black', borderWidth: 1}}
                           placeholder='  No file chosen'>
                </TextInput>

                <Text style={{marginLeft:10, marginTop: 10, fontWeight:'bold'}}>Submit a link</Text>
                <TextInput style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 40, borderColor: 'black', borderWidth: 1}}/>

                <View style={{ flexDirection: 'row'}}>
                    <Button title='Cancel'
                            buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>
                    <Button title='Submit'
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>
                <Button title='Create'
                        onPress={() => {
                            this.createAssignment(this.state.topicId,
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