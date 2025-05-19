import { useEffect, useState} from "react"
import {Link} from 'react-router-dom'

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
    const [message, setMeassage] = useState<string | null>(null)
    useEffect(()=>{
    async function  fetchPlayers () {
        try {
            const response = await fetch ('http://localhost:5000/players')
            const result = await response.json();
            setPlayer(result)
        } catch {
            setMeassage('Spelare kunde ej hämtas')
        }
    } fetchPlayers()
    },[])


const addPlayer = async (playerId: number) => {
    try {
         const response = await fetch ('http://localhost:5000/my-team',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({player_id: playerId})
    

    })
   
    const result = await response.json()

    if (response.ok){
        setMeassage(result.message)
    }else{
        setMeassage(result.error)
    }
    setTimeout(()=> setMeassage(null), 3000)
}catch {
    setMeassage('Något gick fel')
    setTimeout(()=> setMeassage(null), 3000)

}
}
return(
       
        <>
        <Link to='/my-team'>mitt lag</Link>
        {message && <p>{message}</p>}
        
             <ul className="ContainerText">{player.map((player)=> (
                <li key={player.id}>{player.name} {player.position} {player.goals} {player.assists}{player.matches_played}{player.team_id}<button onClick={()=> addPlayer(player.id)}>Lägg till</button></li>))}</ul>
       </>
       
       )
        
    
}
export default Player