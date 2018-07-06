import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import QuestionTypePicker from './QuestionTypePicker'
import MultipleChoiceQuestionWidget from "./MultipleChoiceQuestionWidget";
import EssayQuestionWidget from "./EssayQuestionWidget";
import FillInTheBlanksQuestionWidget from "./FillInTheBlanksQuestionWidget";
import TrueOrFalseQuestionWidget from "./TrueOrFalseQuestionWidget";

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
        }else if(questionType === 'TF'){
            return <TrueOrFalseQuestionWidget navigation={this.props.navigation}
                                              examId={this.state.examId}/>
        }
    }


    render(){
        return(
            <ScrollView>
                <QuestionTypePicker setQuestionType={this.setQuestionType}/>
                {this.renderQuestionEditor(this.state.questionType)}
            </ScrollView>
        )
    }




}
export default QuestionCreator;