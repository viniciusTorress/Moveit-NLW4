import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';
export function Profile(){
    const {level} = useContext(ChallengeContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/60801211?s=460&u=ed24b3eac14391068e49888e29a48a3f6c6a9d85&v=4" alt="Vinicius Torres"/>
            <div>
                <strong>Vinicius Torres</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}