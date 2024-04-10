import React from 'react';
import {useSelector} from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';



export default function OnlyAdminPrivateRoute(){

    const {Curruser}=useSelector((state)=>state.user);

return (
    Curruser.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />
        
    )
}