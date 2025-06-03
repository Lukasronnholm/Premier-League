import { useEffect, useState } from "react";

interface Player {
    id: number;
    name: string;
    position: string;
    goals: number;
    assists: number;
    matches_played: number;
    team_id: number;
}

function Player() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerexist, setPlayerexist] = useState<number[]>([]);
    const [goalkeeper, setGoalkeeper] = useState<Player[]>([]);
    const [defender, setDefender] = useState<Player[]>([]);
    const [midfielder, setMidfielder] = useState<Player[]>([]);
    const [forward, setForward] = useState<Player[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        async function FetchMyTeam() {
            try {
                const response = await fetch("http://localhost:5000/my-team");
                const result = await response.json();
                setPlayerexist(result.map((player: Player) => player.id));
                setCount(result.length);
                setGoalkeeper(
                    result.filter(
                        (player: Player) => player.position === "Goalkeeper"
                    )
                );
                setDefender(
                    result.filter(
                        (player: Player) => player.position === "Defender"
                    )
                );
                setMidfielder(
                    result.filter(
                        (player: Player) => player.position === "Midfielder"
                    )
                );
                setForward(
                    result.filter(
                        (player: Player) => player.position === "Forward"
                    )
                );
            } catch {
                console.error("Fel vid inhämtning");
            }
        }
        FetchMyTeam();
    }, []);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await fetch("http://localhost:5000/players");
                const result = await response.json();
                setPlayers(result);
            } catch {
                console.error("Spelare kunde ej hämtas");
            }
        }
        fetchPlayers();
    }, []);

    const addPlayer = async (playerId: number) => {
        if (count >= 11 || playerexist.includes(playerId)) return;
        const playerPosition = players.find((player) => player.id === playerId);
        if (!playerPosition) return;
        if (playerPosition.position === "Goalkeeper")
            setGoalkeeper([...goalkeeper, playerPosition]);
        else if (playerPosition.position === "Defender")
            setDefender([...defender, playerPosition]);
        else if (playerPosition.position === "Midfielder")
            setMidfielder([...midfielder, playerPosition]);
        else if (playerPosition.position === "Forward")
            setForward([...forward, playerPosition]);

        try {
            const response = await fetch("http://localhost:5000/my-team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ player_id: playerId }),
            });
            await response.json();
            setCount((value) => value + 1);
            setPlayerexist([...playerexist, playerId]);
        } catch {
            console.error("Något gick fel");
        }
    };
    return (
        <>
            {" "}
            <h1>Create Team</h1>
            <section className="createPlayerText">
                <p>
                    Create a Team with maximum of 11 players (1 Goalkeeper 4
                    Defenders 4 Midfielders and 2 Forwards)
                </p>
            </section>
            <div className="playerChoiceContainer">
                {players.map((player) => (
                    <div key={player.id} className="playerChoiceBoxes">
                        <ul>
                            <li>Name: {player.name}</li>
                            <li>Position: {player.position}</li>
                            <li>Goals: {player.goals}</li>
                            <li>Assists: {player.assists}</li>
                            <li>Matches Played: {player.matches_played}</li>
                            {!playerexist.includes(player.id) &&
                                count < 11 &&
                                ((player.position === "Goalkeeper" &&
                                    goalkeeper.length < 1) ||
                                    (player.position === "Defender" &&
                                        defender.length < 4) ||
                                    (player.position === "Midfielder" &&
                                        midfielder.length < 4) ||
                                    (player.position === "Forward" &&
                                        forward.length < 2)) && (
                                    <button
                                        onClick={() => addPlayer(player.id)}
                                        className="playerChoiceButton"
                                    >
                                        Lägg till
                                    </button>
                                )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Player;
