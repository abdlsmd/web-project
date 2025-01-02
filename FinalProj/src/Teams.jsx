import { useState } from 'react';
import TestHome from './TeamHome'; // Ensure the correct path
import styles from './teams.module.css';
import { useNavigate } from 'react-router-dom';

/**
 *
 */
export default function Teams() {
     const navigate = useNavigate();
    const [selectedTeam, setSelectedTeam] = useState(null);

    const teamImages = {
        operations: "./image/operations.png",
        finance: "./image/finance3.png",
        eventPlanning: "./image/eventPlanning.png",
        content: "./image/originalContent3.png",
        training: "./image/training.png"
    };

    const handleTeamClick = (team) => {
       setSelectedTeam(team);
       navigate('/team-home', { state: { image: teamImages[team], eventName: `${team.charAt(0).toUpperCase() + team.slice(1)} Team` } });
    };

    return (
        <div className={styles.Precontainer}>
            {selectedTeam && (
                <TestHome
                    image={teamImages[selectedTeam]}
                />
            )}

            <div className={styles.PretextOverlay}>
                <div className={styles.card} onClick={() => handleTeamClick('operations')}>
                    <img className={styles.images} src="./image/operations.png" alt="Operations Team" />
                    <a className={styles.PreText} >Operations Team</a>
                </div>
                <div className={styles.card} onClick={() => handleTeamClick('finance')}>
                    <img className={styles.images} src="./image/finance3.png" alt="Finance Team" />
                    <a className={styles.PreText} >Finance Team</a>
                </div>
                <div className={styles.card} onClick={() => handleTeamClick('eventPlanning')}>
                    <img className={styles.images} src="./image/eventPlanning.png" alt="Event Planning Team" />
                    <a className={styles.PreText} >Event Planning</a>
                </div>
                <div className={styles.card} onClick={() => handleTeamClick('content')}>
                    <img className={styles.images} src="./image/originalContent3.png" alt="Content Creation Team" />
                    <a className={styles.PreText} >Content Creation Team</a>
                </div>
                <div className={styles.card} onClick={() => handleTeamClick('training')}>
                    <img className={styles.images} src="./image/training.png" alt="Training and Development Team" />
                    <a className={styles.PreText} >Training and Development Team</a>
                </div>
            </div>
        </div>
    );
}
