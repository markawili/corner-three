import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PlayerOfTheDay from "@/components/PlayerOfTheDay";

import { database } from "@/firebase-config/config";
import { doc, getDoc } from "firebase/firestore"

function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}${day}${year}`;
}


export default function Home() {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const docId = formatDate(new Date())
        const docRef = doc(database, "featuredPlayers", docId)

        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          return setPlayer(snapshot.data());
        } else {
          console.log("Document does not exist")
        }

      } catch (error) {
        console.error("Error fetching player", error);
      }
    }

    fetchPlayer();
  }, [])

  return (
    <Layout>
      <PlayerOfTheDay player={player} />
    </Layout>
  )
}
