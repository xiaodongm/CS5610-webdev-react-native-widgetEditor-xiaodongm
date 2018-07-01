let _singleton = Symbol();
const EXAM_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/topic/topicId/exam';
const EXAM_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/exam/examId';

class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    createExam(topicId, exam) {
        return fetch(EXAM_API_URL.replace('topicId', topicId),
            {   body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    findAllExamsForTopic(topicId){
        return fetch((EXAM_API_URL.replace('topicId', topicId))).then(response => (response.json()))
    }

    deleteExam(examId){
        return fetch(EXAM_ID_API_URL.replace('examId', examId), {
            method: 'delete'
        })
    }

}
export default ExamService;