import { Outlet } from "@remix-run/react";
import { useLoaderData, Link } from "@remix-run/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Flex, Box, ButtonGroup, Button, Badge, Icon } from '@chakra-ui/react'

import { useRevalidator } from "@remix-run/react";

// import { all, TypeCliente } from "~/models/cliente";
import { getAll } from "prisma/subreddit";
import { Subreddit } from "@prisma/client";

import { BsFillPatchCheckFill } from 'react-icons/bs'

export async function loader() {
  const subreddits: Subreddit[] = await getAll()
  return ({ subreddits });
}


export default function DashboardSubredditIndexLayout() {
  const revalidator = useRevalidator();

  const handleDeleteSubreddit = async (id: string | number) => {
    try {
      const response = await fetch(`/dashboard/subreddits/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otras cabeceras según sea necesario
        },
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar el : ${response.statusText}`);
      }
      revalidator.revalidate();
      // Aquí podrías actualizar tu estado de frontend o realizar otras acciones necesarias.

    } catch (error: any) {
      console.error('Error en la solicitud DELETE:', error.message);
      // Manejar el error según sea necesario
    }
  }

  const { subreddits } = useLoaderData<typeof loader>();

  return (<>
    <Flex color='white'>
      <Box flex='1'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Subreddit</Th>
                <Th isNumeric>Tags</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subreddits.map((u, i) => <Tr key={i}>
                <Td>{u.nombre} {!u.verificacion || <Icon as={BsFillPatchCheckFill} color='teal.500'></Icon> } </Td>
                <Td isNumeric>
                  {u.tags?.split(',').map((t, k) => <Badge key={k} m={2} colorScheme='purple'>{t}</Badge>)}
                </Td>
                <Td isNumeric >
                  <ButtonGroup gap='4'>
                    <Link to={`${u.id}`}>
                      <Button>Editar</Button>
                    </Link>
                    <Button onClick={() => handleDeleteSubreddit(u.id)}>Eliminar</Button>
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
