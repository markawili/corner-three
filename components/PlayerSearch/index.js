import { Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const PlayerSearch = ({data}) => {
    console.log(data)

    return (
        <>
            <Input 
                placeholder='Search for a player'
            />
        </>
    )
}

export default PlayerSearch