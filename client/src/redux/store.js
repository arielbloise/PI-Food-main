import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import  thunkMiddleware  from 'redux-thunk'

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta linea es para configurar la devtool de nuestro navegador

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware)) // Esta linea nos permite hacer peticiones a un servidor externo
)

export default store