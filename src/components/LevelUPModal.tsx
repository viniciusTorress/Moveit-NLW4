import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContexts'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){
    const {level, closeLevelUpModal} =useContext(ChallengeContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parebens!</strong>
                <p>você alcançou um novo level</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    )
}