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
    ButtonGroup,
    VisuallyHiddenInput,
    Select,
    List,
    ListItem
} from '@chakra-ui/react'

import {
    MdOutlineEmail
} from 'react-icons/md'

import { BsPerson, BsReddit, BsImage, BsTelegram } from 'react-icons/bs'

import { AuthUser } from 'prisma/types/user';
// import { Customer } from '@prisma/client';
import { UpdateCustomer } from "prisma/types/customer";


interface TypeComponentClienteFormulario {
    modoEdicion: boolean;
    clienteEditar?: UpdateCustomer | null; // Datos del usuario en caso de edición
    usuario: AuthUser | null;
}

export const ComponentClienteFormulario: React.FC<TypeComponentClienteFormulario> = ({ modoEdicion, clienteEditar, usuario }) => {
    const handleInputChange = (e: any): void => {
        // console.log(e)
    };
    return (<>

        <VisuallyHiddenInput type="number" id='user_id' name='user_id' defaultValue={usuario?.id || ''} onChange={handleInputChange} />
        <VisuallyHiddenInput type="number" name='id' id='nombre' defaultValue={clienteEditar?.id || ''} onChange={handleInputChange} />
        {/* <VisuallyHiddenInput type="number" name='status' id='status' defaultValue={clienteEditar?.status ? 1 : 0} onChange={handleInputChange} /> */}

        <Stack direction={['column', 'row']} spacing='50px'>
            <Box width={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>
                        <Heading as={'h2'} size={'1x'}>Datos del Cliente</Heading>
                        <FormControl id="firstName">
                            <FormLabel>Nombre</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" name='firstName' id='firstName' defaultValue={clienteEditar?.firstName || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="lastName">
                            <FormLabel>Apellido</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" name='lastName' id='lastName' defaultValue={clienteEditar?.lastName || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="email">
                            <FormLabel>Mail</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <MdOutlineEmail />
                                </InputLeftElement>
                                <Input type="text" name='email' id='email' defaultValue={clienteEditar?.email || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="tags">
                            <FormLabel>Tags (separar por comas)</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" name='tags' id='tags' defaultValue={clienteEditar?.tags || ''} onChange={handleInputChange} />
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
                                <Input type="text" name='reddit_username' defaultValue={clienteEditar?.reddit_username || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="reddit_password">
                            <FormLabel>Reddit Password</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" name='reddit_password' defaultValue={clienteEditar?.reddit_password || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="reddit_clientId">
                            <FormLabel>Reddit clientId</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" name='reddit_clientId' defaultValue={clienteEditar?.reddit_clientId || ''} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="reddit_clientSecret">
                            <FormLabel>Reddit clientSecret</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" name="reddit_clientSecret" defaultValue={clienteEditar?.reddit_clientSecret || ''} />
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
                                <Input type="text" name='imgur_username' id='imgur_username' defaultValue={clienteEditar?.imgur_username || ''} />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="imgur_password">
                            <FormLabel>Imgur Password</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" name='imgur_password' defaultValue={clienteEditar?.imgur_password || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="imgur_clientId">
                            <FormLabel>Imgur clientId</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" name='imgur_clientId' defaultValue={clienteEditar?.imgur_clientId || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="imgur_clientSecret">
                            <FormLabel>Imgur clientSecret</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsImage />
                                </InputLeftElement>
                                <Input type="text" name='imgur_clientSecret' defaultValue={clienteEditar?.imgur_clientSecret || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                    </VStack>
                </Box>
            </Box>
            <Box width={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>
                        <Heading as={'h2'} size={'1x'}>Telegram Ajustes</Heading>
                        <FormControl id="telegram_channel">
                            <FormLabel>Enlace o Codigo del Canal ó Grupo</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsTelegram />
                                </InputLeftElement>
                                <Input type="text" name='telegram_channel' id='telegram_channel' defaultValue={clienteEditar?.telegram_channel || ''} />
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
                    <Button colorScheme='blue' type='submit'>{modoEdicion ? 'Actualizar' : 'Guardar'}</Button>
                </ButtonGroup>
            </Box>
        </Flex>
    </>)
}