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

import { BsPerson, BsReddit, BsImage } from 'react-icons/bs'

export default function ComponentClienteFormulario() {
    return(<>
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
                                    <Input type="text" name='nombre' id='nombre' />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="email">
                                <FormLabel>Mail</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <MdOutlineEmail />
                                    </InputLeftElement>
                                    <Input type="text" name='email' />
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
                                    <Input type="text" name='reddit_username' />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="reddit_password">
                                <FormLabel>Reddit Password</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <BsReddit />
                                    </InputLeftElement>
                                    <Input type="text" name='reddit_password' />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="reddit_clientId">
                                <FormLabel>Reddit clientId</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <BsReddit />
                                    </InputLeftElement>
                                    <Input type="text" name='reddit_clientId' />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="reddit_clientSecret">
                                <FormLabel>Reddit clientSecret</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <BsReddit />
                                    </InputLeftElement>
                                    <Input type="text" name="reddit_clientSecret" />
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
                                    <Input type="text" id='imgur_username' />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="imgur_password">
                                <FormLabel>Imgur Password</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <BsImage />
                                    </InputLeftElement>
                                    <Input type="text" name='imgur_password' />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="imgur_clientId">
                                <FormLabel>Imgur clientId</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <BsImage />
                                    </InputLeftElement>
                                    <Input type="text" name='imgur_clientId' />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="imgur_clientSecret">
                                <FormLabel>Imgur clientSecret</FormLabel>
                                <InputGroup >
                                    <InputLeftElement pointerEvents="none">
                                        <BsImage />
                                    </InputLeftElement>
                                    <Input type="text" name='imgur_clientSecret' />
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
                        <Button colorScheme='blue' type='submit'>Guardar</Button>
                    </ButtonGroup>
                </Box>
            </Flex></>)
}