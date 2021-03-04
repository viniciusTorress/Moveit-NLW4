import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompleteChallenges.module.css';
export function CompleteChallenges(){
    const {challengesComplete} = useContext(ChallengeContext)
    return(
        <div className={styles.completeChallengesContainer}>
            <span>desafios completos</span>
            <span>{challengesComplete}</span>
        </div>
    )
}