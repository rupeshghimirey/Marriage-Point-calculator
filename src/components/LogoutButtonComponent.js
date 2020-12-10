import React from 'react';

// utils
import {useAuth} from '../auth/AuthProvider';

// libraries
import { useHistory } from "react-router";
import { IonButton } from '@ionic/react';
import {useDispatch} from 'react-redux';

// action
import {resetState} from '../features/MarriageSlice';

const LogoutButtonComponent = () => {
    const{logout} = useAuth();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogOut = async () =>{
        try {
            await logout();
            dispatch(resetState())
            history.push("/loginPage")     
        } catch (error) {
            
        }
    }

    return (
        <IonButton onClick={()=>handleLogOut()}>
                Log Out 
        </IonButton>
    )
}

export default LogoutButtonComponent
