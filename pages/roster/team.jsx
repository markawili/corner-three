import Layout from '@/components/Layout'
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Stack, Flex, IconButton, Heading } from '@chakra-ui/react'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchTeamPlayers } from '../api/nbastats'
import CenterSpinner from '@/components/CenterSpinner'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const Team = () => {
    const router = useRouter()
    const { name } = router.query
    const [ teamPlayers, setTeamPlayers ] = useState(null)
    const [ isPlayersLoading, setIsPlayersLoading ] = useState(true)

    useEffect(() => {
        async function getTeamPlayers() {
            if (name) {
                const data = await fetchTeamPlayers(name)
                const filteredData = sortData(data)
                setTeamPlayers(filteredData)
                setIsPlayersLoading(false)
            }
        }

        getTeamPlayers()
    }, [name])

    const MotionStack = motion(Stack)

    const sortData = (data) => {
        return data.sort((a, b) => {
            return (b.PTS/b.games).toFixed(2) - (a.PTS/a.games).toFixed(2)
        })
    }

    const handleGoBack = () => {
        router.back();
    }

    const handleSelectPlayer = (item) => {
        router.push({
            pathname: `/roster/player/`,
            query: {
                id: item?.id,
                name: item?.player_name
            }
        })
    }

    const teamData = teamPlayers?.map((player) => {
        return (
            <Tr key={player.id}>
                <Td 
                    onClick={() => handleSelectPlayer(player)}
                    _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                >
                    {player.player_name}
                </Td>
                <Td>{player.age}</Td>
                <Td>{player.games}</Td>
                <Td>{player.games_started}</Td>
                <Td>{(player.PTS / player.games).toFixed(2)}</Td>
                <Td>{(player.AST / player.games).toFixed(2)}</Td>
                <Td>{(player.TRB / player.games).toFixed(2)}</Td>
                <Td>{(player.STL / player.games).toFixed(2)}</Td>
                <Td>{(player.BLK / player.games).toFixed(2)}</Td>
                <Td>{(player.field_percent * 100).toFixed(2)}</Td>
                <Td>{(player.three_percent * 100).toFixed(2)}</Td>
                <Td>{(player.ft_percent * 100).toFixed(2)}</Td>
            </Tr>
        )
    })

    const playersLoading = (
        <Layout>
            <CenterSpinner />
        </Layout>
    )

    const playersLoaded = (
        <Layout>
            <MotionStack 
                gap={"1.5em"}
                p={5}
                borderWidth="1px"
                borderRadius="xl"
                boxShadow="xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Flex alignItems="center" gap="1em">
                    <IconButton 
                        aria-label="Go back" 
                        icon={<ChevronLeftIcon />}
                        variant="outline"
                        onClick={() => handleGoBack()}
                    />
                    <Heading size="md">
                        Go back
                    </Heading>
                </Flex>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>Stats from the 2022-2023 season.</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Player</Th>
                                <Th isNumeric>Age</Th>
                                <Th isNumeric>GP</Th>
                                <Th isNumeric>GS</Th>
                                <Th isNumeric>PPG</Th>
                                <Th isNumeric>APG</Th>
                                <Th isNumeric>RBG</Th>
                                <Th isNumeric>SPG</Th>
                                <Th isNumeric>BPG</Th>
                                <Th isNumeric>FG%</Th>
                                <Th isNumeric>3P%</Th>
                                <Th isNumeric>FT%</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            { teamData }
                        </Tbody>
                    </Table>
                </TableContainer>
            </MotionStack>
        </Layout>
    )

    return (
        isPlayersLoading ? playersLoading : playersLoaded
    )
}

export default Team