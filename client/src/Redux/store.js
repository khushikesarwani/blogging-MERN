import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from 'redux-persist';



const rootReducer=combineReducers({
  user:userReducer,
 
});

const persistConfigs={
key:'root',
storage,
version:1,
};


const persistedReducer = persistReducer(persistConfigs,rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}), //imp else will give error
});

export const persistor=persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user:userReducer,
//   },
// });