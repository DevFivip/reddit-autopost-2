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
    Checkbox,

    Image,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    Divider,

    Text,

} from '@chakra-ui/react'

import fs from "fs";

import {
    MdOutlineEmail
} from 'react-icons/md'

import { BsPerson, BsReddit, BsImage, BsTelegram, BsFillPatchCheckFill, BsPencil, BsTrash } from 'react-icons/bs'

import { FormularioModalGallery } from './fomularioModal';
import { AuthUser } from 'prisma/types/user';
// import { Customer } from '@prisma/client';
import { typeSubredditOnCustomer } from "prisma/types/subreddit";
import { Form } from '@remix-run/react';


interface TypeComponentClientGallery {

    subredditOnCustomerEditar?: typeSubredditOnCustomer[] | null; // Datos del usuario en caso de edición
    archivos: string[];
    idCliente: string | null;
}

export const ComponentClientGallery: React.FC<TypeComponentClientGallery> = ({ subredditOnCustomerEditar, archivos, idCliente }) => {
    const handleInputChange = (e: any): void => {
        // console.log(e)
    };


    const handleDeleteMedia = async (dir: string) => {
        try {
            // Elimina el archivo
            console.log(`El archivo ${dir} fue eliminado correctamente.`);
        } catch (error) {
            console.error(`Error al eliminar el archivo ${dir}: ${error.message}`);
        }
    }


    return (<>

        <VStack spacing={5}>
            <Heading as={'h2'} size={'2x'}>Galleria</Heading>
        </VStack>

        <Box textAlign="center" py={10} px={6} border={'1px'} borderRadius={'lg'}>
            <Text color={'gray.500'} mb={6}>
                Agregar mas imagenes y videos
            </Text>

            <FormularioModalGallery idCliente={idCliente} />

        </Box>

        <Box mt={5}>

            <SimpleGrid minChildWidth='100px' spacing='10px'>

                {!!archivos && archivos.map((dir, k) => {
                    return (
                        <Card maxW='sm' key={k}>
                            <CardBody>
                                <Image
                                    src={dir}
                                    alt=''
                                    borderRadius='lg'
                                />
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    {/* <Button variant='outline' colorScheme='blue' size={'xs'}>
                                        <BsPencil />
                                    </Button> */}
                                    <Form method="DELETE" action={`/dashboard/clientes/gallery/${idCliente}`}>
                                        <VisuallyHiddenInput name='dir' value={dir} />
                                        <Button variant='outline' colorScheme='blue' size={'xs'} type='submit' >
                                            <BsTrash />
                                        </Button>
                                    </Form>

                                </ButtonGroup>
                            </CardFooter>
                        </Card>)
                })
                }


            </SimpleGrid>

        </Box>
    </>)
}