import React,{useEffect, useState} from 'react';
import {IonButton, IonPage} from '@ionic/react';

// utils
import {useAuth} from '../auth/AuthProvider';

// libraries
import { useHistory } from "react-router";

// component
import HeaderComponent from '../components/HeaderComponent';

const LoginPage = () => {
    const [loading,setLoading] = useState(false)
    const{login,currentUser} = useAuth();
    const history = useHistory();

    useEffect(()=>{
        currentUser && history.push("/")
    },[history,currentUser])

    const handleLogIn = async () =>{
        setLoading(true)
        try { 
            await login();
        } catch (error) {
            console.log('ERROR = ',error)
        }
    }
    return (
        <IonPage>
            <HeaderComponent/>
            {!loading && 
            <>
                <IonButton onClick={()=>handleLogIn()}>
                    Log In 
                </IonButton>
                <IonButton onClick ={()=>history.push("/gameIDPage")}>
                    Observe a Game
                </IonButton>
            </>
            }
        </IonPage>
    )
}

export default LoginPage
