import React, { useState, useEffect } from 'react'

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

const getEvents = async (idCliente) => {
    const res = await fetch('/dashboard/clientes/calendar/get/' + idCliente)
    return await res.json();
}


export const CalendarCreate = ({ idCliente }) => {

    const [events, setEvents] = useState([]);
    useEffect(() => {
        (async () => {
            const e = await getEvents(idCliente)
            setEvents(e);
        })()
    }, []);

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
                events={events}
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
                        <Form method='post' action={`/dashboard/clientes/calendar/${idCliente}`} onSubmit={() => onClose()}>
                            <Button type='submit' colorScheme='blue' mr={3} >
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