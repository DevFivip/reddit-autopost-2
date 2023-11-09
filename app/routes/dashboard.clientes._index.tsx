import { Outlet } from "@remix-run/react";
import { useLoaderData, Link } from "@remix-run/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  ButtonGroup,
  Button
} from '@chakra-ui/react'

import { useRevalidator } from "@remix-run/react";

import { all, TypeCliente } from "~/models/cliente";

export async function loader() {
  const us = await all();
  return (us);
}


export default function DashboardClienteLayout() {
  const revalidator = useRevalidator();

  const handleDeleteCliente = async (id: string | number) => {
    try {
      const response = await fetch(`/dashboard/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otras cabeceras según sea necesario
        },
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar el cliente: ${response.statusText}`);
      }
      revalidator.revalidate();
      // Aquí podrías actualizar tu estado de frontend o realizar otras acciones necesarias.

    } catch (error: any) {
      console.error('Error en la solicitud DELETE:', error.message);
      // Manejar el error según sea necesario
    }
  }



  const clientes: TypeCliente[] = useLoaderData();
  return (<>
    <Flex color='white'>
      <Box flex='1'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clientes.map((u, i) => <Tr key={i}>
                <Td>{u.nombre}</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric >
                  <ButtonGroup gap='4'>
                    <Link to={`${u.id}`}>
                      <Button>Editar</Button>
                    </Link>
                    <Button onClick={() => handleDeleteCliente(u.id)}>Eliminar</Button>
                  </ButtonGroup>
                </Td>
              </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>

    <Outlet />

  </>);
}
