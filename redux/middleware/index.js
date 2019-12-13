import Logger from './Logger'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
 
export default applyMiddleware(
    thunk,
    Logger
)