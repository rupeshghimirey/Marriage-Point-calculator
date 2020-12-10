import { IonInput } from '@ionic/react'
import React, { useState } from 'react';

const InputComponent = ({ind,func}) => {
    const [playerName,setPlayerName] = useState("");

    return (
        <>
            <IonInput 
                value={playerName} 
                placeholder="Enter Player Name" 
                onIonChange={e => setPlayerName(e.target.value)}
                onBlur={()=>func(playerName,ind)}
                >
            </IonInput>
        </>
    )
}

export default InputComponent
