import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { fetchPlayerByName } from "@/pages/api/nbastats"
import Layout from '@/components/Layout'
import CenterSpinner from '@/components/CenterSpinner'
import { ChevronLeftIcon } from '@chakra-ui/icons'

import headshotLight from "@/assets/headshot-silhouette-light.svg"
import headshotDark from "@/assets/headshot-silhouette-dark.svg"

import {
    Box,
    IconButton,
    Heading,
    Flex,
    TableContainer,
    TableCaption,
    Text,
    Table,
    Thead,
    Tr,
    Tbody,
    Td,
    Th,
    useColorMode
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import NextImage from 'next/image'

import { NBA_TEAMS, NBA_TEAM_IDS } from '@/enums/teams'

import { searchPlayer, fetchPlayerStats } from '../api/balldontlie'

const Player = () => {
    const router = useRouter()
    const { name, id } = router.query
    const { colorMode } = useColorMode()
    const [player, setPlayer] = useState(null)
    const [player2, setPlayer2] = useState(null)
    const [stats, setStats] = useState(null)
    const [isPlayerLoading, setIsPlayerLoading] = useState(true)
    const [isStatsLoading, setIsStatsLoading] = useState(true)

    useEffect(() => {
        async function getPlayerFromAPI1() {
            if (name && id) {
                const data = await fetchPlayerByName(name)
                const filteredData = data.results.filter((result) => {
                    return result.id == id
                })
                console.log(filteredData[0])
                setPlayer(filteredData[0])
                setIsPlayerLoading(false)
            }
        }

        async function getPlayerFromAPI2() {
            if (name && id) {
                console.log("getting player")
                const data = await searchPlayer(name)
                const player = data.data[0]
                setPlayer2(player)

                console.log("getting stats")
                const statData = await (await fetchPlayerStats(player?.id, 2022, 10, false)).reverse()
                setStats(statData)
                console.log(statData)
                setIsStatsLoading(false)
            }
        }

        getPlayerFromAPI1()
        getPlayerFromAPI2()

    }, [name])

    const handleGoBack = () => {
        router.push({
            pathname: "/roster"
        })
    }

    const MotionBox = motion(Box)

    const playerLoading = <CenterSpinner />

    const getOpponent = (game) => {
        if (game.home_team_id == 10) {
            return NBA_TEAM_IDS[game.visitor_team_id]
        } else {
            return NBA_TEAM_IDS[game.home_team_id]
        }
    }

    const seasonStats = (
        <TableContainer mt={4}>
            <Table variant='unstyled'>
                <Thead>
                    <Tr>
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
                    <Tr key={player?.id}>
                        <Td>{player?.age}</Td>
                        <Td>{player?.games}</Td>
                        <Td>{player?.games_started}</Td>
                        <Td>{(player?.PTS / player?.games).toFixed(2)}</Td>
                        <Td>{(player?.AST / player?.games).toFixed(2)}</Td>
                        <Td>{(player?.TRB / player?.games).toFixed(2)}</Td>
                        <Td>{(player?.STL / player?.games).toFixed(2)}</Td>
                        <Td>{(player?.BLK / player?.games).toFixed(2)}</Td>
                        <Td>{(player?.field_percent * 100).toFixed(2)}</Td>
                        <Td>{(player?.three_percent * 100).toFixed(2)}</Td>
                        <Td>{(player?.ft_percent * 100).toFixed(2)}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )

    const recentStats = stats?.map((game) => {
        return (
            <Tr key={game.id}>
                <Td>{new Date(game.game.date).toLocaleDateString()}</Td>
                <Td>{getOpponent(game.game)}</Td>
                <Td>{game.pts}</Td>
                <Td>{game.reb}</Td>
                <Td>{game.ast}</Td>
                <Td>{game.stl}</Td>
                <Td>{game.blk}</Td>
                <Td>{game.fgm}</Td>
                <Td>{game.fga}</Td>
                <Td>{game.fg3m}</Td>
                <Td>{game.fg3a}</Td>
                <Td>{game.ftm}</Td>
                <Td>{game.fta}</Td>
            </Tr>
        )
    })

    const playerLoaded = (
        <MotionBox
            p={5}
            borderWidth="1px"
            borderRadius="xl"
            boxShadow="xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            position="relative"
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
            <Flex justifyContent="center" alignItems="center" gap="4em">
                <Box boxSize="200px" alignItems="center" p={4}>
                    <NextImage 
                        alt={`${player?.player_name} Headshot`}
                        src={colorMode == "dark" ? headshotDark : headshotLight}
                    />
                </Box>
                <Flex flexDirection="column" alignItems="flex-end">
                    <Heading fontWeight="bold">
                        {player?.player_name}
                    </Heading>
                    <Text>{`Team: ${NBA_TEAMS[player?.team]}`}</Text>
                    <Text>{`Age: ${player?.age}`}</Text>
                    <Text>{(player2?.height_feet && player2?.height_inches) ? `Height: ${player2?.height_feet}'${player2?.height_inches}` : 'Height: No data'}</Text>
                    <Text>{player2?.weight_pounds ? `Weight: ${player2?.weight_pounds} pounds` : 'Weight: No data'}</Text>
                </Flex>
            </Flex>
            <Text mt={4} fontSize="xl" fontWeight="bold">
                Overall Stats for Recent Season
            </Text>
            <Box>
                {
                    player && seasonStats
                }
            </Box>
            <Text mt={4} fontSize="xl" fontWeight="bold">
                Stats for Last 10 Games
            </Text>
            <Box>
                { isStatsLoading ? <Text>Stats Loading...</Text> : (
                    <TableContainer mt={4} >
                        <Table variant='simple'>
                            <TableCaption>Stats from the 2022-2023 season.</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Opponent</Th>
                                    <Th isNumeric>PTS</Th>
                                    <Th isNumeric>REB</Th>
                                    <Th isNumeric>AST</Th>
                                    <Th isNumeric>STL</Th>
                                    <Th isNumeric>BLK</Th>
                                    <Th isNumeric>FGM</Th>
                                    <Th isNumeric>FGA</Th>
                                    <Th isNumeric>3PFGM</Th>
                                    <Th isNumeric>3PFGA</Th>
                                    <Th isNumeric>FTM</Th>
                                    <Th isNumeric>FTA</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    recentStats
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </MotionBox>
    )

    return (
        <Layout>
            {
                (isPlayerLoading && isStatsLoading) ? playerLoading : playerLoaded
            }
        </Layout>
    )
}

export default Player