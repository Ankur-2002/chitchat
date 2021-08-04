
import {createContext, useCallback, useEffect, useReducer} from 'react'; 
import Reducers from './Reducers';
const intial_state = {
    user: (JSON.parse(localStorage.getItem("user")) === null) ? null : JSON.parse(localStorage.getItem("user")),
    waiting : false,
    error:false
}

const Context = createContext(intial_state);


const ContextProvider = (props) =>{
    const [state , dispatch] = useReducer(Reducers,intial_state);
    console.log(state.user)
   
     return (
        <Context.Provider value={{user : state.user ? state.user.data : null, error : state.error , waiting : state.waiting, dispatch}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider , Context}