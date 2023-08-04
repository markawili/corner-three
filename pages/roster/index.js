import { useState, useEffect } from "react"
import Layout from "@/components/Layout"
import { 
    SimpleGrid, Stack,
} from "@chakra-ui/react"

import { fetchTeams } from "@/pages/api/balldontlie"
import { fetchAllPlayers } from "@/pages/api/nbastats"
import CenterSpinner from "@/components/CenterSpinner"
import TeamCard from "@/components/TeamCard"
import PlayerSearch from "@/components/PlayerSearch"

const Roster = () => {
    const [isLoadingTeams, setIsLoadingTeams] = useState(true)
    const [teams, setTeams] = useState(null)

    const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
    const [players, setPlayers] = useState(null)

    useEffect(() => {
        async function getTeams() {
            const teamData = await fetchTeams();
            if (teamData) {
                setTeams(teamData?.data)
                setIsLoadingTeams(false)
            }
        }

        getTeams();
    }, [])

    const rosterLoading = <CenterSpinner />

    const rosterLoaded = (
        <>
            {/* <PlayerSearch data={players} /> */}
            <SimpleGrid columns={3} spacingY="1.5rem" spacingX="1rem">
                {
                    teams?.map((team) => {
                        return (
                            <TeamCard key={team.id} team={team} />
                        )
                    })
                }
            </SimpleGrid>
        </>
    )

    return (
        <Layout>
            <Stack gap="1.5em">
                { isLoadingTeams ? rosterLoading : rosterLoaded }
            </Stack>
        </Layout>
    )
}

export default Roster