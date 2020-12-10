import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useAuth} from '../auth/AuthProvider';

const ProtectedRoute = ({component:Component,...rest}) => {
    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render={
                props=>{
                    return currentUser ? <Component {...props}/>: <Redirect to= "/loginPage"/>
                }
            }
        >
        </Route>
    )
}


export default ProtectedRoute
