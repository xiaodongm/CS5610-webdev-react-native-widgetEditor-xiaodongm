import React, {Component} from 'react'
import {Alert, ScrollView} from 'react-native'
import {Button, ListItem, Text, Icon} from 'react-native-elements'
import BaseQuestionService from '../services/BaseQuestionService'

class QuestionList extends Component {

    constructor(props){
        super(props);
        this.state = {
            questions: [],
            examId : ''
        };
        this.baseQuestionService = BaseQuestionService.instance;
        this.findAllQuestionsForExam = this.findAllQuestionsForExam.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.reRenderList = this.reRenderList.bind(this);
    }

    componentDidMount() {
        this.setState({
            examId: this.props.examId
        });
        this.findAllQuestionsForExam(this.props.examId)
            .then(questions => this.setState({questions}))
    }

    reRenderList(){
        this.findAllQuestionsForExam(this.props.examId)
            .then(questions => this.setState({questions}))
    }

    findAllQuestionsForExam(examId){
        return this.baseQuestionService.findAllQuestionsForExam(examId)
    }

    deleteQuestion(id){
        this.baseQuestionService
            .deleteQuestion(id)
            .then(
                () => this.reRenderList()
            )
    }


    render() {
        return(
            <ScrollView style={{marginTop:15}}>
                <Text h4 style={{marginLeft:15, marginBottom: 5 }}>Question List</Text>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            rightIcon={<Icon name='delete' size={30} color='red'
                                             onPress={() => {this.deleteQuestion(question.id)}}/>}
                            onPress={() => {if(question.type === 'MC')
                                {this.props.navigation.navigate('MultipleChoiceQuestionEditor',
                                    {examId: this.state.examId,
                                    questionId: question.id,
                                    title: question.title,
                                    description: question.description,
                                    points: question.points,
                                    options: question.options,
                                    correctOption: question.correctOption,
                                    reRender: this.reRenderList})
                                }else if(question.type === 'ES'){
                                this.props.navigation.navigate('EssayQuestionEditor',
                                    {examId: this.state.examId,
                                        questionId: question.id,
                                        title: question.title,
                                        description: question.description,
                                        points: question.points,
                                        reRender: this.reRenderList})
                                }else if (question.type === 'FB'){
                                this.props.navigation.navigate('FillInTheBlanksQuestionEditor',
                                    {examId: this.state.examId,
                                    questionId: question.id,
                                    variables:question.variables,
                                    title: question.title,
                                    description: question.description,
                                    points: question.points,
                                    reRender: this.reRenderList})
                            }
                            }}
                            key={index}
                            title={question.title}/>))}
                <Button title='Add Question'
                        onPress={() => this.props.navigation
                            .navigate('QuestionCreator', {examId: this.props.examId, reRender: this.reRenderList})}
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>
            </ScrollView>
        )
    }



}

export default QuestionList;