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
  Badge,
  Image
} from '@chakra-ui/react'

import { useRevalidator } from "@remix-run/react";


import { LoaderFunctionArgs } from '@remix-run/node';

// import { all, TypeCliente } from "~/models/cliente";
import { getAll } from "prisma/posts";
import { Post } from "@prisma/client";
import { BsReddit } from "react-icons/bs";
import { getAutorizeUser } from "~/middlewares/getAutorizeUser";
import { AuthUser } from "prisma/types/user";
import { dateFormat } from "~/utils/dateFormat";

export async function loader({ request }: LoaderFunctionArgs) {
  const user: AuthUser | null = await getAutorizeUser(request)
  if (user === null) throw new Error('Usuario no autenticado')
  const query = user.role_id === 1 ? { include: { customer: true, } } : { include: { customer: true, }, where: { user_id: user.id } };
  const posts: Post[] = await getAll(query)
  // console.log(posts)
  return ({ posts });
}


export default function DashboardPostsIndexLayout() {

  const revalidator = useRevalidator();

  const handleDeleteCliente = async (id: string | number) => {
    try {
      const response = await fetch(`/dashboard/posts/${id}`, {
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

  const { posts } = useLoaderData<typeof loader>();

  const renderSwitch = (param: number) => {
    switch (param) {
      case 1:
        return <Badge colorScheme='blue'>{'Pendiente'}</Badge>;
      case 2:
        return <Badge colorScheme='green'>{'Correcto'}</Badge>;
      case 3:
        return <Badge colorScheme='red'>{'Error'}</Badge>;
      default:
        return 'foo';
    }
  }
  return (<>
    <Flex color='white'>
      <Box flex='1'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Post</Th>
                <Th>Titulo</Th>
                <Th>Contenido</Th>
                <Th>Cliente</Th>
                <Th>Fecha de Posteo</Th>
                <Th>Estado</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((p, i) => <Tr key={i}>
                <Td><Image
                  boxSize='50px'
                  src={`${p?.imagen_name}`}
                  alt={`${p?.customer?.firstName} ${p?.customer?.lastName}`}
                /></Td>
                <Td>{p.titulo}</Td>
                <Td>{p.contenido}</Td>
                <Td><Link to={`/dashboard/clientes/${p?.customer?.id}`}>{p?.customer?.firstName} {p?.customer?.lastName}</Link></Td>
                <Td>{dateFormat(p.postedAt)}</Td>
                <Td>
                  {renderSwitch(p.status)}
                </Td>
                <Td isNumeric >
                  <ButtonGroup gap='4'>
                    <Link to={`${p.id}`}>
                      <Button>Editar</Button>
                    </Link>
                    <Button onClick={() => handleDeleteCliente(p.id)}>Eliminar</Button>
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
