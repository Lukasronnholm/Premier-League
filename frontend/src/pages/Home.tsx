import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pitch from "../assets/pitch.jpeg";

interface Teams {
    id: number;
    name: string;
}

function Home() {
    const [teams, setTeams] = useState<Teams[]>([]);
    useEffect(() => {
        fetch("http://localhost:5000")
            .then((response) => response.json())
            .then((result) => {
                setTeams(result);
            });
    }, []);

    return (
        <>
            <div className="homeImgContainer">
                <img src={pitch} alt="pitch" className="pitchImg" />
                <div className="centerText">All things PL</div>
                <div className="fadeImg"></div>
            </div>
            <div className="homeContainer">
                {teams.map((team) => (
                    <div key={team.id} className="teamsBoxes">
                        <Link to={`/${team.id}`} className="teamsLinks">
                            {team.name}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Home;
