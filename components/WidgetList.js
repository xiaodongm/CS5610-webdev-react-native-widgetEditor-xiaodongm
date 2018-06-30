import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Button, ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widget List'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
            topicId : 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        fetch("https://webdev-summerfull-2018-xma.herokuapp.com/api/topic/"+topicId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {/*<Text h3>Other Widgets</Text>*/}
                <Button title="Add Assignment"
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10}}
                        onPress={() => this.props.navigation.navigate('AssignmentWidget') }/>
                <Button title="Add Exam"
                        buttonStyle={{backgroundColor: 'green', borderRadius: 10, marginTop : 10}}/>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {examId: widget.id})}
                            key={index}
                            // subtitle={widget.description}
                            title={widget.name}/>))}
            </View>
        )
    }
}
export default WidgetList