import React, {Component} from 'react'
import {ScrollView, View, TextInput, Alert} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text, CheckBox, Icon} from 'react-native-elements'
import FillInTheBlanksQuestionService from "../services/FillInTheBlanksQuestionService";


class FillInTheBlanksQuestionEditor extends Component {
    static navigationOptions = {title: 'FillInTheBlanksQuestionEditor'};
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            questionId: '',
            title: '',
            points: '',
            description: '',
            variables: [],
            type: 'FB',
            variableText: '',
        };
        this.fillInTheBlanksQuestionService = FillInTheBlanksQuestionService.instance;
        this.updateQuestion = this.updateQuestion.bind(this);
        this.setQuestionId = this.setQuestionId.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.addVariable = this.addVariable.bind(this);
        this.deleteVariable = this.deleteVariable.bind(this);
        this.renderVariablesPreview = this.renderVariablesPreview.bind(this);
    }

    componentDidMount() {
        this.setQuestionId(this.props.navigation.getParam('questionId'));
        this.setState({title: this.props.navigation.getParam('title')});
        this.setState({description: this.props.navigation.getParam('description')});
        this.setState({points: this.props.navigation.getParam('points')});
        this.setState({variables: this.props.navigation.getParam('variables')});
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
        this.fillInTheBlanksQuestionService
            .updateFillInTheBlanksQuestion(questionId, newQuestion)
            .then(
                () => {reRender()}
            )
    }

    addVariable(variable){
        if(variable === ''){
            Alert.alert('Please enter a variable');
        }else{
            let newVariables = this.state.variables;
            newVariables.push(variable);
            this.setState({variables: newVariables});
        }
    }

    deleteVariable(index){
        let newVariables = this.state.variables;
        newVariables.splice(index,1);
        this.setState({variables: newVariables});
    }

    renderVariablesPreview() {
        return this.state.variables.map(
            (variable, index) => {
                let front = '', back = '', flag = false, str = variable;
                for(var i = 0; i < str.length; i++) {
                    if(str[i] !== '[' && !flag) {
                        front += str[i];
                    } else if(str[i] === '[') {
                        while(str[i] !== ']' && i < str.length) {
                            i++;
                            flag = true;
                        }
                    }else {
                        back += str[i];
                    }
                }
                return(
                    <View style={{flexDirection : 'row', marginTop: 10, marginLeft: 10}}
                          key={index}>
                        <Text h4>{front}</Text>
                        <TextInput
                            style={{borderRadius: 5, width: 100}}
                            backgroundColor="white"
                            multiline={true}/>
                        <Text h4>{back}</Text>
                        <Icon name='delete-forever' size={30}
                              style={{marginLeft: 5}}
                              onPress={() => {this.deleteVariable(index)}}/>
                    </View>
                )
            }
        )
    }


    render(){
        return(
            <ScrollView>
                <View style={{borderRadius:10, paddingBottom:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:'#f7ffe9'}}>
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
                    <FormLabel>Question Variable</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({variableText: text})}/>
                    <FormValidationMessage>
                        Example: 1 + 1 = [two=2]
                    </FormValidationMessage>

                    <Button title='Add Variable'
                            onPress={() => {this.addVariable(this.state.variableText)}}
                            buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop: 10, marginBottom: 10}}/>
                </View>

                <Text h4 style={{marginLeft:10, marginTop: 10}}>Variable List</Text>
                {this.state.variables.map(
                    (variable, index) => (
                        <View style={{marginLeft:10, marginTop: 10, marginRight: 10}}
                              key={index}>
                            <Text h5>{variable}</Text>
                        </View>
                    )
                )}


                <Text h4 style={{marginLeft:10, marginTop: 20}}>Preview</Text>
                <Text style={{marginLeft:10}}>_______________________________________________________________</Text>

                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10}}>
                    <Text>{this.state.title}</Text>
                    <Text>{this.state.points}</Text>
                </View>

                <Text style={{marginLeft:10, marginTop: 10}}>{this.state.description}</Text>

                {this.renderVariablesPreview()}

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
                                        variables: this.state.variables});
                                this.props.navigation.goBack()}}
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 5}}/>
                </View>
            </ScrollView>
        )
    }



}
export default FillInTheBlanksQuestionEditor;