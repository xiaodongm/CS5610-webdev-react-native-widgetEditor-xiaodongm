let _singleton = Symbol();
const BASE_QUESTION_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/exam/examId/baseExamQuestion';
const BASE_QUESTION_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/baseExamQuestion/baseQuestionId';

class BaseQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new BaseQuestionService(_singleton);
        return this[_singleton]
    }

    findAllQuestionsForExam(examId){
        return fetch((BASE_QUESTION_API_URL.replace('examId', examId))).then(response => (response.json()))
    }

    deleteQuestion(questionId){
        return fetch(BASE_QUESTION_ID_API_URL.replace('baseQuestionId', questionId), {
            method: 'delete'
        })
    }

}
export default BaseQuestionService;