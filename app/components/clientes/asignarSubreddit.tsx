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
    ListItem,
    Badge,
    Icon,
    Checkbox
} from '@chakra-ui/react'

import {
    MdOutlineEmail
} from 'react-icons/md'

import { BsPerson, BsReddit, BsImage, BsTelegram, BsFillPatchCheckFill } from 'react-icons/bs'

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
            <Box width={'lg'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box m={8}>

                    <VStack spacing={5}>
                        <Heading as={'h2'} size={'1x'}>Asignar Subreddits</Heading>
                    </VStack>

                    <List spacing={3}>
                        {subredditOnCustomerEditar?.map((sr) => <ListItem borderWidth='1px' borderRadius='lg' p={2}> <Checkbox defaultChecked={sr?.status} id='asignado' name={`asignado`} value={sr.id}>{sr.nombre}  {!sr.verificacion || <Icon as={BsFillPatchCheckFill} color='teal.500'></Icon>}  {sr.tags?.split(',').map((t, k) => <Badge key={k} m={2} colorScheme='purple'>{t}</Badge>)} </Checkbox> </ListItem>)}
                    </List>


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