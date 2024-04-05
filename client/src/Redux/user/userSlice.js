import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user:null,
   error:null,
   loading:false
  }

  export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{    //reducers (plural)
        SignInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.user=action.payload;
            state.error=null;
            state.loading=false;
        },
        signInFailure:(state,action)=>{
            
            state.loading=false;
            state.error=action.payload;
},
    },
  });

  export const {signInFailure,SignInStart,signInSuccess}=userSlice.actions;

  export default userSlice.reducer; //reducer(singular)