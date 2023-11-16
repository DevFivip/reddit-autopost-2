'use client'

import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'

const Form1 = () => {
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)

    const handleInputChange = (e: any): void => {
        // console.log(e)
    }

    const customers = []
    const subreddits = []

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Programar Post
            </Heading>

            <FormControl>
                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                    Hora y Fecha de Publicación
                </FormLabel>
                <Input
                    type="datetime-local"
                    name="postedAt"
                    defaultValue={""}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl mt="2%">
                <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                    Cliente
                </FormLabel>
                <Select placeholder="Seleccione Cliente" name="customer_id">
                    {customers.map((c, k) => <option key={k} value={c.id}>{c.firstName} {c.lastName} {c.tags}</option>)}
                </Select>
            </FormControl>

            <FormControl mt="2%">
                <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                    Subreddit
                </FormLabel>
                <Select placeholder="Seleccione Subreddit" name="subreddit_id">
                    {subreddits.map((s, k) => <option key={k} value={s.id}>{s.nombre} {s.tags}</option>)}
                </Select>
            </FormControl>

        </>
    )

}

const Form2 = () => {

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

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Ajuste de Post
            </Heading>

            <FormControl as={GridItem} colSpan={6}>
                <FormLabel
                    htmlFor="street_address"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Titulo
                </FormLabel>
                <Input
                    type="text"
                    name="titulo"
                    id="titulo"
                    autoComplete="street-address"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel
                    htmlFor="city"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Descripción
                </FormLabel>
                <Input
                    type="text"
                    name="contenido"
                    id="contenido"
                    autoComplete="contenido"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel
                    htmlFor="state"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Imagen | Video
                </FormLabel>
                <Input
                    p={1}
                    id="state"
                    autoComplete="state"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    w="full"
                    rounded="md"
                    name="media_file"
                    required
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />
            </FormControl>
        </>
    )
}



export const ComponentPostFormulario2 = () => {
    const toast = useToast()
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)

    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form">
                {/* <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress> */}
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : null}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1)
                                    setProgress(progress - 33.33)
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Anterior
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 2}
                                onClick={() => {
                                    setStep(step + 1)
                                    if (step === 3) {
                                        setProgress(100)
                                    } else {
                                        setProgress(progress + 33.33)
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Siguiente
                            </Button>
                        </Flex>
                        {step === 2 ? (
                            <Flex gap={3}>
                                <Button
                                    w="7rem"
                                    color="red"
                                    variant="solid"
                                    onClick={() => {
                                        toast({
                                            title: 'Account created.',
                                            description: "We've created your account for you.",
                                            status: 'success',
                                            duration: 3000,
                                            isClosable: true,
                                        })
                                    }}>
                                    Cancelar
                                </Button>
                                <Button
                                    w="7rem"
                                    colorScheme="red"
                                    variant="solid"
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Flex>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    )
}