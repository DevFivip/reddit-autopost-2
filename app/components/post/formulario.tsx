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
import { Customer, Post, Subreddit } from "@prisma/client";
import { formFile } from "~/routes/dashboard.posts.create";
import { dateFormat, dbToInputDateFormat } from "~/utils/dateFormat";

interface TypeComponentPostFormulario {
    modoEdicion: boolean;
    postEditar?: Post | null; // Datos del usuario en caso de edición
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

    const [fecha, setFecha] = useState<string | number | null>(postEditar?.postedAt || null);
    const [idCliente, setIdCliente] = useState<string | number | null>(postEditar?.customer_id || null);
    const [archivos, setArchivos] = useState<[]>([]);
    const [daySubreddits, setDaySubreddits] = useState<[]>([]);

    useEffect(() => {
        (async () => {
            // console.log({idCliente})
            const res: any = await getFiles(idCliente)
            setArchivos(res);
        })()
    }, [idCliente]);

    useEffect(() => {
        (async () => {
            console.log(fecha, idCliente);
            const res: any = await getSubredditCalendarAsigned(fecha, idCliente)
            console.log(res)
            setDaySubreddits(res);
        })()
    }, [fecha]);




    const getFiles = async (idCliente: string | number | null) => {
        const response = await fetch(`/dashboard/fileroute/${idCliente}`);
        const body = await response.json()
        return body;
    }

    const getSubredditCalendarAsigned = async (fecha, idCliente) => {
        const response = await fetch(`/dashboard/clientes/calendar/day?customer_id=${idCliente}&fecha=${fecha}`);
        const body = await response.json()
        return body;
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
                                    <Select placeholder="Seleccione Cliente" defaultValue={postEditar?.customer_id || ""} name="customer_id" onChange={(e) => { setIdCliente(e.target.value) }}>
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
                                        defaultValue={dbToInputDateFormat(fecha)}
                                        onChange={(e) => { setFecha(e.target.value) }}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="subreddit_id">
                                <FormLabel>Subreddit</FormLabel>
                                <InputGroup>
                                    <Select placeholder="Seleccione Subreddit" name="subreddit_id" defaultValue={postEditar?.subreddit_id || ''}>
                                        {daySubreddits.map((ds, i) => <option key={i} value={ds.subreddit_id}>{ds.subreddit.nombre} {ds.subreddit.tags}</option>)}
                                        <option value={'null'}>------------------------------------------------------------</option>
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

                        <RadioGroup defaultValue={postEditar?.imagen_name} name="imagen_name">
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
