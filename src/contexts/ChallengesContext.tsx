import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie';
import {LevelUpModal} from '../Components/LVLupModal'
interface ChallengeProviderProps {
    children: ReactNode;
    level : number;
    currentExperience : number;
    challengeCompleted : number;
}

class Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;

}

interface ChallengeContextData{
    level: number;
    currentExperience: number;
    challengeCompleted: number;
    activeChallenge: Challenge;
    levelUp:  () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
    closeLVLUpModal: () => void;
}
// rest contem todas as outras propriedades que não foram definidas separadamente do objeto
export const challengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children, ...rest }: ChallengeProviderProps) {

    const [level, setLevel] = useState( rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState( rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengedCompleted] = useState( rest.challengeCompleted ?? 0);
    const [activeChallenge,setActiveChallenge] = useState(null);
    const experienceToNextLevel  = Math.pow((level +1) * 4,2);

    const [isLVLModalOpen, setLVLModalOpen] = useState(false);

    function levelUp() {
        setLevel(level + 1);
        setLVLModalOpen(true);
    }

    function closeLVLUpModal(){
        setLVLModalOpen(false);
    }

    useEffect(() => {
        Notification.requestPermission();
    },[])

    useEffect(()=>{
         Cookies.set("level", level.toString())
         Cookies.set("currentExperience", currentExperience.toString())
         Cookies.set("challengeCompleted", challengeCompleted.toString())
    },[level,currentExperience,challengeCompleted])

    function startNewChallenge() {
        const random = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[random]
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
             new Notification('Novo desafio ', {
              body: `Valendo ${challenge.amount}xp`
            });
          }
      
    }


    function resetChallenge() {
        setActiveChallenge(null);
    }

 
    function completeChallenge(){

            if(!activeChallenge){
                return;
            }

        const { amount } = activeChallenge; 

        let finalExp = currentExperience + amount;

        if(finalExp >= experienceToNextLevel){
            finalExp -= experienceToNextLevel;
            levelUp();
        }
   
        setCurrentExperience(finalExp);
        setActiveChallenge(null);
        setChallengedCompleted(challengeCompleted+1);
    }

    return (
        <challengesContext.Provider value={{
            level,
            currentExperience,
            challengeCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLVLUpModal,
        }}>
            {children}
 
       {  isLVLModalOpen &&  <LevelUpModal/> }
        </challengesContext.Provider>
    )
}