let _singleton = Symbol();
const ESSAY_QUESTION_API_URL =
    // 'http://localhost:8080/api/assignment';
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/exam/examId/essay';
const ESSAY_QUESTION_ID_API_URL =
    'https://webdev-summerfull-2018-xma.herokuapp.com/api/essay/essayId';

class EssayQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayQuestionService(_singleton);
        return this[_singleton]
    }

    createEssayQuestion(examId, question) {
        return fetch(ESSAY_QUESTION_API_URL.replace('examId', examId),
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteEssayQuestion(questionId){
        return fetch(ESSAY_QUESTION_ID_API_URL.replace('essayId', questionId), {
            method: 'delete'
        })
    }

    updateEssayQuestion(questionId, newQuestion){
        return fetch(ESSAY_QUESTION_ID_API_URL.replace('essayId', questionId), {
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
export default EssayQuestionService;