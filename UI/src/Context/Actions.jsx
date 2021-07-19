 

const START_LOGIN = (userdetails) =>{
    return (
        {
            type : "START_LOGIN"
        }
    )
}

const IS_FETCH = (user) =>{
return ({
    type : "FETCHING_SUCCESSFULL",
    payload : user
})
}
const ERROR = (error) =>{
    return ({
        type: "Error",
        payload : error
    })
}

const Follow = (userId) =>{
    return ({
        type : "Follow",
        payload : userId
    })
}

const UnFollow = (userId) =>{
    return ({
        type : "UnFollow",
        payload : userId
    })
}
const updateUser = (user) =>{
    return ({
        type : "userUpdate",
        payload : user
    });
}
export {START_LOGIN , IS_FETCH ,ERROR , Follow, UnFollow, updateUser};