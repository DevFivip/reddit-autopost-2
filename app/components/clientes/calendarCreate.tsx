import React from 'react'

import { Box, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalContent, ModalHeader, FormControl, FormLabel, Input, ModalFooter, Stack } from '@chakra-ui/react'
import { Form } from '@remix-run/react'
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { AuthUser } from 'prisma/types/user';
import { json } from "@remix-run/node"
import { BsCalendar } from 'react-icons/bs';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import '../../utils/styles.css';




export const CalendarCreate = ({ idCliente }) => {

    return (
        <>
            <Stack spacing={4} direction='row' align='center' mb={5}>
                <ModalCreateCronograma idCliente={idCliente} />

            </Stack>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                height={700}
                eventBorderColor='cian'

                events={[
                    {
                        "color": 'cian',
                        "title": "Event 1 Adolfo - Juana Jimenez r/cupc",
                        "start": "2023-11-16T10:00:00",
                        "end": "2023-11-16T10:30:00"
                    },
                    {
                        "color": 'black',
                        "title": "Event 2",
                        "start": "2023-11-16T10:30:00",
                        "end": "2023-11-16T11:00:00"
                    },
                    {
                        "title": "Event 3",
                        "start": "2023-11-16T11:00:00",
                        "end": "2023-11-16T11:30:00"
                    },
                    {
                        "title": "Event 4",
                        "start": "2023-11-16T12:00:00",
                        "end": "2023-11-16T12:30:00"
                    }, {
                        "title": "Event 5",
                        "start": "2023-11-16T13:00:00",
                        "end": "2023-11-16T13:30:00"
                    },
                    {
                        color: "black",
                        "title": "Event 10",
                        "start": "2023-11-08",
                        "end": "2023-11-10"
                    }
                ]}
            />

        </>
    )
}


function ModalCreateCronograma({ idCliente }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}> <BsCalendar />&nbsp; Crear Actualizar Cronogramas</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Atención</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {"Se crearan los eventos correspondientes de todo este mes, los eventos pendientes para este Cliente se eliminaran, los posts programados no seran afectados pero la barra de progreso de actividades no se veran reflejados, seguro deseas continuar?"}
                    </ModalBody>

                    <ModalFooter>
                        <Form method='post' action={`/dashboard/clientes/calendar/${idCliente}`}>
                            <Button type='submit' colorScheme='blue' mr={3}>
                                Crear Actualizar Cronogramas
                            </Button>
                        </Form>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}