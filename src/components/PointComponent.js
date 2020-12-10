import React, { useEffect, useState } from 'react'
import { Radio,Button } from '@material-ui/core';
import { IonButton, IonInput, IonItem } from '@ionic/react'
import { addWinner, updatePlayerStats } from '../features/MarriageSlice';
import {useDispatch,useSelector} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';


const PointComponent = ({playerName,num}) => {
    const winner = useSelector(state => state.MarriageSlice.winner);
    const playerStats = useSelector(state => state.MarriageSlice.playerStats);

    const playerStatsCopied = cloneDeep(playerStats);

    const [selectedValue, setSelectedValue] = useState("unseen");
    const [points, setPoints] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        setSelectedValue(playerStats[parseInt(num)] && playerStats[parseInt(num)].seen)
        setPoints(playerStats[parseInt(num)] && playerStats[parseInt(num)].points)
    },[playerStats,num])

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

        const body={
            ...playerStatsCopied[parseInt(num)],
            "seen":event.target.value,
        }

        playerStatsCopied[parseInt(num)] = body;
        dispatch(updatePlayerStats(playerStatsCopied))
    };

    const pushItToState=()=>{
        const body={
            ...playerStatsCopied[parseInt(num)],
            points:parseInt(points)
        }

        playerStatsCopied[parseInt(num)] = body;
        dispatch(updatePlayerStats(playerStatsCopied));
    }

    const resetValue=()=>{
        const body = {
            playerName,
            seen:"unseen",
            points:""
        }
        playerStatsCopied[parseInt(num)] = body;
        dispatch(updatePlayerStats(playerStatsCopied));
        winner === playerName ? dispatch(addWinner("")) : console.log()
    }

    return (
        <div>
            <IonItem>
                <Radio
                    checked={selectedValue==='seen' }
                    onChange={handleChange}
                    value="seen"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                />
                <Radio
                    checked={selectedValue==='dublee'}
                    onChange={handleChange}
                    value="dublee"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'B' }}
                />
                <Button variant={winner === playerName ? "contained":"outlined"} 
                        color="primary" onClick={()=>dispatch(addWinner(playerName))}
                        style={{width:"7rem"}}>
                        {playerName}
                </Button>
                <IonInput 
                    value={points} 
                    placeholder="Enter Points" 
                    onIonChange={e => setPoints(e.target.value)}
                    onIonBlur={()=>pushItToState()}
                    style={{marginLeft:"10px"}}
                    >
                </IonInput>
                <IonButton color="primary" onClick = {()=>resetValue()}>x</IonButton>
            </IonItem>
        </div>
    )
}

export default PointComponent
