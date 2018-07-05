let _singleton = Symbol();
const FILL_IN_THE_BLANKS_QUESTION_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/exam/examId/blanks';
const FILL_IN_THE_BLANKS_QUESTION_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/blanks/blanksId';

class FillInTheBlanksQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInTheBlanksQuestionService(_singleton);
        return this[_singleton]
    }

    createFillInTheBlanksQuestion(examId, question) {
        return fetch(FILL_IN_THE_BLANKS_QUESTION_API_URL.replace('examId', examId),
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteFillInTheBlanksQuestion(questionId){
        return fetch(FILL_IN_THE_BLANKS_QUESTION_ID_API_URL.replace('blanksId', questionId), {
            method: 'delete'
        })
    }

    updateFillInTheBlanksQuestion(questionId, newQuestion){
        return fetch(FILL_IN_THE_BLANKS_QUESTION_ID_API_URL.replace('blanksId', questionId), {
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
export default FillInTheBlanksQuestionService;