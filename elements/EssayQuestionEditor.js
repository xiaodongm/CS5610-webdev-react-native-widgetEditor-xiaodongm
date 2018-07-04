import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'
import EssayQuestionService from "../services/EssayQuestionService";
import MultipleChoiceQuestionService from "../services/MultipleChoiceQuestionService";

class EssayQuestionEditor extends Component {
    static navigationOptions = {title: 'EssayQuestionEditor'};

    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            questionId: '',
            title: '',
            points: '',
            description: '',
            type: 'ES',
        };

        this.essayQuestionService = EssayQuestionService.instance;
        this.updateQuestion = this.updateQuestion.bind(this);
        this.setQuestionId = this.setQuestionId.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    componentDidMount() {
        this.setQuestionId(this.props.navigation.getParam('questionId'));
        this.setState({title: this.props.navigation.getParam('title')});
        this.setState({description: this.props.navigation.getParam('description')});
        this.setState({points: this.props.navigation.getParam('points')});
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
        this.essayQuestionService
            .updateEssayQuestion(questionId, newQuestion)
            .then(
                () => {reRender()}
            )
    }


    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, margin:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}
                               value={this.state.title}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               multiline={true}
                               value={this.state.description}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>


                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})}
                               value={this.state.points}/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>
                </View>


                <Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>
                <Text style={{marginLeft:10}}>_______________________________________________________________</Text>

                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10}}>
                    <Text>{this.state.title}</Text>
                    <Text>{this.state.points}</Text>
                </View>

                <Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>

                <TextInput multiline={true}
                           style={{backgroundColor: 'white', margin: 10, borderRadius: 5, height: 100}}/>


                <Text style={{marginLeft:10, marginBottom: 10}}>_______________________________________________________________</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20}}>
                    <Button title='Cancel'
                            onPress={() => {this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>
                    <Button title='Update'
                            onPress={() => {
                                this.updateQuestion(this.state.questionId,
                                    {title:this.state.title,
                                        description: this.state.description,
                                        points: this.state.points});
                                this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
            </ScrollView>
        )
    }


}
export default EssayQuestionEditor;