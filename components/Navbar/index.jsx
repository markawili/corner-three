import React from 'react'
import {
    Flex,
    Box,
    Link
} from "@chakra-ui/react"

const NavBar = ({ items }) => {
    return (
        <Flex as="nav" align="center" direction="row" justify="space-between" padding="1rem" backgroundColor="gray.900" color="white">
            <Box fontSize="xl" fontWeight="bold">
                Corner Three
            </Box>
            <Box as="ul" display="flex" alignItems="center" listStyleType="none">
                {items.map((item, index) => (
                    <Link key={index} href={item.url} paddingX="1rem">
                        {item.label}
                    </Link>
                ))}
            </Box>
        </Flex>
    );
};

export default NavBar;