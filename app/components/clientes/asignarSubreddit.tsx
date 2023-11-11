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
import { typeSubredditOnCustomer } from "prisma/types/subreddit";


interface TypeComponentAsignarSubredditFormulario {
    modoEdicion: boolean;
    subredditOnCustomerEditar?: typeSubredditOnCustomer[] | null; // Datos del usuario en caso de edición
    usuario: AuthUser | null;
}

export const ComponentAsignarSubredditFormulario: React.FC<TypeComponentAsignarSubredditFormulario> = ({ modoEdicion, subredditOnCustomerEditar, usuario }) => {
    const handleInputChange = (e: any): void => {
        // console.log(e)
    };
    return (<>

        {/* <VisuallyHiddenInput type="number" id='user_id' name='user_id' defaultValue={usuario?.id || ''} onChange={handleInputChange} />
        <VisuallyHiddenInput type="number" name='id' id='nombre' defaultValue={false || ''} onChange={handleInputChange} /> */}
        {/* <VisuallyHiddenInput type="number" name='status' id='status' defaultValue={false ? 1 : 0} onChange={handleInputChange} /> */}

        <Stack direction={['column', 'row']} spacing='50px'>
            <Box width={'md'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>
                        <Heading as={'h2'} size={'1x'}>Datos del Cliente</Heading>
                        <FormControl id="firstName">
                            <FormLabel>Nombre</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" name='firstName' id='firstName' defaultValue={false || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="lastName">
                            <FormLabel>Apellido</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" name='lastName' id='lastName' defaultValue={false || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="email">
                            <FormLabel>Mail</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <MdOutlineEmail />
                                </InputLeftElement>
                                <Input type="text" name='email' id='email' defaultValue={false || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="tags">
                            <FormLabel>Tags (separar por comas)</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsPerson />
                                </InputLeftElement>
                                <Input type="text" name='tags' id='tags' defaultValue={false || ''} onChange={handleInputChange} />
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