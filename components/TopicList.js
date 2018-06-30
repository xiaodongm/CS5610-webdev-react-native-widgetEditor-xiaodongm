import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

class TopicList extends Component {
    static navigationOptions = {title: 'Topic List'};
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId");
        const moduleId = navigation.getParam("moduleId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId
        });
        fetch("https://webdev-summerfull-2018-xma.herokuapp.com/api/course/"+courseId+"/module/"+moduleId+"/lesson/"+lessonId+"/topic")
            .then(response => (response.json()))
            .then(topics => this.setState({topics}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.topics.map(
                    (topic, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {topicId: topic.id})}
                            key={index}
                            title={topic.title}/>))}
            </View>
        )
    }
}
export default TopicList