export const ADD_DECK = "ADD_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_QUETION = "ADD_QUESTION"

export function receiveDecks(decks) {
    
    return {
        type:RECEIVE_DECKS,
        decks
    }
}

//deck.key && deck.title
export function addDeck(deck,key) {
    return {
        type:ADD_DECK,
        deck,
        key
    }
}

//
export function addQuetionToDeck(card,deckKey) {
    return {
        type:ADD_QUETION,
        card,
        deckKey
    }
}