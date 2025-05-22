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

interface TeamInfo{
    id: number
    name: string
    position:number
    wins:number
    draws: number
    losses: number
    goal_difference: number
    points: number
    
}




function TeamInfo(){

    const [playerInfo, setPlayerInfo] = useState <PlayerInfo[]>([])
    const [teamInfo, setTeamInfo] = useState <TeamInfo[]> ([])
    const {id} = useParams<{id: string}>()

    useEffect (()=>{
    async function fetchPlayerInfo() {
        try {
            const response = await fetch (`http://localhost:5000/${id}`)
            const result = await response.json();
            setPlayerInfo(result.playerInfo)
            setTeamInfo(result.teamInfo)
            
            console.log(result)
        } catch {
            console.error('fel vid inhämtning')
        }
        
    }
    fetchPlayerInfo();
    },[])
     

    return(
    <>
   {teamInfo && teamInfo.map((team)=>(
    <div key={team.id}><h1>{team.name}</h1>
    <ul><li>
        {team.position}{team.wins}{team.draws}{team.losses}{team.goal_difference}{team.points}</li></ul> </div>))}
    

   
    
     <ul className="ContainerText">{playerInfo.map((player)=> (
                <li key={player.id}>{player.name} {player.position} {player.goals} {player.assists}{player.matches_played}{player.team_id}
                  </li>))}</ul>
                  </>
  
)}


export default TeamInfo