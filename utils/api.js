import { AsyncStorage } from "react-native";

export const UdaciCards_STORAGE_KEY = 'Udacit:UdaciCards'

export const getDecks = () => {
    return AsyncStorage.getItem(UdaciCards_STORAGE_KEY)
        .then(result => {
            const decks = JSON.parse(result)
            console.log("get decks from storage",decks)
            return decks
        }).catch((error) => console.log('error',error))
}

// export const getDeck = (key) => {
//     return AsyncStorage.getItem(UdaciCards_STORAGE_KEY)
//     .then(result => {
//         const decks = JSON.stringify(result)
//         return decks[key]
//     }).catch((error) => console.log('error',error))

// }

export const AddDeck = (deck,key) => {
  
    return AsyncStorage.mergeItem(UdaciCards_STORAGE_KEY,JSON.stringify({
        [key]:deck
    }),() => console.log("add deck to storage",deck)).catch((error) => console.log('error',error))
}

export const AddCardToDeck = (card,deckId) => {
  
    getDecks().then(result => {
      
      let data = result
      data[deckId] = {
        ...data[deckId],
        questions:[
          ...data[deckId].questions.concat({
            question:card.question,
            answer:card.answer
          }), 
        ]

      }

      AsyncStorage.setItem(UdaciCards_STORAGE_KEY, JSON.stringify(data))
      .then(result => console.log('card added'))

    })
}

export const mockData = {
    "React": {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    'JavaScript': {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }