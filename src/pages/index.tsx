import {GetServerSideProps} from 'next'
import { ChallengesBox } from '../components/ChallengesBox';
import { CompleteChallenges } from '../components/CompleteChallenges';
import { Countdown } from '../components/Countdown';
import {ExperienceBar} from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContexts';
import { CountdownProvider } from '../contexts/countdownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level:number;
  currentExperience: number;
  challengesComplete: number;
}
export default function Home(props: HomeProps) {
  return ( 
    <ChallengesProvider  
    level={props.level} 
    currentExperience={props.currentExperience} 
    challengesComplete={props.challengesComplete}>   
      <div className={styles.container}>      
        <ExperienceBar/>
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompleteChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengesBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
      </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesComplete} = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesComplete: Number(challengesComplete)
    }
  }
}