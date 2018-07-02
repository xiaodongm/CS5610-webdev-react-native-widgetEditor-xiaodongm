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
                {/*<Button title="Add Assignment"*/}
                        {/*buttonStyle={{backgroundColor: 'green', borderRadius: 10}}*/}
                        {/*onPress={() =>{this.props.navigation.navigate('AssignmentWidget',*/}
                            {/*{topicId : this.state.topicId, reRender: this.reRenderList})}}/>*/}
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            rightIcon={<Icon name='delete' size={30} color='red'
                                             onPress={() => {this.deleteQuestion(question.id)}}/>}
                            // onPress={() => this.props.navigation
                            //     .navigate('AssignmentEditor',
                            //         {assignmentId: assignment.id,
                            //             reRender: this.reRenderList,
                            //             title: assignment.title,
                            //             description: assignment.description,
                            //             points: assignment.points})}
                            key={index}
                            title={question.title}/>))}
            </ScrollView>
        )
    }



}

export default QuestionList;