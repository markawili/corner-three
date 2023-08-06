import {
    Box,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import { fetchAllPlayers } from "@/pages/api/nbastats"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useRouter } from 'next/router'

const formatResult = (item) => {
    return (
        <>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
        </>
    )
}

const handleOnSearch = (string, results) => {
    console.log(string, results)
}

const handleOnSelect = (item) => {
    console.log(item)
}

const PlayerSearch = () => {
    const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
    const [players, setPlayers] = useState([])

    const router = useRouter()

    useEffect(() => {
        async function getPlayers() {
            const playerData = await fetchAllPlayers();
            if (playerData) {
                let playerNames = []
                playerData.forEach((player) => {
                    playerNames.push({
                        id: player?.id,
                        name: player?.player_name,
                        team: player?.team
                    })
                })
                setPlayers(playerNames)
                setIsLoadingPlayers(false)
            }
        }

        getPlayers();
    }, [])

    const handleOnSelect = (item) => {
        router.push({
            pathname: `/roster/player/`,
            query: {
                id: item?.id,
                name: item?.name
            }
        })
    }

    return (
        <Box >
            <ReactSearchAutocomplete
                items={players}
                styling={{ zIndex: 1 }}
                placeholder={isLoadingPlayers ? 'Loading players...' : 'Search for a player'}
                onSelect={handleOnSelect}
            />
        </Box>
    )
}

export default PlayerSearch