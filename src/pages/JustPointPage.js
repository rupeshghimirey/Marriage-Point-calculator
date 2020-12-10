import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';

// libraries
import { useHistory, useLocation } from "react-router";

// components
import HeaderComponent from '../components/HeaderComponent';
import StatComponent from '../components/StatComponent';

// action
import { getGameInfo,setGamePoint } from '../features/MarriageSlice';

// util
import {db} from '../firebase.util';

const JustPointPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        const gameID = location.search.replace(/[?]/,""); 

        !gameID? history.push("/loginPage"):(async()=>{
            const body = {
                gameID: gameID
            }
            dispatch(getGameInfo(body))

            let firebaseX = await db;

            await new Promise(
                ()=>{
                firebaseX
                    .collection('Marriage')
                    .doc(`${gameID}`)
                    .onSnapshot(doc =>{
                        doc.data() && doc.data().point && dispatch(setGamePoint(doc.data().point))
                    })
                }
            )}
        )();
    },[dispatch,history,location.search])

    return (
        <IonPage>
            <HeaderComponent/>
            <IonContent>
                <StatComponent/>
            </IonContent>
        </IonPage>
    )
}

export default JustPointPage
