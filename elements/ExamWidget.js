import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import ExamService from '../services/ExamService'

class ExamWidget extends Component {
    static navigationOptions = {title: 'ExamWidget'};
    constructor(props){
        super(props);
        this.state = {
            exams: [],
            topicId : '',
            title : '',
            points: '',
            description: '',
            widgetType: 'assignment'
        };
        this.examService = ExamService.instance;
        this.createExam = this.createExam.bind(this);
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

    createExam(topicId, newExam) {
        let reRender = this.props.navigation.getParam('reRender');
        this.examService
            .createExam(topicId, newExam)
            .then(
            () => {reRender()}
        )
    }

    render(){
        return(
            <ScrollView>
                <FormLabel>Exam Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title : text})}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Exam Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Exam Points</FormLabel>
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

                {/*<Text style={{marginLeft:10, marginTop:10}}>Essay Answer</Text>*/}
                {/*<TextInput multiline={true}*/}
                           {/*style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 80}}/>*/}

                {/*<Text style={{marginLeft:10, marginTop: 10}}>Upload a file</Text>*/}
                {/*<TextInput style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 40}}*/}
                           {/*placeholder='  No file chosen'>*/}
                    {/*/!*<Button title='Upload'/>*!/*/}
                {/*</TextInput>*/}

                {/*<Text style={{marginLeft:10, marginTop: 10}}>Submit a link</Text>*/}
                {/*<TextInput style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 40}}/>*/}

                {/*<View style={{ flexDirection: 'row'}}>*/}
                    {/*<Button title='Cancel'*/}
                            {/*buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>*/}
                    {/*<Button title='Submit'*/}
                            {/*buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>*/}
                {/*</View>*/}

                <Text style={{marginLeft:10}}>_______________________________________________________________</Text>
                <Button title='Create'
                        onPress={() => {
                            this.createExam(this.state.topicId,
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
export default ExamWidget;