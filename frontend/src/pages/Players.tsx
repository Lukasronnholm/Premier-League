import { useEffect, useState} from "react"

interface Player {
    id: number
    name: string
    position: string
    goals: number
    assists: number
    matches_played: number
    team_id: number

}

function Player(){
     
    const [player, setPlayer] = useState<Player[]>([])
useEffect(()=>{
    fetch ('http://localhost:5000/players')
    .then((response)=> response.json())
    .then((result)=>{
        setPlayer(result)
    })

},[])
return(
       
        <>
        
             <ul className="ContainerText">{player.map((player)=> (
                <li key={player.id}>{player.name} {player.position} {player.goals} {player.assists}{player.matches_played}{player.team_id}</li>))}</ul>
       </>
       
       )
        
    
}
export default Player