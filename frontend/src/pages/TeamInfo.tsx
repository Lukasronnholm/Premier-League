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
            getTeamsUrl === "#/9" ||
            getTeamsUrl === "#/13" ||
            getTeamsUrl === "#/16" ||
            getTeamsUrl === "#/18"
        ) {
            setTeamsUrlbackground("red");
        } else if (getTeamsUrl === "#/3" || getTeamsUrl === "#/10") {
            setTeamsUrlbackground("black");
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
            setTeamsUrlbackground("purple");
        }
    }, [teamsUrlbackground]);

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
    }, []);

    return (
        <>
            <div style={divStyle}>
                {imageForTeam && (
                    <img
                        src={imageForTeam.src}
                        title={imageForTeam.title}
                        alt={imageForTeam.description}
                    />
                )}

                {teamInfo &&
                    teamInfo.map((team) => (
                        <div key={team.id}>
                            <h1>{team.name}</h1>
                            <ul>
                                <li>
                                    {team.position}
                                    {team.wins}
                                    {team.draws}
                                    {team.losses}
                                    {team.goal_difference}
                                    {team.points}
                                </li>
                            </ul>{" "}
                        </div>
                    ))}
            </div>

            <ul className="ContainerText">
                {playerInfo.map((player) => (
                    <li key={player.id}>
                        {player.name} {player.position} {player.goals}{" "}
                        {player.assists}
                        {player.matches_played}
                        {player.team_id}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TeamInfo;
