import { IonButton, IonContent, IonInput, IonPage } from '@ionic/react';
import React, { useState } from 'react';

// component
import HeaderComponent from '../components/HeaderComponent';

// libraries
import { useHistory } from "react-router";

const GameIDPage = () => {
    const [gameId,setGameId] = useState("");
    const history = useHistory();

    return (
        <IonPage>
            <HeaderComponent/>
            <IonContent>
                <IonInput
                    placeholder="Enter the Game ID"
                    value = {gameId}
                    onIonChange = {(e)=>setGameId(e.detail.value)}
                />
            </IonContent>
            <IonButton 
                onClick = {()=>history.push({
                    pathname:"/justPointPage",
                    search:`${gameId}`})}
                disabled={!!gameId?false:true}
                > Show the Stats</IonButton>
        </IonPage>
    )
}

export default GameIDPage
