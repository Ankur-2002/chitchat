import axios from "axios";

const CallsServer = async (user , dispatch) =>{

    await dispatch({type : "START_LOGIN"}); 
    try {    
        
       const res = await axios.post('/api/auth/login',user);   
       localStorage.setItem("user",JSON.stringify(res));
       dispatch({type : "FETCHING_SUCCESSFULL", payload : res});  

    } catch (error) {
        dispatch({type : "Error", payload : error})
    }

}

export default CallsServer;