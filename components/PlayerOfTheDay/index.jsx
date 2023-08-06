import {
    Flex,
    Center,
    Heading,
    Box,
    useColorMode,
    forwardRef,
    Spinner
} from "@chakra-ui/react"

import { motion, isValidMotionProp } from 'framer-motion';

// @ts-ignore
import silhouettelight from "@/assets/silhouettelight.svg"
// @ts-ignore
import silhouettedark from "@/assets/silhouettedark.svg"

import Image from "next/image";
import { useEffect, useState } from "react";
import CenterSpinner from "../CenterSpinner";

export const MotionBox = motion(
    forwardRef((props, ref) => {
        const chakraProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !isValidMotionProp(key))
        );
        return <Box ref={ref} {...chakraProps} />;
    })
);

export const MotionFlex = motion(
    forwardRef((props, ref) => {
        const chakraProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !isValidMotionProp(key))
        );
        return <Flex ref={ref} {...chakraProps} />;
    })
);

const Header = ({ children, underlineColor, ...props }) => (
    <Heading
        mt={10}
        mb={6}
        size="xl"
        lineHeight="shorter"
        fontWeight="bold"
        {...props}
        textAlign="left"
    >
        <UnderlinedText color={underlineColor}>{children}</UnderlinedText>
    </Heading>
);


const UnderlinedText = (props) => (
    <Box as="span" display="inline-block" position="relative">
        {props.children}
        <Box
            as="span"
            display="block"
            position="absolute"
            bg={props.color || 'gray.200'}
            w="100%"
            h={props.h || '1px'}
            bottom={-2}
        />
    </Box>
);

const ANIMATION_DURATION = 0.5;

const PlayerOfTheDay = ({ player }) => {
    const [isLoading, setIsLoading] = useState(true)

    const color = 'blue.400';
    const { colorMode } = useColorMode()
        
    useEffect(() => {
        if (player) {
            setIsLoading(false)
        }
    }, [player])

    const stats = `${(player?.PTS / player?.games).toFixed(2)} PPG | ${(player?.AST / player?.games).toFixed(2)} APG | ${(player?.TRB / player?.games).toFixed(2)} RBG`

    const loadingPlayer = isLoading && (
        <CenterSpinner />
    )

    const loadedPlayer = !isLoading && (
        <Flex
            direction={['column', 'column', 'row']}
            gap={"2rem"} 
        >
            <MotionBox
                opacity="0"
                initial={{
                    translateX: -150,
                    opacity: 0
                }}
                animate={{
                    translateX: 0,
                    opacity: 1,
                    transition: {
                        duration: ANIMATION_DURATION
                    }
                }}
                m="auto"
                mb={[16, 16, 'auto']}
            >
                <MotionBox whileHover={{ scale: 1.8 }} rounded="full" >
                    <Flex alignItems={'center'} boxSize={["15rem", "15rem", "20rem"]}>
                        <Image alt="A basketball player's silhouette" src={colorMode == "dark" ? silhouettedark : silhouettelight} />
                    </Flex>
                </MotionBox>
            </MotionBox>
            <MotionFlex
                position="relative"
                ml={['auto', 'auto', 16]}
                m={'auto'}
                w={['90%', '85%', '80%']}
                maxW="800px"
                opacity="0"
                justify="center"
                direction="column"
                initial={{
                    opacity: 0,
                    translateX: 150
                }}
                animate={{
                    opacity: 1,
                    translateX: 0,
                    transition: {
                        duration: ANIMATION_DURATION
                    }
                }}
            >
                <Box position="relative" mb="1rem">
                    <MotionBox whileHover={{ translateY: -5 }} width="max-content">
                        <Header underlineColor={color} mt={0} cursor="pointer" width="max-content">
                            Player of the day
                        </Header>
                    </MotionBox>
                </Box>
                <Flex direction="column" gap="1rem">
                    <Heading size="md">Name: {`${player?.player_name}`}</Heading>
                    <Heading size="md">Team: {`${player?.team}`}</Heading>
                    <Heading size="md">2023 Stats: { isLoading ? <Spinner size={'sm'}/> : stats }</Heading>
                </Flex>
            </MotionFlex>
        </Flex>
    )

    return (
        isLoading || !player ? loadingPlayer : loadedPlayer
    );
};

export default PlayerOfTheDay;