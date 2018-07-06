import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import ExamService from '../services/ExamService'
import QuestionTypePicker from "./QuestionTypePicker";
import QuestionList from "../components/QuestionList";

class ExamEditor extends Component {
    static navigationOptions = {title: 'ExamEditor'};
    constructor(props){
        super(props);
        this.state = {
            exams: [],
            topicId : '',
            examId: '',
            title : '',
            points: '',
            description: '',
            widgetType: 'exam'
        };
        this.examService = ExamService.instance;
        this.updateExam = this.updateExam.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    componentDidMount() {
        this.setExamId(this.props.navigation.getParam('examId'));
        this.setState({title: this.props.navigation.getParam('title')});
        this.setState({description: this.props.navigation.getParam('description')});
        this.setState({points: this.props.navigation.getParam('points')});
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

    updateExam(examId, newExam) {
        let reRender = this.props.navigation.getParam('reRender');
        this.examService
            .updateExam(examId, newExam)
            .then(
                () => {reRender()}
            )
    }


    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, margin:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Exam Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}
                               value={this.state.title}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Exam Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               value={this.state.description}
                               multiline={true}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                <FormLabel>Exam Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})}
                           value={this.state.points}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>
                </View>

                <Button title='Update and Save'
                        onPress={() => {
                            this.updateExam(this.state.examId,
                                {title:this.state.title,
                                    description: this.state.description,
                                    points: this.state.points,
                                    widgetType: this.state.widgetType});
                            this.props.navigation.goBack()}}
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>

                <Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>
                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10}}>
                    <Text style={{fontWeight:'bold'}}>{this.state.title}</Text>
                    <Text style={{fontWeight:'bold'}}>{this.state.points}</Text>
                </View>

                <Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>
                <View>
                <QuestionList navigation={this.props.navigation}
                              examId={this.props.navigation.getParam('examId')}/>
                </View>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>

            </ScrollView>
        )
    }

}
export default ExamEditor;