import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text, CheckBox, Icon} from 'react-native-elements'
import MultipleChoiceQuestionService from '../services/MultipleChoiceQuestionService'

class MultipleChoiceQuestionWidget extends Component {
    constructor(props){
        super(props);
        this.state = {
            examId : '',
            title : '',
            points: '',
            options: [],
            correctOption: '',
            description: '',
            type: 'MC',
            choiceText: '',
        };
        this.multippleChoiceQuestionService = MultipleChoiceQuestionService.instance;
        this.createMultipleChoiceQuestion = this.createMultipleChoiceQuestion.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
    }

    componentDidMount() {
        this.setExamId(this.props.examId);
    }

    componentWillReceiveProps(newProps){
        this.setExamId(newProps.examId);
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

    setExamId(examId) {
        this.setState({examId: examId});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createMultipleChoiceQuestion(examId, newQuestion) {
        let reRender = this.props.navigation.getParam('reRender');
        this.multippleChoiceQuestionService
            .createMultipleChoiceQuestion(examId, newQuestion)
            .then(
                () => {reRender()}
            )
    }

    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title : text})}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                </View>

                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               multiline={true}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                </View>


                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
                    <FormLabel>Question Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})}/>
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

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>
                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10}}>
                    <Text style={{fontWeight:'bold'}}>{this.state.title}</Text>
                    <Text style={{fontWeight:'bold'}}>{this.state.points}</Text>
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

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin:10}}/>

                <View style={{ flexDirection: 'row', marginBottom: 20}}>
                    <Button title='Cancel'
                            onPress={() => {this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 5}}/>
                    <Button title='Submit'
                            onPress={() => {
                                this.createMultipleChoiceQuestion(this.state.examId,
                                    {title:this.state.title,
                                    description: this.state.description,
                                    points: this.state.points,
                                    type: this.state.type,
                                    options: this.state.options,
                                    correctOption: this.state.correctOption});
                                this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
            </ScrollView>
        )
    }

}
export default MultipleChoiceQuestionWidget;
