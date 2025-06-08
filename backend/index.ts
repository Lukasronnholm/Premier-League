import cors from "cors";
import express,{Request, Response} from 'express'
import * as sqlite from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

let database: Database
const app = express()

app.use(cors())
app.use(express.json())

;(async () => {
  database = await sqlite.open({
    driver: sqlite3.Database,
    filename: 'data.sqlite'
  })

  await database.run('PRAGMA foreign_keys = ON')

  console.log('Redo att göra databasanrop')
})()


app.get("/", async (_request:Request, response:Response) => {
    try { 
        const teams = await database.all("SELECT * FROM teams") 
        response.status(200).json(teams)

    }catch(error){
        console.error(error)
        response.status(500).json({error:'Lag hittades ej'})
    
}})

app.get("/players", async (_request:Request, response:Response) => {
    try { 
        const players = await database.all("SELECT * FROM players") 
        response.status(200).json(players)

    }catch(error){
        console.error(error)
        response.status(500).json({error:'Spelare hittades ej'})
    
}})



app.post('/my-team', async ( request:Request, response:Response) =>{
    const {player_id} = request.body
    try {
        if(!player_id){
             response.status(400).json({error: 'Inget spelar-ID'})
        }
        else{
            await database.run ('INSERT INTO created_team_players (team_id, player_id) VALUES (?,?)',[1, player_id] )
            response.status(201).json({message: 'Spelare tillagd'})
        }
        
    }catch (error){      
        console.error(error)
        response.status(500).json({error:'Spelare kunde ej läggas till'})
        
    }
});
app.get("/my-team", async (_request:Request, response:Response) => {
    try { 
        const players = await database.all(
            `SELECT players.* 
            FROM created_team_players 
            JOIN players ON players.id = created_team_players.player_id 
            WHERE created_team_players.team_id = 1 
            LIMIT 11`) 
        response.status(200).json (players)

    }catch(error){
        console.error(error)
        response.status(500).json({error:'Spelare hittades ej'})
    
}})

app.delete("/my-team", async (_request:Request, response:Response) => {
    try { 
       await database.run('DELETE FROM created_team_players WHERE team_id = 1') 
        response.status(200).json({message:'Laget har tagits bort'})

    }catch(error){
        console.error(error)
        response.status(500).json({error:'Laget kunde inte tas bort'})
    
}})
app.get('/:id', async (request:Request, response:Response)=>{
    try {
    const playerInfo = await database.all('SELECT * FROM players WHERE team_id=?',[
        request.params.id ])
        const teamInfo = await database.all('SELECT * FROM teams WHERE id=?',[
        request.params.id ])
        response.status(200).json({playerInfo, teamInfo})
    } 
    catch(error){
        console.error(error)
        response.status(500).json({error:'Laget kunde inte hämtas'})
    }
     
    
})





app.listen(5000, ()=>{
    console.log('http://localhost:5000/')
});