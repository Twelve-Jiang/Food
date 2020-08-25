import {createStore} from 'redux'
import reducer from './reducer'
export default createStore(
    reducer,
    window.__REDUX_DEVTOLLS_EXTENSION__ && window.__REDUX_DEVTOLLS_EXTENSION__()
)