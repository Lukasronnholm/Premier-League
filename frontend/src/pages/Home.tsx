import { useEffect, useState} from "react"
import { Link } from "react-router-dom"

interface Teams {
    id: number
    name: string
    position: number
    played: number
    wins: number
    draws: number
    losses: number
    goal_difference: number
    points: number
}

function Home(){
     
    const [teams, setTeams] = useState<Teams[]>([])
useEffect(()=>{
    fetch ('http://localhost:5000')
    .then((response)=> response.json())
    .then((result)=>{
        setTeams(result)
    })

},[])
return(
       
        <>
        <Link to='/players'>players</Link>
        
             <ul className="ContainerText">{teams.map((team)=> (
                <li key={team.id}>{team.position} {team.name} {team.played} {team.wins} {team.draws} {team.losses} {team.goal_difference} {team.points}</li>))}</ul>
       </>
       
       )
        
    
}
export default Home