import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { fetchPlayerByName } from "@/pages/api/nbastats"
import Layout from '@/components/Layout'
import CenterSpinner from '@/components/CenterSpinner'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { 
    Box,
    Heading,
    Stack,
    Flex,
    IconButton, 
} from '@chakra-ui/react'
import Court from '@/components/Court'
import parquet from "@/assets/parquet2.jpg"

const Player = () => {
    const router = useRouter()
    const { name, id } = router.query
    const [player, setPlayer] = useState(null)
    const [isPlayerLoading, setIsPlayerLoading] = useState(true)

    useEffect(() => {
        async function getPlayer() {
            if (name && id) {
                const data = await fetchPlayerByName(name)
                const filteredData = data.results.filter((result) => {
                    return result.id == id
                })
                setPlayer(filteredData[0])
                setIsPlayerLoading(false)
            }
        }

        getPlayer()
    }, [name])

    const handleGoBack = () => {
        router.push({
            pathname: "/roster"
        })
    }

    const playerLoading = <CenterSpinner />

    const playerLoaded = (
        <Stack gap={"1.5em"}>
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
            <Flex>
                <Box bg={"white"} p={10}>
                    <Court />
                </Box>
            </Flex>
        </Stack>
    )

    return (
        <Layout>
            {
                isPlayerLoading ? playerLoading : playerLoaded
            }
        </Layout>
    )
}

export default Player