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
import { UpdateCustomer } from "prisma/types/customer";
import { useState } from "react";

interface TypeComponentPostFormulario {
    modoEdicion: boolean;
    clienteEditar?: UpdateCustomer | null; // Datos del usuario en caso de edición
    usuario: AuthUser | null;
}

export const ComponentPostFormulario: React.FC<TypeComponentPostFormulario> = ({
    modoEdicion,
    clienteEditar,
    usuario,
}) => {

    interface TypeFile {
        file: string | null
        previewUrl: ArrayBuffer| string | null
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
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                );
            } else if (state.fileType && state.fileType.startsWith('video')) {
                return (
                    <video
                        controls
                        width="100%"
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
                defaultValue={clienteEditar?.id || ""}
                onChange={handleInputChange}
            />
            {/* <VisuallyHiddenInput type="number" name='status' id='status' defaultValue={clienteEditar?.status ? 1 : 0} onChange={handleInputChange} /> */}

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
                                        defaultValue={clienteEditar?.titulo || ""}
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
                                        defaultValue={clienteEditar?.contenido || ""}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl id="customer_id">
                                <FormLabel>Cliente</FormLabel>
                                <InputGroup>
                                    <Select placeholder="Seleccione Cliente" name="customer_id">
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Select>
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
                            <FormControl id="">
                                <FormLabel>Subreddit</FormLabel>
                                <InputGroup>
                                    <Select
                                        placeholder="Seleccione Subreddit"
                                        name="subreddit_id"
                                    >
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
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
                                        defaultValue={clienteEditar?.postedAt || ""}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </Box>
                </Box>

            </Stack>
            <Stack>
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
                                <FormLabel>Subreddit</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
                                    />
                                </InputGroup>
                            </FormControl>

                            <div>{renderPreview()}</div>

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
