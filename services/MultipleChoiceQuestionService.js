let _singleton = Symbol();
const MULTIPLE_CHOICE_QUESTION_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/exam/examId/choice';
const MULTIPLE_CHOICE_QUESTION_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/choice/choiceId';

class MultipleChoiceQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MultipleChoiceQuestionService(_singleton);
        return this[_singleton]
    }


    createMultipleChoiceQuestion(examId, question) {
        return fetch(MULTIPLE_CHOICE_QUESTION_API_URL.replace('examId', examId),
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteMultipleChoiceQuestion(questionId){
        return fetch(MULTIPLE_CHOICE_QUESTION_ID_API_URL.replace('choiceId', questionId), {
            method: 'delete'
        })
    }

    updateMultipleChoiceQuestion(questionId, newQuestion){
        return fetch(MULTIPLE_CHOICE_QUESTION_ID_API_URL.replace('choiceId', questionId), {
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
export default MultipleChoiceQuestionService;