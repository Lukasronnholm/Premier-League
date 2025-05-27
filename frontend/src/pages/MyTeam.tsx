import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        async function FetchMyTeam() {
            try {
                const response = await fetch("http://localhost:5000/my-team");
                const result = await response.json();
                setPlayers(result);
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
        } catch (error) {
            console.error("Kunde ej ta bort laget");
        }
    };

    return (
        <>
            <Link to="/players">Spelare</Link>

            <h2>My teams</h2>
            <ul className="ContainerText">
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name} {player.position} {player.goals}{" "}
                        {player.assists}
                        {player.matches_played}
                        {player.team_id}
                    </li>
                ))}
            </ul>
            <button onClick={deleteTeam}> Ta bort laget</button>
        </>
    );
}
export default MyTeam;
