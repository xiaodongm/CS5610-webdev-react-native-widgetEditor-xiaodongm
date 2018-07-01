import React, {Component} from 'react'
import {Alert, ScrollView} from 'react-native'
import {Button, ListItem, Text, Icon} from 'react-native-elements'

class ExamList extends Component {
    constructor(props){
        super(props);
        this.state = {
            exams: [],
            topicId : ''
        };
    }

    componentDidMount() {
        this.setState({
            topicId: this.props.topicId
        });
    }


    render() {
        return(
            <ScrollView>
                <Text h3 style={{marginLeft:15, marginBottom: 5 }}>Exams</Text>
                <Button title="Add Exam"
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10}}
                        // onPress={() =>{this.props.navigation.navigate('ExamWidget',
                        //     {topicId : this.state.topicId, reRender: this.reRenderList})}}
                />
                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            rightIcon={<Icon name='delete' size={30} color='red'
                                             // onPress={() => {this.deleteAssignment(assignment.id)}}
                            />}
                            // onPress={() => this.props.navigation
                            //     .navigate('ExamEditor', {examId: exam.id, reRender: this.reRenderList})}
                            key={index}
                            title={exam.title}/>))}
            </ScrollView>
        )
    }


}

export default ExamList;