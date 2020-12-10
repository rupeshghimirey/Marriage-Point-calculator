import React, { useEffect, useState } from 'react';
import {IonContent, 
        IonPage, 
        IonLabel, 
        IonItem,
        IonSelect,
        IonSelectOption} from '@ionic/react';

// libraries
import { useHistory } from "react-router";
import {useDispatch,useSelector} from 'react-redux';

// actions
import { getNumOfPlayerAction } from '../features/MarriageSlice';

// component
import HeaderComponent from '../components/HeaderComponent';
import LogoutButtonComponent from '../components/LogoutButtonComponent';

const NumberOfPlayerPage = () => {
    const [numOfPlayer, setNumOfPlayer] = useState(); 
    const numOfPlayers = useSelector(state => state.MarriageSlice.numberOfPlayer);
    // creating connection
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(typeof numOfPlayers === 'number'){
            history.push('/playersName')
        }
    }, [history,numOfPlayers])

    const doSomeThing=(e)=>{
        setNumOfPlayer(e.detail.value);
        dispatch(getNumOfPlayerAction(parseInt(e.detail.value)));
        history.push('/playersName')
    }

    return (
        <IonPage>
            <HeaderComponent/>
            <IonContent>
                <IonItem>
                    <IonLabel># of Player</IonLabel>
                    <IonSelect value={numOfPlayer} placeholder="Select One" onIonChange={e => doSomeThing(e)}>
                        <IonSelectOption value="2">2</IonSelectOption>
                        <IonSelectOption value="3">3</IonSelectOption>
                        <IonSelectOption value="4">4</IonSelectOption>
                        <IonSelectOption value="5">5</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonContent>
            <LogoutButtonComponent/>
        </IonPage>
    )
}

export default NumberOfPlayerPage
