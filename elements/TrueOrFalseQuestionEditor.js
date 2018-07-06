import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text, CheckBox, Icon} from 'react-native-elements'
import TrueOrFalseQuestionService from "../services/TrueOrFalseQuestionService";

class TrueOrFalseQuestionEditor extends Component {
    static navigationOptions = {title: 'TrueOrFalseQuestionEditor'};
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            questionId: '',
            title: '',
            points: '',
            description: '',
            type: 'TF',
            isTrue: false,
        };
        this.trueOrFalseQuestionService = TrueOrFalseQuestionService.instance;
        this.updateQuestion = this.updateQuestion.bind(this);
        this.setQuestionId = this.setQuestionId.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    componentDidMount() {
        this.setQuestionId(this.props.navigation.getParam('questionId'));
        this.setState({title: this.props.navigation.getParam('title')});
        this.setState({description: this.props.navigation.getParam('description')});
        this.setState({points: this.props.navigation.getParam('points')});
        this.setState({isTrue: this.props.navigation.getParam('isTrue')});
        this.setState({examId: this.props.navigation.getParam('examId')});
    }

    componentWillReceiveProps(newProps){
        this.setQuestionId(newProps.questionId);
    }

    setQuestionId(questionId) {
        this.setState({questionId: questionId});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateQuestion(questionId, newQuestion) {
        let reRender = this.props.navigation.getParam('reRender');
        this.trueOrFalseQuestionService
            .updateTrueOrFalseQuestion(questionId, newQuestion)
            .then(
                () => {reRender()}
            )
    }

    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, margin:10, backgroundColor:'#ebfff2'}}>
                    <FormLabel>Question Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}
                               value={this.state.title}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#ebfff2'}}>
                    <FormLabel>Question Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               multiline={true}
                               value={this.state.description}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>


                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#ebfff2'}}>
                    <FormLabel>Question Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})}
                               value={this.state.points}/>
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
                    <Button title='Update'
                            onPress={() => {
                                this.updateQuestion(this.state.questionId,
                                    {title:this.state.title,
                                        description: this.state.description,
                                        points: this.state.points,
                                        isTrue: this.state.isTrue});
                                this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
            </ScrollView>
        )
    }

}
export default TrueOrFalseQuestionEditor;