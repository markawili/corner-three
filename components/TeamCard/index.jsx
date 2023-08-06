import {
    Card,
    Image,
    CardBody,
    Heading,
    Spinner
}
    from '@chakra-ui/react'

import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { app } from '@/firebase-config/config'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

import { NBA_TEAM_CORRECT_ABBREVIATIONS } from '@/enums/teams'

const TeamCard = ({ team }) => {
    const [imageURL, setImageURL] = useState(null)
    const router = useRouter()

    useEffect(() => {
        async function getTeamLogo() {
            const storage = getStorage()

            const imagePath = `teamlogos/team-${team.id}.png`
            const imageRef = ref(storage, imagePath)

            getDownloadURL(imageRef)
                .then((url) => {
                    setImageURL(url)
                })
                .catch((error) => {
                    console.error("Error getting image URL: ", error)
                })
        }

        getTeamLogo()

    }, [team])

    const handleTeamSelection = (name) => {
        router.push({
            pathname: `/roster/team/`,
            query: { name }
        })
    }

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            size="sm"
            overflow='hidden'
            variant='elevated'
            justifyContent="space-between"
            alignItems="center"
            p="1.5rem"
        >
            {
                !imageURL ? <Spinner /> 
                : (
                    <Image
                        objectFit='contain'
                        maxW={"4rem"}
                        maxH={"auto"}
                        src={imageURL}
                        alt={team.name}
                        loading="lazy"
                    />
                )
            }
            <CardBody>
                <Heading 
                    _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                    size='md'
                    textAlign="start"
                    onClick={() => handleTeamSelection(NBA_TEAM_CORRECT_ABBREVIATIONS[team.abbreviation])}
                >
                    {team.full_name}
                </Heading>
            </CardBody>
        </Card>
    )
}

export default TeamCard