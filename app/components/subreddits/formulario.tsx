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
    VisuallyHiddenInput
} from '@chakra-ui/react'

'react-icons/md'

import { BsReddit } from 'react-icons/bs'

import { AuthUser } from 'prisma/types/user';
import { Subreddit } from '@prisma/client';



interface TypeComponentSubredditFormulario {
    modoEdicion: boolean;
    subredditEditar?: Subreddit | null; // Datos del usuario en caso de edición
    usuario: AuthUser | null;
}

export const ComponentSubredditFormulario: React.FC<TypeComponentSubredditFormulario> = ({ modoEdicion, subredditEditar, usuario }) => {
    const handleInputChange = (e: any): void => {
        // console.log(e)
    };
    return (<>

        <VisuallyHiddenInput type="number" id='user_id' name='user_id' defaultValue={usuario?.id || ''} onChange={handleInputChange} />
        <VisuallyHiddenInput type="number" name='id' id='nombre' defaultValue={subredditEditar?.id || ''} onChange={handleInputChange} />
        <VisuallyHiddenInput type="number" name='status' id='status' defaultValue={subredditEditar?.status ? 1 : 0} onChange={handleInputChange} />

        <Stack direction={['column', 'row']} spacing='50px'>
            <Box width={'md'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>
                    <VStack spacing={5}>
                        <Heading as={'h2'} size={'1x'}>Datos del Cliente</Heading>
                        <FormControl id="nombre">
                            <FormLabel>Nombre del Subreddit</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" name='nombre' id='nombre' defaultValue={subredditEditar?.nombre || ''} onChange={handleInputChange} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="tags">
                            <FormLabel>Apellido</FormLabel>
                            <InputGroup >
                                <InputLeftElement pointerEvents="none">
                                    <BsReddit />
                                </InputLeftElement>
                                <Input type="text" name='tags' id='tags' defaultValue={subredditEditar?.tags || ''} onChange={handleInputChange} />
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