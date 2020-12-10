import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import {useSelector} from 'react-redux';


const StatComponent = () => {
    const playerNames = useSelector(state => state.MarriageSlice.playerNames);
    const gamePoints = useSelector(state => state.MarriageSlice.gamePoints);
    const numberOfPlayer = useSelector(state => state.MarriageSlice.numberOfPlayer);

    const pointAdditionFunc=()=>{
        let totalPointsArr = new Array(numberOfPlayer).fill(0);
        const testArr = gamePoints.map(gamePoint=>JSON.parse(gamePoint))
        testArr.map(points=>points.map((point,index)=>{return totalPointsArr[index]=point+totalPointsArr[index]}))
        return totalPointsArr
    }

    return (
        <>
            <IonGrid>
                <IonRow className="ion-align-items-start">
                    {playerNames.map(
                        (playerName,index)=>
                            <IonCol key={index} className="ion-align-self-start">
                                {playerName}
                            </IonCol>)
                    }
                </IonRow>

                <div style={{overflow:"scroll",height: "19rem"}}>
                    {
                        gamePoints.map((gamePoint,index)=>
                            <IonRow key = {index} className="ion-align-items-start">
                                {JSON.parse(gamePoint).map((point,index)=>
                                    <IonCol key={index} className="ion-align-self-start">
                                        {point}
                                    </IonCol>
                                )}
                            </IonRow>
                        )
                    }
                </div>
                <hr style={{backgroundColor: "black"}}/>
                <IonRow>
                    {pointAdditionFunc().map((point,index)=><IonCol key={index}>{point}</IonCol>)}
                </IonRow>
            </IonGrid>
        </>
    )
}

export default StatComponent
