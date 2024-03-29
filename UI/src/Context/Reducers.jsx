const Reducer = (initial_state, action) => {
  switch (action.type) {
    case 'START_LOGIN':
      return {
        user: null,
        waiting: true,
        error: false,
      };
    case 'Register':
      console.log(action.payload);
      window.localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        user: action.payload,
        waiting: false,
        error: false,
      };
    case 'FETCHING_SUCCESSFULL':
      return {
        user: action.payload,
        waiting: false,
        error: false,
      };
    case 'Error':
      return {
        user: null,
        waiting: false,
        error: action.payload,
      };
    case 'Follow':
      return {
        ...initial_state,
        user: {
          ...initial_state.user,
          following: [...initial_state.user.following, action.payload],
        },
      };
    case 'updateUser':
      const data = window.localStorage.getItem('user');
      let data1 = JSON.parse(data);
      const oldData = data1.data;
      //   console.log(data1.data);
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          ...data1,
          data: {
            ...oldData,
            profilePicture: action.payload,
          },
        })
      );
      return {
        ...initial_state,
        user: {
          ...initial_state.user,
          profilePicture: action.payload,
        },
      };

    case 'UnFollow':
      return {
        ...initial_state,
        user: {
          ...initial_state.user,
          following: initial_state.user.following.filter(
            (id, key) => id !== action.payload
          ),
        },
      };
    default:
      return {
        ...initial_state,
      };
  }
};

export default Reducer;
