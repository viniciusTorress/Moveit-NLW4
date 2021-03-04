import { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/countdownContext';
import styles from '../styles/components/Countdown.module.css';

let  countdownTimeout: NodeJS.Timeout;

export function Countdown (){
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);    

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
    const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

    

    
    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>

            </div>
            {hasFinished ? (<button 
                disabled 
                className={styles.countdownButton} 
                >
                    Ciclo encerrado
                </button>) :(
                    <>
                    {isActive ? (
                <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}>
                    Abadonar o ciclo
                </button>
            ) :
            (
                <button 
                type="button" 
                className={styles.countdownButton} 
                onClick={startCountdown}>
                    Iniciar ciclo
                </button>
            )  }
                    </>
                )}
            
            
        </div>
    )
}