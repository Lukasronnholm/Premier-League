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
    const [playerexist, setPlayerexist] = useState<number[]>([])
    const [goalkeeper, setGoalkeeper] = useState(0)
    const [defender, setDefender] = useState(0)
    const [midfielder, setMidfielder] = useState(0)
    const [forward, setForward] = useState(0)
    const [count, setCount] = useState<number>(0)
    

        useEffect(()=>{
        async function FetchMyTeam() {
        try {
            const response = await fetch ('http://localhost:5000/my-team')  
            const result = await response.json();
            setPlayerexist(result.map((player: Player)=> player.id))
            setCount(result.length)  
            
        } catch{
            console.error('Fel vid inhämtning')
            }
        }
        FetchMyTeam();
    },[])
    
    useEffect(()=>{
    async function  fetchPlayers () {
        try {
            const response = await fetch ('http://localhost:5000/players')
            const result = await response.json();
            setPlayer(result)
        } catch {
            console.error('Spelare kunde ej hämtas')
        }
    } fetchPlayers()
    },[])

const addPlayer = async (playerId: number) => {
    if (count >= 11 || playerexist.includes(playerId))
        return;
        const playerPosition = player.find(player => player.id === playerId)
 if (!playerPosition)
    return;


    switch(playerPosition.position){
    case 'Goalkeeper':
        if(goalkeeper >=1 )
            return;
        setGoalkeeper(prev => prev +1)
        break;
        case 'Defender':
        if(defender >=4 )
            return;
        setDefender(prev => prev +1)
        break;
        case 'Midfielder':
        if(midfielder >=4 )
            return;
        setMidfielder(prev => prev +1)
        break;
        case 'Forward':
        if(forward >=2 )
            return;
        setForward(prev => prev +1)
        break;
        default:
            return;
}
    try {
         const response = await fetch ('http://localhost:5000/my-team',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({player_id: playerId})
    

    })
     await response.json()
        setCount(prev => prev +1)
        setPlayerexist([...playerexist, playerId])
        
}catch {
    console.error('Något gick fel')

}
}
return(
       
        <>
        <Link to='/my-team'>mitt lag</Link>
        
             <ul className="ContainerText">{player.map((player)=> (
                <li key={player.id}>{player.name} {player.position} {player.goals} {player.assists}{player.matches_played}{player.team_id}
                {!playerexist.includes(player.id) && count< 11 && 
                ((
                    (player.position === 'Goalkeeper' && goalkeeper < 1) || 
                    (player.position === 'Defender' && defender < 4) || 
                    (player.position === 'Midfielder' && midfielder < 4) || 
                    (player.position === 'Forward' && forward < 2)  )) && 
                    (<button onClick={()=> addPlayer(player.id)}>Lägg till</button>)}
                </li>))}</ul>
       </>
       
       )
        
    
}
export default Player