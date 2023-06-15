import Head from "next/head";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (serverTime: Date, clientTime: Date) => {
  const timeDiff = clientTime.getTime() - serverTime.getTime();
  const seconds = Math.floor(timeDiff / 1000) % 60;
  const minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};


export default function Home({ currentTime }) {
  const [serverTime, _setServerTime] = useState(new Date(currentTime));
  const [clientTime, _setClientTime] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState('');

  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  useEffect(() => {
    if (serverTime && clientTime) {
      const difference = calculateTimeDifference(serverTime, clientTime);
      setTimeDifference(difference);
    }
  }, [serverTime, clientTime]);

  const formattedServerDate = serverTime.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{formattedServerDate}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const currentTime = new Date().toISOString();

  return {
    props: {
      currentTime,
    },
  };
}
