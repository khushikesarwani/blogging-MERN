import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   Curruser:null,
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
            state.Curruser=action.payload;
            state.error=null;
            state.loading=false;
        },
        signInFailure:(state,action)=>{
            
            state.loading=false;
            state.error=action.payload;
},
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess:(state,action)=>{
            state.Curruser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
  });

  export const {signInFailure,SignInStart,signInSuccess,updateStart,updateSuccess,updateFailure}=userSlice.actions;

  export default userSlice.reducer; //reducer(singular)