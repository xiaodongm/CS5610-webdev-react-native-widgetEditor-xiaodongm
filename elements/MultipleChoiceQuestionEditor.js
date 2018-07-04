import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text, CheckBox, Icon} from 'react-native-elements'
import MultipleChoiceQuestionService from "../services/MultipleChoiceQuestionService";

class MultipleChoiceQuestionEditor extends Component {
    static navigationOptions = {title: 'MultipleChoiceQuestionEditor'};
    constructor(props){
        super(props);
        this.state = {
            examId : '',
            questionId: '',
            title : '',
            points: '',
            options: [],
            correctOption: '',
            description: '',
            type: 'MC',
            choiceText: '',
        };
        this.multipleChoiceQuestionService = MultipleChoiceQuestionService.instance;
        this.updateQuestion = this.updateQuestion.bind(this);
        this.setQuestionId = this.setQuestionId.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
    }

    componentDidMount() {
        this.setQuestionId(this.props.navigation.getParam('questionId'));
        this.setState({title: this.props.navigation.getParam('title')});
        this.setState({description: this.props.navigation.getParam('description')});
        this.setState({points: this.props.navigation.getParam('points')});
        this.setState({options: this.props.navigation.getParam('options')});
        this.setState({correctOption: this.props.navigation.getParam('correctOption')});
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
        this.multipleChoiceQuestionService
            .updateMultipleChoiceQuestion(questionId, newQuestion)
            .then(
                () => {reRender()}
            )
    }

    addChoice(choice){
        if(choice === ''){
            Alert.alert('Please enter a choice');
        }else{
            let newOptions = this.state.options;
            newOptions.push(choice);
            this.setState({options: newOptions});
        }
    }

    deleteChoice(index){
        let newOptions = this.state.options;
        newOptions.splice(index,1);
        this.setState({options: newOptions});
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

                <View style={{borderRadius:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Choice</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({choiceText: text})}/>
                    <FormValidationMessage>
                        Choice is required
                    </FormValidationMessage>

                    <Button title='Add Choice'
                            onPress={() => {this.addChoice(this.state.choiceText)}}
                            buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>
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

                {this.state.options.map(
                    (choice, index) => (
                        <View key={index}
                              style={{flexDirection : 'row'}}>
                            <View width={370}>
                                <CheckBox title={choice}
                                          uncheckedIcon='circle-o'
                                          checkedIcon='dot-circle-o'
                                          containerStyle={this.state.correctOption === choice && {backgroundColor: 'lightskyblue'}}
                                          checked={this.state.correctOption === choice}
                                          onPress={() => {
                                              this.setState({correctOption: choice});
                                          }}/>
                            </View>
                            <Icon name='delete-forever' size={30}
                                  onPress={() => {this.deleteChoice(index)}}/>
                        </View>
                    )
                )}


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
                                        points: this.state.points,
                                        options: this.state.options,
                                        correctOption: this.state.correctOption});
                                this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
            </ScrollView>
        )
    }

}
export default MultipleChoiceQuestionEditor;