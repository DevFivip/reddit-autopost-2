import { Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link, Outlet } from "@remix-run/react";
const filePath = "routes/clientes.tsx";



export default function DashboardClienteLayout() {
  return (
    <>
      <Flex>
        <Heading as='h2' size='xl'>
          <Link to="/dashboard/clientes">
            Clientes
          </Link>
        </Heading>
        <Spacer />
        <Link to={'/dashboard/clientes/create'}>
          <Button colorScheme='teal' variant='outline'>
            Nuevo
          </Button>
        </Link>
      </Flex>
      {filePath} <br /> <br />
      <Outlet />
    </>
  );
}
