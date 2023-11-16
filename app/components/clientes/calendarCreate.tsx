import React from 'react'

import { Box, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalContent, ModalHeader, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react'
import { Form } from '@remix-run/react'
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { AuthUser } from 'prisma/types/user';
import { json } from "@remix-run/node"


export const CalendarCreate = ({ idCliente }) => {

    return (
        <>
            <h1>hokla</h1>
        </>
    )
}