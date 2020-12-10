import {createSlice} from '@reduxjs/toolkit';

// libraries
import axios from 'axios';

// utils
import {db} from '../firebase.util';

const initialState ={
    adminUid:"",
    adminName:"",
    numberOfPlayer:"",
    playerNames:[],
    playerStats:[],
    gamePoints:[],
    gameID:"",
    winner:"",
    error:""
}
// reducers
export const MarriageSlice = createSlice({
    name:'marriage',
    initialState,
    reducers:{
        resetStateReducer:state=>initialState,
        setAdminUidReducer:(state,action)=>{
            state.adminUid = action.payload
        },
        setAdminNameReducer:(state,action)=>{
            state.adminName = action.payload
        },
        getNumOfPlayerReducer:(state,action)=>{
            state.numberOfPlayer=action.payload
        },
        addPlayerNamesReducer:(state,action)=>{
            typeof action.payload=== "object" ? state.playerNames = [...action.payload]: state.playerNames.push(action.payload);
        },
        getErrorDataReducer:(state,action)=>{
            state.error = action.payload
        },
        addWinnerReducer:(state,action)=>{
            state.winner=action.payload
        },
        setPlayerStatsReducer:(state,action)=>{
            state.playerStats.push(action.payload)
        },
        updatePlayerStatsReducer:(state,action)=>{
            state.playerStats = action.payload
        },
        setPlayerIndividualPointReducer:(state,action)=>{
            state.playerIndividualPoints=action.payload
        },
        setGamePointsReducer:(state,action)=>{
            state.gamePoints = [...action.payload]
        },
        setGameIDReducer:(state,action)=>{
            state.gameID=action.payload
        }
    }
})

// export the reducer
export default MarriageSlice.reducer;

// actions
const { getNumOfPlayerReducer,
        addPlayerNamesReducer,
        getErrorDataReducer,
        addWinnerReducer,
        setPlayerStatsReducer,
        updatePlayerStatsReducer,
        setGamePointsReducer,
        setAdminUidReducer,
        setAdminNameReducer,
        resetStateReducer,
        setGameIDReducer
        } = MarriageSlice.actions;

export const resetState = () => dispatch=>{
    try {
        console.log('Entered set reset state');

        dispatch(resetStateReducer());
    } catch (error) {
        
    }
}

export const setGameAdmin = (adminInfo) => dispatch=>{
    try {
        console.log('Entered set game admin',adminInfo);

        dispatch(setAdminUidReducer(adminInfo.adminUid));
        dispatch(setAdminNameReducer(adminInfo.adminName));
    } catch (error) {
        
    }
}

export const getNumOfPlayerAction = (numOfPlayer)=>dispatch=>{
    try {
        console.log('Entered getNumOfPlayerAction ')
        dispatch(getNumOfPlayerReducer(numOfPlayer))
    } catch (error) {
        
    }
}

export const addPlayerName = (playerName) =>dispatch=>{
    try {
        console.log('Entered addPlayerNames');
        dispatch(addPlayerNamesReducer(playerName))
    } catch (error) {
        
    }
}

export const storeGameInfo = (body)=>async dispatch=>{
    try {
        console.log('Entered storeGameInfo = ', body)

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/v1/storeGameInfo',body,config)

        return res.data

    } catch (error) {
        
    }
}

export const getGameInfo = (body) => async dispatch=>{
    try {
        console.log('Entered get game info = ', body)

        const res = await axios.get(`api/v1/storeGameInfo/${body.gameID}`);

        const {data} = res.data;

        dispatch(getNumOfPlayerReducer(data.numOfPlayers));
        dispatch(addPlayerNamesReducer(data.playersName));
        dispatch(setGameIDReducer(data.gameID));
        dispatch(setGamePoint(data.gamePoints));

        return res.data;
        
    } catch (error) {
        
    }
}

export const addWinner = (winner)=>dispatch=>{
    try {
        console.log("Entered add winner");

        dispatch(addWinnerReducer(winner));

    } catch (error) {
        
    }
}

export const setPlayerStats = (body)=>dispatch=>{
    try {
        console.log("Entered set player stat");

        dispatch(setPlayerStatsReducer(body));

    } catch (error) {
        
    }
}

export const updatePlayerStats = (body)=>dispatch=>{
    try {
        console.log("Entered set player state = ", body);

        dispatch(updatePlayerStatsReducer(body));
        
    } catch (error) {
        
    }
}

export const setPlayerIndividualPoint = (body)=>async dispatch=>{
    try {
        console.log('Entered storeGameInfo = ', body);

        const config = {
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${body.token}`
            }
        }

        const bodyToSend={
            gameID:body.gameID,
            gamePoints:body.gamePoints
        }

        const res = await axios.post('/api/v1/updateGameInfo',bodyToSend,config);

        dispatch(setGamePointsReducer(res.data.data.gamePoints));

        return res.data;
        
    } catch (error) {
        
    }
}

export const setPointsToFirestore = (body) =>async=>{
    try {
        console.log("Entered set points to Firestore = ",body);
        
        db.collection("Marriage")
                        .doc(`${body.gameID}`)
                        .set({
                            point:body.gamePoints
                        }).then(()=>{
            console.log('data successfully added');
        }).catch(error=>{
            console.log(error);
        });

    } catch (error) {
        
    }
}

export const setGamePoint = (body)=>async dispatch=>{
    try {
        console.log("Entered set Game Point");

        dispatch(setGamePointsReducer(body));

        return true;
        
    } catch (error) {
        
    }
}