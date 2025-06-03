import { useEffect, useState } from "react";

interface MyTeam {
    id: number;
    name: string;
    position: string;
    goals: number;
    assists: number;
    matches_played: number;
    team_id: number;
}

function MyTeam() {
    const [players, setPlayers] = useState<MyTeam[]>([]);
    const [goalsValue, setGoalsValue] = useState(0);
    const [assistsValue, setAssistsValue] = useState(0);
    const [matchPlayedValue, setMatchPlayedValue] = useState(0);

    useEffect(() => {
        async function FetchMyTeam() {
            try {
                const response = await fetch("http://localhost:5000/my-team");
                const result = await response.json();
                setPlayers(result);

                const allPlayerGoals = result.reduce(
                    (value: number, player: MyTeam) => value + player.goals,
                    0
                );
                const allPlayerAssists = result.reduce(
                    (value: number, player: MyTeam) => value + player.assists,
                    0
                );
                const allPlayerMatchPlayed = result.reduce(
                    (value: number, player: MyTeam) =>
                        value + player.matches_played,
                    0
                );
                setGoalsValue(allPlayerGoals);
                setAssistsValue(allPlayerAssists);
                setMatchPlayedValue(allPlayerMatchPlayed);
            } catch {
                console.error("Fel vid inhämtning");
            }
        }
        FetchMyTeam();
    }, []);

    const deleteTeam = async () => {
        try {
            const response = await fetch("http://localhost:5000/my-team", {
                method: "DELETE",
            });
            await response.json();
            setPlayers([]);
            setGoalsValue(0);
            setAssistsValue(0);
            setMatchPlayedValue(0);
        } catch (error) {
            console.error("Kunde ej ta bort laget", error);
        }
    };

    return (
        <>
            <h2 className="myTeamTitle">My team</h2>
            <div className="myTeamContainer">
                {players.map((player) => (
                    <section key={player.id} className="myTeamPlayerBoxes">
                        <ul>
                            <li>Name: {player.name}</li>
                            <li>Position: {player.position}</li>
                            <li>Goals: {player.goals}</li>
                            <li>Assists: {player.assists}</li>
                            <li>Matches Played: {player.matches_played}</li>
                        </ul>
                    </section>
                ))}
            </div>
            {goalsValue > 0 ||
                assistsValue > 0 ||
                (matchPlayedValue > 0 && (
                    <section className="allPlayerStatsContainer">
                        <h3>Stats for My Team</h3>
                        <p>Total Goals: {goalsValue}</p>
                        <p>Total Assists: {assistsValue}</p>
                        <p>Total Matches Played: {matchPlayedValue}</p>
                    </section>
                ))}

            <div className="deleteButtonContainer">
                <button onClick={deleteTeam} className="deleteButton">
                    Delete team
                </button>
            </div>
        </>
    );
}
export default MyTeam;
