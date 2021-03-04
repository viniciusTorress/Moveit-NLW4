import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import { CountdownContext} from '../contexts/countdownContext';
import styles from '../styles/components/ChallengesBox.module.css';
 export function ChallengesBox() {

     const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext);
     const { resetCountdown} = useContext(CountdownContext)
     function handleChallengesucceeded(){
        completeChallenge();
        resetCountdown();
     }
     function handleChallengefailed(){
         resetChallenge();
         resetCountdown();
    }
     return(
         <div className={styles.challengesBoxContainer}>
             {activeChallenge ? (
                 <div className={styles.challengeActive}>
                     <header>Ganhe {activeChallenge.amount}</header>
                      <main>
                          <img src={`icons/${activeChallenge.type}.svg`}/>
                          <strong>Novo desafio</strong>
                          <p>{activeChallenge.description}</p>
                      </main>
                      <footer>
                          <button 
                          type='button'
                          className={styles.challengeFailedButton}
                          onClick={handleChallengefailed}
                          >Falhei</button>
                          <button
                          type='button'
                          className={styles.challengeSucceededButton}
                          onClick={handleChallengesucceeded}
                          >Completei</button>
                      </footer>
                 </div>
             ) : (
                 
                 <div className={styles.challengesBoxNotActive}>
                 <strong>Inicie um novo ciclo para receber mais desafios</strong>
                 <p>
                     <img src="icons/level-up.svg" alt="Levl up"/>
                     Avance de level completando desafios
                 </p>

                </div>
                 
             )}

          </div>
     )
 }