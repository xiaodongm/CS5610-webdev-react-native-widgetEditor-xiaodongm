import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import BaseQuestionService from '../services/BaseQuestionService'
import QuestionTypePicker from './QuestionTypePicker'

class QuestionCreator extends Component {
    static navigationOptions = {title: 'QuestionCreator'};
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            examId : '',
            title : '',
            points: '',
            description: '',
            type: ''
        };
    }

    componentDidMount() {
        this.setExamId(this.props.navigation.getParam('examId'));
    }

    componentWillReceiveProps(newProps){
        this.setExamId(newProps.examId);
    }


    setExamId(examId) {
        this.setState({examId: examId});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    // createExam(topicId, newExam) {
    //     let reRender = this.props.navigation.getParam('reRender');
    //     this.examService
    //         .createExam(topicId, newExam)
    //         .then(
    //             () => {reRender()}
    //         )
    // }


    render(){
        return(
            <ScrollView>
                <QuestionTypePicker/>

                <FormLabel>Question Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title : text})}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Question Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Question Points</FormLabel>
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


                <Text style={{marginLeft:10, marginBottom: 10}}>_______________________________________________________________</Text>
                <View style={{ flexDirection: 'row'}}>
                    <Button title='Cancel'
                            buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>
                    <Button title='Submit'
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
                {/*<Button title='Create'*/}
                        {/*// onPress={() => {*/}
                        {/*//     this.createExam(this.state.topicId,*/}
                        {/*//         {title:this.state.title,*/}
                        {/*//             description: this.state.description,*/}
                        {/*//             points: this.state.points,*/}
                        {/*//             widgetType: this.state.widgetType});*/}
                        {/*//     this.props.navigation.goBack()}}*/}
                        {/*buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>*/}
            </ScrollView>
        )
    }




}
export default QuestionCreator;