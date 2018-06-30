let _singleton = Symbol();
const ASSIGNMENT_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/topic/topicId/assignment';

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

    // findAllAssignmentForTopic(topicId){
    //     return fetch((ASSIGNMENT_API_URL.replace('topicId', topicId))).then(response => (response.json()))
    // }
}

export default AssignmentService;