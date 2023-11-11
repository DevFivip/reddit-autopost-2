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
  Button,
  Badge
} from '@chakra-ui/react'

import { useRevalidator } from "@remix-run/react";

// import { all, TypeCliente } from "~/models/cliente";
import { getAll } from "prisma/customer";
import { Customer } from "@prisma/client";
import { BsReddit } from "react-icons/bs";

export async function loader() {
  const customers: Customer[] = await getAll()
  return ({ customers });
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

  const { customers } = useLoaderData<typeof loader>();

  return (<>
    <Flex color='white'>
      <Box flex='1'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Nombre Y Apellido</Th>
                <Th>Email</Th>
                <Th isNumeric>Tags</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((u, i) => <Tr key={i}>
                <Td>{u.firstName}  {u.lastName} </Td>
                <Td>{u.email}</Td>
                <Td isNumeric>
                  {u.tags?.split(',').map((t, k) => <Badge key={k} m={2} colorScheme='purple'>{t}</Badge>)}
                </Td>
                <Td isNumeric >
                  <ButtonGroup gap='4'>
                    <Link to={`subreddit/${u.id}`}>
                      <Button><BsReddit /></Button>
                    </Link>
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
