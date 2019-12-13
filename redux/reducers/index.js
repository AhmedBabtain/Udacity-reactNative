import { ADD_DECK,ADD_QUETION,RECEIVE_DECKS } from "../actions/index";


function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                [action.key]:{
                    title:action.deck.title,
                    questions:action.deck.questions
                }
            }
        case ADD_QUETION:
            return {
                ...state,
                [action.deckKey]:{
                    ...state[action.deckKey],
                    questions:state[action.deckKey].questions.concat({
                        question:action.card.question,
                        answer:action.card.answer
                    })
                }
            }
        default:
            return state
    }
}

export default decks