let _singleton = Symbol();
const TRUE_OR_FALSE_QUESTION_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/exam/examId/truefalse';
const TRUE_OR_FALSE_QUESTION_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/truefalse/truefalseId';

class TrueOrFalseQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueOrFalseQuestionService(_singleton);
        return this[_singleton]
    }


    createTrueOrFalseQuestion(examId, question) {
        return fetch(TRUE_OR_FALSE_QUESTION_API_URL.replace('examId', examId),
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteTrueOrFalseQuestion(questionId){
        return fetch(TRUE_OR_FALSE_QUESTION_ID_API_URL.replace('truefalseId', questionId), {
            method: 'delete'
        })
    }

    updateTrueOrFalseQuestion(questionId, newQuestion){
        return fetch(TRUE_OR_FALSE_QUESTION_ID_API_URL.replace('truefalseId', questionId), {
            method: 'put',
            body: JSON.stringify(newQuestion),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response;
            });
    }
}
export default TrueOrFalseQuestionService;