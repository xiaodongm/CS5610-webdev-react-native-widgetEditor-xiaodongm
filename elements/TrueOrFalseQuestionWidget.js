import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text, CheckBox, Icon} from 'react-native-elements'
import TrueOrFalseQuestionService from '../services/TrueOrFalseQuestionService'


class TrueOrFalseQuestionWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            title: '',
            points: '',
            description: '',
            type: 'TF',
            isTrue: false
        };
        this.trueOrFalseQuestionService = TrueOrFalseQuestionService.instance;
        this.createTrueOrFalseQuestion = this.createTrueOrFalseQuestion.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.setExamId = this.setExamId.bind(this);
    }

    componentDidMount() {
        this.setExamId(this.props.examId);
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

    createTrueOrFalseQuestion(examId, newQuestion) {
        let reRender = this.props.navigation.getParam('reRender');
        this.trueOrFalseQuestionService
            .createTrueOrFalseQuestion(examId, newQuestion)
            .then(
                () => {reRender()}
            )
    }


    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#ebfff2'}}>
                    <FormLabel>Question Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#ebfff2'}}>
                    <FormLabel>Question Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               multiline={true}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>


                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#ebfff2'}}>
                    <FormLabel>Question Points</FormLabel>
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

                <Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>

                <CheckBox center
                          onPress={() => this.setState({isTrue: true})}
                          title={'true'}
                          checked={true === this.state.isTrue}/>

                <CheckBox center
                          onPress={() => this.setState({isTrue: false})}
                          title={'false'}
                          checked={false === this.state.isTrue}/>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>

                <View style={{ flexDirection: 'row', marginBottom: 20}}>
                    <Button title='Cancel'
                            onPress={() => {this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>
                    <Button title='Submit'
                            onPress={() => {
                                this.createTrueOrFalseQuestion(this.state.examId,
                                    {title:this.state.title,
                                        description: this.state.description,
                                        points: this.state.points,
                                        type: this.state.type,
                                        isTrue: this.state.isTrue});
                                this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
            </ScrollView>
        )
    }

}
export default TrueOrFalseQuestionWidget;