import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import BaseQuestionService from '../services/BaseQuestionService'
import QuestionTypePicker from './QuestionTypePicker'
import MultipleChoiceQuestionWidget from "./MultipleChoiceQuestionWidget";
import EssayQuestionWidget from "./EssayQuestionWidget";
import FillInTheBlanksQuestionWidget from "./FillInTheBlanksQuestionWidget";

class QuestionCreator extends Component {
    static navigationOptions = {title: 'QuestionCreator'};
    constructor(props){
        super(props);
        this.state = {
            examId : '',
            title : '',
            points: '',
            description: '',
            type: '',
            questionType: 'MC'
        };
        this.setQuestionType = this.setQuestionType.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.renderQuestionEditor = this.renderQuestionEditor.bind(this);
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

    setQuestionType(questionType){
        this.setState({questionType});
    }

    renderQuestionEditor(questionType){
        if(questionType === 'MC'){
            return <MultipleChoiceQuestionWidget navigation={this.props.navigation}
                                                 examId={this.state.examId}/>
        }else if(questionType === 'ES'){
            return <EssayQuestionWidget navigation={this.props.navigation}
                                       examId={this.state.examId}/>
        }else if(questionType === 'FB'){
            return <FillInTheBlanksQuestionWidget navigation={this.props.navigation}
                                                  examId={this.state.examId}/>
        }
    }


    render(){
        return(
            <ScrollView>
                <QuestionTypePicker setQuestionType={this.setQuestionType}/>
                {this.renderQuestionEditor(this.state.questionType)}


                {/*<FormLabel>Question Title</FormLabel>*/}
                {/*<FormInput onChangeText={*/}
                    {/*text => this.updateForm({title : text})}/>*/}
                {/*<FormValidationMessage>*/}
                    {/*Title is required*/}
                {/*</FormValidationMessage>*/}

                {/*<FormLabel>Question Description</FormLabel>*/}
                {/*<FormInput onChangeText={*/}
                    {/*text => this.updateForm({description: text})}/>*/}
                {/*<FormValidationMessage>*/}
                    {/*Description is required*/}
                {/*</FormValidationMessage>*/}

                {/*<FormLabel>Question Points</FormLabel>*/}
                {/*<FormInput onChangeText={*/}
                    {/*text => this.updateForm({points: text})}/>*/}
                {/*<FormValidationMessage>*/}
                    {/*Points is required*/}
                {/*</FormValidationMessage>*/}


                {/*<Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>*/}
                {/*<Text style={{marginLeft:10}}>_______________________________________________________________</Text>*/}

                {/*<View style={{flexDirection: 'row',*/}
                    {/*justifyContent: 'space-between',*/}
                    {/*margin: 10}}>*/}
                    {/*<Text>{this.state.title}</Text>*/}
                    {/*<Text>{this.state.points}</Text>*/}
                {/*</View>*/}

                {/*<Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>*/}


                {/*<Text style={{marginLeft:10, marginBottom: 10}}>_______________________________________________________________</Text>*/}
                {/*<View style={{ flexDirection: 'row'}}>*/}
                    {/*<Button title='Cancel'*/}
                            {/*buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>*/}
                    {/*<Button title='Submit'*/}
                            {/*buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>*/}
                {/*</View>*/}
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