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
    SimpleGrid,
    Card,
    CardBody,
    Divider,
    CardFooter,
    Image,
    useRadio,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";

import { useEffect } from 'react'

import { MdOutlineEmail } from "react-icons/md";

import { BsPerson, BsReddit, BsImage, BsTelegram } from "react-icons/bs";

import { AuthUser } from "prisma/types/user";
// import { Customer } from '@prisma/client';

import { useState } from "react";
import { Customer, Subreddit } from "@prisma/client";
import { formFile } from "~/routes/dashboard.posts.create";
import { ComponentClientGallery } from "../gallery/componentClienteGallery";
import { obtenerArchivosEnCarpeta } from "~/routes/dashboard.clientes.gallery.$idCliente";

interface TypeComponentPostFormulario {
    modoEdicion: boolean;
    postEditar?: UpdatePost | null; // Datos del usuario en caso de edición
    usuario: AuthUser | null;
    subreddits: Subreddit[];
    customers: Customer[];
    changeState: Function;
    formState: formFile;
}


export const ComponentPostFormulario: React.FC<TypeComponentPostFormulario> = ({
    modoEdicion,
    postEditar,
    usuario,
    subreddits,
    customers,
    changeState,
    formState
}) => {


    const [idCliente, setIdCliente] = useState<string | null>('1');
    const [archivos, setArchivos] = useState<[]>([]);

    useEffect(() => {
        (async () => {
            const res: any = await getFiles(idCliente)
            setArchivos(res);
        })()
    }, [idCliente]);

    const getFiles = async (idCliente: string | null) => {
        const response = await fetch(`/dashboard/fileroute/${idCliente}`);
        const body = await response.json()
        return body;
    }

    const handleTitulo = (titulo: string) => {
        changeState({
            ...formState,
            titulo: titulo.toUpperCase()
        })
    }
    const handleContenido = (contenido: string) => {

        console.log(formState);
        const state = { ...formState, contenido }
        changeState(state);


    }


    const handleInputChange = (e: any): void => {
        // console.log(e)
    };

    return (
        <>
            <VisuallyHiddenInput
                type="number"
                id="user_id"
                name="user_id"
                defaultValue={usuario?.id || ""}
                onChange={handleInputChange}
            />
            <VisuallyHiddenInput
                type="number"
                name="id"
                id="nombre"
                defaultValue={postEditar?.id || ""}
                onChange={handleInputChange}
            />
            {/* <VisuallyHiddenInput type="number" name='status' id='status' defaultValue={postEditar?.status ? 1 : 0} onChange={handleInputChange} /> */}

            <Stack direction={["column", "row"]} spacing="50px">
                <Box
                    width={"100%"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Box m={8}>
                        <VStack spacing={5}>
                            <Heading as={"h2"} size={"1x"}>
                                Datos de la Publicación
                            </Heading>
                            <FormControl id="titulo">
                                <FormLabel>Titulo</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="titulo"
                                        id="titulo"
                                        defaultValue={postEditar?.titulo || ""}
                                        onChange={(e) => { handleTitulo(e.target.value) }}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="contenido">
                                <FormLabel>Contenido</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="contenido"
                                        id="contenido"
                                        defaultValue={postEditar?.contenido || ""}
                                        onChange={(e) => { handleContenido(e.target.value) }}
                                    />
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </Box>
                </Box>
                <Box
                    width={"100%"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Box m={8}>
                        <VStack spacing={5}>
                            <Heading as={"h2"} size={"1x"}>
                                Reddit Publicación
                            </Heading>

                            <FormControl id="customer_id">
                                <FormLabel>Cliente</FormLabel>
                                <InputGroup>
                                    <Select placeholder="Seleccione Cliente" name="customer_id" onChange={(e) => { setIdCliente(e.target.value) }}>
                                        {customers.map((c, k) => <option key={k} value={c.id}>{c.firstName} {c.lastName} {c.tags}</option>)}
                                    </Select>
                                </InputGroup>
                            </FormControl>

                            <FormControl id="postedAt">
                                <FormLabel>Fecha y Hora Programada</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <BsReddit />
                                    </InputLeftElement>
                                    <Input
                                        type="datetime-local"
                                        name="postedAt"
                                        defaultValue={postEditar?.postedAt || ""}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="subreddit_id">
                                <FormLabel>Subreddit</FormLabel>
                                <InputGroup>
                                    <Select placeholder="Seleccione Subreddit" name="subreddit_id">
                                        {subreddits.map((s, k) => <option key={k} value={s.id}>{s.nombre} {s.tags}</option>)}
                                    </Select>
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </Box>
                </Box>
            </Stack>
            <Stack mt={5}>
                <Box
                    width={"100%"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Box m={8}>

                        <Heading as={"h2"} size={"1x"}>
                            Galeria
                        </Heading>

                        <RadioGroup defaultValue='1' name="imagen_name">
                            <SimpleGrid minChildWidth='250px' spacing='10px'>
                                {!!archivos && archivos.map((dir, k) => {
                                    return (
                                        <Card key={k}>
                                            <Radio value={dir} cursor='pointer' required
                                                borderWidth='1px'
                                                borderRadius='md'
                                                boxShadow='md'
                                                _checked={{
                                                    bg: 'green.500',
                                                    color: 'white',
                                                    borderColor: 'green.400',
                                                }}
                                                _focus={{
                                                    boxShadow: 'outline',
                                                }}
                                            >
                                                <CardBody>
                                                    <Image
                                                        src={`/public/uploads/${idCliente}/${dir}`}
                                                        alt=''
                                                        maxHeight={'250px'}
                                                    />
                                                </CardBody>
                                            </Radio>
                                        </Card>
                                    )
                                })
                                }
                            </SimpleGrid>
                        </RadioGroup>

                    </Box>
                </Box>
            </Stack>

            <Flex>
                <Spacer />
                <Box p="4" mt={"30px"}>
                    <ButtonGroup spacing="6">
                        <Button colorScheme="blue" type="submit">
                            {modoEdicion ? "Actualizar" : "Guardar"}
                        </Button>
                    </ButtonGroup>
                </Box>
            </Flex>
        </>
    );
};
