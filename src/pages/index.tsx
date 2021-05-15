import { ExperienceBar } from "../Components/experienceBar";
import { Profile } from "../Components/Profile";
import { ChalengeCompleted } from "../Components/ChalengesCompleted";
import { Countdown } from "../Components/Countdown";
import styles from '../styles/pages/home.module.css';
import { ChallengeBox } from "../Components/ChallengeBox";
import Head from 'next/head';
import { CountdownProvider } from "../contexts/CountdownContext"
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from "../contexts/ChallengesContext"

export default function Home(props) {

  return (
    <ChallengesProvider
    level = {props.level}
    currentExperience = {props.currentExperience}
    challengeCompleted = {props.challengeCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>

      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <ChalengeCompleted />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>

    </div>
    </ChallengesProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const user = {
  //  teste: "oi"
  // }
//  console.log(user);
const { level,currentExperience,challengeCompleted } = ctx.req.cookies;


  return {
    props: {
        level: +level ,
        currentExperience: +currentExperience,
        challengeCompleted: +challengeCompleted
    }
  }
}