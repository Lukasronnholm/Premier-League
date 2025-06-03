import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imageLoader from "../components/images";

interface PlayerInfo {
    id: number;
    name: string;
    position: string;
    goals: number;
    assists: number;
    matches_played: number;
    team_id: number;
}

interface TeamInfo {
    id: number;
    name: string;
    position: number;
    wins: number;
    draws: number;
    losses: number;
    goal_difference: number;
    points: number;
}

function TeamInfo() {
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
    const [teamInfo, setTeamInfo] = useState<TeamInfo[]>([]);
    const { id } = useParams<{ id: string }>();
    const [teamsUrlbackground, setTeamsUrlbackground] = useState("");
    const imageForTeam = imageLoader().find((img) => img.id === Number(id));

    useEffect(() => {
        const getTeamsUrl = window.location.hash;
        if (
            getTeamsUrl === "#/1" ||
            getTeamsUrl === "#/2" ||
            getTeamsUrl === "#/7" ||
            getTeamsUrl === "#/9" ||
            getTeamsUrl === "#13" ||
            getTeamsUrl === "#/16" ||
            getTeamsUrl === "#/18"
        ) {
            setTeamsUrlbackground("#dd061b");
        } else if (
            getTeamsUrl === "#/3" ||
            getTeamsUrl === "#/10" ||
            getTeamsUrl === "#/17"
        ) {
            setTeamsUrlbackground("white");
        } else if (
            getTeamsUrl === "#/5" ||
            getTeamsUrl === "#/8" ||
            getTeamsUrl === "#/11" ||
            getTeamsUrl === "#/14" ||
            getTeamsUrl === "#/19" ||
            getTeamsUrl === "#/20"
        ) {
            setTeamsUrlbackground("darkblue");
        } else if (getTeamsUrl === "#/6" || getTeamsUrl === "#/15") {
            setTeamsUrlbackground("#7c2c3b");
        } else if (getTeamsUrl === "#/4") {
            setTeamsUrlbackground("#a2c5df");
        } else if (getTeamsUrl === "#/12") {
            setTeamsUrlbackground("#f3c630");
        }
    }, [id]);

    const divStyle = {
        backgroundColor: teamsUrlbackground,
    };

    useEffect(() => {
        async function fetchPlayerInfo() {
            try {
                const response = await fetch(`http://localhost:5000/${id}`);
                const result = await response.json();
                setPlayerInfo(result.playerInfo);
                setTeamInfo(result.teamInfo);

                console.log(result);
            } catch {
                console.error("fel vid inhämtning");
            }
        }
        fetchPlayerInfo();
    }, [id]);

    return (
        <>
            <div className="teamContainer">
                {imageForTeam && (
                    <img
                        src={imageForTeam.src}
                        title={imageForTeam.title}
                        alt={imageForTeam.description}
                        className="teamLogo"
                    />
                )}
                {teamInfo &&
                    teamInfo.map((team) => (
                        <div key={team.id}>
                            <h1 className="teamTitle">{team.name}</h1>
                        </div>
                    ))}
                <div style={divStyle} className="teamFront"></div>

                {teamInfo &&
                    teamInfo.map((team) => (
                        <div key={team.id}>
                            <ul className="teamStats">
                                <li>Position: {team.position}</li>
                                <li>Wins: {team.wins}</li>
                                <li>Draws: {team.draws}</li>
                                <li>Losses: {team.losses}</li>
                                <li> GD: {team.goal_difference}</li>
                                <li>Points: {team.points}</li>
                            </ul>
                        </div>
                    ))}
                <div className="playerStatsContainer">
                    {playerInfo.map((player) => (
                        <section key={player.id}>
                            <ul className="playerStats">
                                <li>Name: {player.name}</li>
                                <li>Position: {player.position}</li>
                                <li>Goals: {player.goals}</li>
                                <li>Assists: {player.assists}</li>
                                <li>Matches Played: {player.matches_played}</li>
                            </ul>
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TeamInfo;
