import { useEffect, useState} from "react"
import { Link } from "react-router-dom"

interface Teams {
    id: number
    name: string
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
                <li key={team.id}><Link to ={`/${team.id}`}>{team.name}</Link></li>))}</ul>
       </>
       
       )
        
    
}
export default Home