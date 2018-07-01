import {View, Alert} from 'react-native'
import {ListItem} from 'react-native-elements'

let _singleton = Symbol();
const ASSIGNMENT_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/topic/topicId/assignment';
const ASSIGNMENT_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/assignment/assignmentId';

class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    createAssignment(topicId, assignment) {
        return fetch(ASSIGNMENT_API_URL.replace('topicId', topicId),
            {   body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    findAllAssignmentsForTopic(topicId){
        return fetch((ASSIGNMENT_API_URL.replace('topicId', topicId))).then(response => (response.json()))
    }

    deleteAssignment(assignmentId){
        return fetch(ASSIGNMENT_ID_API_URL.replace('assignmentId', assignmentId), {
            method: 'delete'
        })
    }

    updateAssignment(assignmentId, newAssignment){
        return fetch(ASSIGNMENT_ID_API_URL.replace('assignmentId', assignmentId), {
            method: 'put',
            body: JSON.stringify(newAssignment),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response;
            });
    }
}

export default AssignmentService;