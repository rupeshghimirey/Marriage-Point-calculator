import React, { useState,useEffect } from 'react'
import { useLocation } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import {IonContent, 
        IonPage, 
        IonButton,
        IonGrid,
        IonRow,
        IonCol} from '@ionic/react';

//util
import {useAuth} from '../auth/AuthProvider';

// action
import {getGameInfo,
        updatePlayerStats,
        addWinner, 
        setPlayerIndividualPoint,
        setPointsToFirestore,
        setPlayerStats} from '../features/MarriageSlice';

// component
import PointComponent from '../components/PointComponent';
import HeaderComponent from '../components/HeaderComponent';
import StatComponent from '../components/StatComponent';
import LogoutButtonComponent from '../components/LogoutButtonComponent';

const GamePage = () => {
    const location = useLocation(); 
    const dispatch = useDispatch();
    const playerNames = useSelector(state => state.MarriageSlice.playerNames);
    const numberOfPlayer = useSelector(state => state.MarriageSlice.numberOfPlayer);
    const playerStats = useSelector(state => state.MarriageSlice.playerStats);
    const winner = useSelector(state => state.MarriageSlice.winner);
    const [gameID,setGameID] = useState(0);
    const playerStatsCopied = cloneDeep(playerStats);
    const {getAuthToken} = useAuth();

    useEffect(() =>{
        const gameID = location.search.replace(/[?]/,""); 
        const body = {
            gameID:gameID
        }
        dispatch(getGameInfo(body))
        setGameID(gameID)
    }, [dispatch,location.search])

    useEffect(()=>{ 
        playerNames.map((playerName)=>{
            dispatch(setPlayerStats({
                playerName,
                seen:"unseen",
                points:""
            }))
        })    
    },[playerNames])
    
    const calculatePoint=async ()=>{
        let individualPointArr = [];
        let seenCount = 0;
        let dubleeCount = 0;
        let unSeenCount = 0;
        let dubleeWinner = false
        let token = "";

        const arr = playerStats.map(playerStat=>typeof(playerStat.points) === "string" ? 0: playerStat.points )
        const totalPoint = arr.reduce((acc,item)=>acc+item);

        playerStats.map(playerStat=>{
            if(playerStat.seen==="seen" && playerStat.playerName !== winner){
                seenCount+=1;
            }else if(playerStat.seen==="dublee" && playerStat.playerName !== winner){
                dubleeCount+=1;
            }else if(playerStat.seen==="dublee" && playerStat.playerName === winner){
                dubleeWinner=true;
            }else if(playerStat.seen==="unseen"){
                unSeenCount+=1
            }   
            return true;
        })

        token = await getAuthToken();

        playerStats.map(playerStat=>{
            if(playerStat.seen==="unseen"){
                individualPointArr.push((parseInt(totalPoint)+10)*-1);
            }else if(playerStat.seen==="seen" && playerStat.playerName === winner){
                individualPointArr.push(numberOfPlayer*playerStat.points-parseInt(totalPoint)+seenCount*3+unSeenCount*10)
            }else if(playerStat.seen==="dublee" && playerStat.playerName === winner){
                individualPointArr.push(numberOfPlayer*playerStat.points-parseInt(totalPoint)+seenCount*5+unSeenCount*10)
            }else if(playerStat.seen==="seen" && playerStat.playerName !== winner){
                if(dubleeWinner){
                    individualPointArr.push(numberOfPlayer*playerStat.points-parseInt(totalPoint)-5)
                }else{
                    individualPointArr.push(numberOfPlayer*playerStat.points-parseInt(totalPoint)-3)
                }
            }else if(playerStat.seen==="dublee" && playerStat.playerName !== winner){
                individualPointArr.push(numberOfPlayer*playerStat.points-parseInt(totalPoint))
            }
            return true;
        })
        
        const gamePointResponse = await dispatch(setPlayerIndividualPoint({gameID:gameID,gamePoints:JSON.stringify(individualPointArr),token:token}))

        dispatch(setPointsToFirestore({gameID:gameID,gamePoints:gamePointResponse.data.gamePoints}))
        
        // sets all stats to initial 
        playerStats.map((playerStat,index)=>{
            const body = {
                ...playerStatsCopied[parseInt(index)],
                playerName: playerStat.playerName,
                seen:"unseen",
                points:""
            }
            playerStatsCopied[parseInt(index)] = body;
        })
        dispatch(updatePlayerStats(playerStatsCopied));
        dispatch(addWinner(""))
    }

    return (
        <IonPage>
            <HeaderComponent/>
            <div style={{height:"265px"}}>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2">seen</IonCol>
                            <IonCol size="2">dubley</IonCol>
                        </IonRow>
                    </IonGrid>
                    {playerNames.map((name,index)=><PointComponent playerName = {name} key={index} num = {index}/>)}
                </IonContent>
            </div>
            <IonContent>
                <StatComponent/>
            </IonContent>
            <IonButton onClick={()=>calculatePoint()}>Submit Points</IonButton>
            <LogoutButtonComponent/>
        </IonPage>
    )
}

export default GamePage
