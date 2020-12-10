import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {IonContent, 
        IonPage, 
        IonButton} from '@ionic/react';

// utils
import { useHistory } from "react-router";
import { addPlayerName, storeGameInfo } from '../features/MarriageSlice';
import {useAuth} from '../auth/AuthProvider';

// libraries
import uuid from 'react-uuid';

// component
import HeaderComponent from '../components/HeaderComponent';
import InputComponent from '../components/InputComponent';
import LogoutButtonComponent from '../components/LogoutButtonComponent';

const PlayersNamePage = () => {
    const numOfPlayers = useSelector(state => state.MarriageSlice.numberOfPlayer);
    const playerNames = useSelector(state => state.MarriageSlice.playerNames);
    const gameID = useSelector(state => state.MarriageSlice.gameID);
    const adminName = useSelector(state => state.MarriageSlice.adminName);
    const dispatch = useDispatch();
    const history = useHistory();
    const {getAuthToken} = useAuth();
    let token = "";

    const playersNameArr = [];
    let playerNum = new Array(!!!numOfPlayers ? "" : numOfPlayers).fill(null);

    useEffect(() => {
        (typeof numOfPlayers === 'number') ? console.log(numOfPlayers): history.push('/') 
        if(playerNames.length > 0){
            history.push({pathname:"/gamePage",search:`${gameID}`})
        }
    }, [numOfPlayers, history,playerNames.length,gameID])

    const storeGameInfoAction=async ()=>{
        dispatch(addPlayerName(playersNameArr))
        token = await getAuthToken();

        const body={
            gameID: uuid(),
            adminName: adminName,
            numOfPlayers: numOfPlayers,
            playersName:playersNameArr,
            gamePoints:[],
            oauthToken:token
        }

        const storeGameDataResult = await dispatch(storeGameInfo(body))
    
        storeGameDataResult && storeGameDataResult.success ? 
            history.push({pathname:"/gamePage",search:`${storeGameDataResult.data.gameID}`}):
            console.log("");
    }

    const pushItToArr = (name,index)=>{
        playersNameArr[index]=name;
    }

    return (
        <IonPage>
            <HeaderComponent/>
            <IonContent>
                {
                    playerNum && playerNum.map((value,index)=>{
                        return <InputComponent  key = {index} 
                                                ind = {index} 
                                                func={(name)=>pushItToArr(name,index)}/>
                    })
                }
            </IonContent>
            <IonButton onClick={()=>storeGameInfoAction()}>Play Game</IonButton>
            <LogoutButtonComponent/>
        </IonPage>
    )
}

export default PlayersNamePage
