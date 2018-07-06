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
            widgetType: 'exam'
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
                <View style={{borderRadius:10, paddingBottom:10, margin:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Exam Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Exam Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               multiline={true}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Exam Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})}/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>
                </View>

                <FormValidationMessage>
                    *Add Question to this Exam will be available in ExamEditor after creating.
                </FormValidationMessage>

                <Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>
                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10}}>
                    <Text style={{fontWeight:'bold'}}>{this.state.title}</Text>
                    <Text style={{fontWeight:'bold'}}>{this.state.points}</Text>
                </View>

                <Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>

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