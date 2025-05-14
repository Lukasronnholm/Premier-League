import { error } from "console";
import cors from "cors";
import express, { response } from "express";
import { request } from "https";
import * as sqlite from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

let database: Database

;(async () => {
  database = await sqlite.open({
    driver: sqlite3.Database,
    filename: 'data.sqlite'
  })

  await database.run('PRAGMA foreign_keys = ON')

  console.log('Redo att göra databasanrop')
})()

const app = express()

app.use(cors())

app.get("/", async (request, response) => {
    try { 
        const teams = await database.all("SELECT * FROM teams") 
        response.json (teams)

    }catch(error){
        console.error(error)
        response.status(500).json({error:'Lag hittades ej'})
    
}})
app.listen(5000, ()=>{
    console.log('http://localhost:5000/')
})
