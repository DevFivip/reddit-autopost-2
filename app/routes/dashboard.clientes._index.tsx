import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
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

export async function loader() {
  return (await all());
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
              {usuarios.map((u,i) => <Tr key={i}>
                <Td>{u.nombre}</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric >
                  <ButtonGroup gap='4'>
                    <Button>Editar</Button>
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
