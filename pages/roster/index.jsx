import { useState, useEffect } from "react"
import Layout from "@/components/Layout"
import { 
    SimpleGrid, Stack,
} from "@chakra-ui/react"

import { fetchTeams } from "@/pages/api/balldontlie"

import CenterSpinner from "@/components/CenterSpinner"
import TeamCard from "@/components/TeamCard"
import PlayerSearch from "@/components/PlayerSearch"
import { motion } from "framer-motion"

const Roster = () => {
    const [isLoadingTeams, setIsLoadingTeams] = useState(true)
    const [teams, setTeams] = useState(null)

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

    const MotionSimpleGrid = motion(SimpleGrid)

    const rosterLoading = <CenterSpinner />

    const rosterLoaded = (
        <>
            <PlayerSearch />
            <MotionSimpleGrid 
                columns={3}
                spacingY="1.5rem"
                spacingX="1rem"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {
                    teams?.map((team) => {
                        return (
                            <TeamCard key={team.id} team={team} />
                        )
                    })
                }
            </MotionSimpleGrid>
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