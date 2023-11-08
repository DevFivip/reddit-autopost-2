import {
    Flex,
    Box,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Heading,
    Spacer,
    Stack,
    ButtonGroup
} from '@chakra-ui/react'

import {
    MdOutlineEmail
} from 'react-icons/md'

import {BsPerson, BsReddit, BsImage } from 'react-icons/bs'

export default function DashboardClienteCreate() {

    return (<>
        <Stack direction={['column', 'row']} spacing='50px'>
            <Box width={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>
                        <Heading as={'h2'} size={'1x'}>Datos del Cliente</Heading>
                        <FormControl id="name">
                            <FormLabel>Nombre Completo</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="name">
                            <FormLabel>Mail</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <MdOutlineEmail />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                    </VStack>
                </Box>
            </Box>
            <Box width={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>

                        <Heading as={'h2'} size={'1x'}>Reddit Ajustes</Heading>

                        <FormControl id="reddit_username">
                            <FormLabel>Reddit Usuario</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="reddit_password">
                            <FormLabel>Reddit Password</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="reddit_clientId">
                            <FormLabel>Reddit clientId</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="reddit_clientSecret">
                            <FormLabel>Reddit clientSecret</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                    </VStack>
                </Box>
            </Box>
            <Box width={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>

                        <Heading as={'h2'} size={'1x'}>Imgur Ajustes</Heading>

                        <FormControl id="imgur_username">
                            <FormLabel>Imgur Usuario</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="imgur_password">
                            <FormLabel>Imgur Password</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="imgur_clientId">
                            <FormLabel>Imgur clientId</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="imgur_clientSecret">
                            <FormLabel>Imgur clientSecret</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" />
                            </InputGroup>
                        </FormControl>
                    </VStack>
                </Box>
            </Box>
        </Stack>

        <Flex>
            <Spacer />
            <Box p='4' mt={'30px'}>
            <ButtonGroup spacing='6' >
                <Button>Cancel</Button>
                <Button colorScheme='blue'>Save</Button>
            </ButtonGroup>
            </Box>
        </Flex>



    </>);
}
