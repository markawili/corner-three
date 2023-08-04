import React from 'react'

import {
    Center,
    Spinner
} from "@chakra-ui/react"

const CenterSpinner = () => {
    return (
        <Center p={{ base: 5, md: 12 }}>
            <Spinner size="xl" />
        </Center>
    )
}

export default CenterSpinner