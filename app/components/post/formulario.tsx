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
} from "@chakra-ui/react";

import { MdOutlineEmail } from "react-icons/md";

import { BsPerson, BsReddit, BsImage, BsTelegram } from "react-icons/bs";

import { AuthUser } from "prisma/types/user";
// import { Customer } from '@prisma/client';
import { UpdatePost } from "prisma/types/post";
import { useState } from "react";
import { Customer, Subreddit } from "@prisma/client";

interface TypeComponentPostFormulario {
    modoEdicion: boolean;
    postEditar?: UpdatePost | null; // Datos del usuario en caso de edición
    usuario: AuthUser | null;
    subreddits: Subreddit[];
    customers: Customer[];
}

export const ComponentPostFormulario: React.FC<TypeComponentPostFormulario> = ({
    modoEdicion,
    postEditar,
    usuario,
    subreddits,
    customers

}) => {

    interface TypeFile {
        file: string | null
        previewUrl: ArrayBuffer | string | null
        fileType: string | null

    }

    const [state, setState] = useState<TypeFile>({
        file: null,
        previewUrl: null,
        fileType: null,
    });

    const handleInputChange = (e: any): void => {
        // console.log(e)
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setState({
                    file: file,
                    previewUrl: reader.result,
                    fileType: file.type,
                });
            };

            reader.readAsDataURL(file);
        } else {
            setState({
                file: null,
                previewUrl: null,
                fileType: null,
            });
        }
    };

    const renderPreview = () => {
        if (state.previewUrl) {
            if (state.fileType && state.fileType.startsWith('image')) {
                return (
                    <img
                        src={state.previewUrl}
                        alt="Preview"
                        style={{ maxWidth: '250px', maxHeight: '200px' }}
                    />
                );
            } else if (state.fileType && state.fileType.startsWith('video')) {
                return (
                    <video
                        controls
                        width="250px"
                        height="auto"
                    >
                        <source src={state.previewUrl} type={state.fileType} />
                        Your browser does not support the video tag.
                    </video>
                );
            }
        }

        return null;
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                    <Select placeholder="Seleccione Cliente" name="customer_id">
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
                                        onChange={handleInputChange}
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
                        <VStack spacing={5}>

                            <Heading as={"h2"} size={"1x"}>
                                Reddit Publicación
                            </Heading>


                            <FormControl id="">
                                <FormLabel>Selecciona Archivo Media</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
                                    />
                                </InputGroup>
                            </FormControl>

                            <Box boxSize='sm'>
                                <VStack>
                                    {renderPreview()}
                                </VStack>
                            </Box>
                        </VStack>
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
