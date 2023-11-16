import React from 'react'

import { Box, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalContent, ModalHeader, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react'
import { Form } from '@remix-run/react'



export const FormularioModalGallery = ({idCliente}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)

    return (
        <>
            <Button onClick={onOpen}
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                variant="solid">
                Upload
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cargar Imagenes</ModalHeader>
                    <ModalCloseButton />
                    <Form method="post" encType='multipart/form-data' action={`/dashboard/clientes/gallery/${idCliente}`} onSubmit={() => { onClose() }}>
                        <ModalBody pb={6}>
                            <Input
                                multiple
                                name="media_file"
                                required
                                type="file"
                                accept="image/*,video/*"
                                border={'-moz-initial'}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button type='submit' colorScheme='blue' mr={3}>
                                Guardar
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </ModalContent>
            </Modal>
        </>
    )
}