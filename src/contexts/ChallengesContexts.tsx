import challenges from '../../challenges.json';
import { createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from "js-cookie";
import { LevelUpModal } from '../components/LevelUPModal';


interface Challenge {
    type: 'body'| 'eye';
    description: string;
    amount: number;
}
interface ChallengeContextData{
    level:number;
    currentExperience: number;
    challengesComplete: number
    activeChallenge: Challenge;
    experienceToNextLevel:number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge:() => void;
    completeChallenge:()=> void;
    closeLevelUpModal: () => void;

}
interface ChallengesProviderProps {
    children: ReactNode;
    level:number;
    currentExperience: number;
    challengesComplete: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesComplete, setChallengesComplete]= useState(rest.challengesComplete ?? 0);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const [ activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level+1)*4,2);

    useEffect(() =>{
        Notification.requestPermission();
    }, [])
    useEffect(()=> {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesComplete', String(challengesComplete));
        
    },[level,currentExperience,challengesComplete]);
    function levelUp() {
        setLevel(level+1);
        setIsLevelUpModalOpen(true);

    }
    function closeLevelUpModal (){
        setIsLevelUpModalOpen(false);
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification,mp3').play();

        if (Notification.permission === 'granted'){
            new Notification('Novo desafio!!!!', {
                body: `valendo ${challenge.amount}xp!`
            })
        }

    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    function completeChallenge(){
        if (!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;

        let finalExperience = currentExperience+ amount;
        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesComplete(challengesComplete+1)
    }
    return(
        <ChallengeContext.Provider 
          value={{ 
            level,
            currentExperience,
            challengesComplete,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal}}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengeContext.Provider>
    )
}