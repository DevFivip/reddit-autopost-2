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

import { all, TypeUsuarios } from "~/models/usuario";
import MomentComponent from "~/components/util/moment";

export async function loader() {
  const us = await all();
  console.log(us)
  return (us);
}


export default function DashboardClienteLayout() {

  const usuarios: TypeUsuarios[] = useLoaderData();
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
              {usuarios.map((u, i) => <Tr key={i}>
                <Td>{u.nombre}</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric >
                  <ButtonGroup gap='4'>
                    <Link to={`${u.id}`}>
                      <Button>Editar</Button>
                    </Link>
                    <Button>Eliminar</Button>
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
