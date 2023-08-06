import React from 'react'
import NavBar from '../Navbar'

import {
    Box,
    Flex
} from "@chakra-ui/react"
import Head from 'next/head';

const items = [
    { label: 'Home', url: '/' },
    { label: 'Roster', url: '/roster' },
    { label: 'Guess the Player', url: '/guess' },
]

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Corner Three</title>
            </Head>
            <Box
                display="flex"
                flexDirection="column"
                minH="100vh"
                position="relative"
            >
                <NavBar items={items} />
                <Flex
                    as="main"
                    flex="1"
                    p={4}
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                >
                    {children}
                </Flex>
            </Box>
        </>
    );
};

export default Layout