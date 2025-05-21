import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

interface PlayerInfo{
    id: number
    name: string
    position: string
    goals: number
    assists: number
    matches_played: number
    team_id: number
}

function TeamInfo(){

    const [playerInfo, setPlayerInfo] = useState <PlayerInfo[]>([])
    const {id} = useParams<{id: string}>()

    useEffect (()=>{
    async function fetchPlayerInfo() {
        try {
            const response = await fetch (`http://localhost:5000/${id}`)
            const result = await response.json();
            setPlayerInfo(result)
        } catch {
            console.error('fel vid inhämtning')
        }
        
    }
    fetchPlayerInfo();
    },[id])
    return(
    <>
    <h1>team</h1></>
)
}

export default TeamInfo