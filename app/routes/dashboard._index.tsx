import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

const filePath = "Index Page";

export default function DashboardIndexPage() {
    return (<>
        <Flex>
            <Heading as='h2' size='xl'>
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </Heading>
            <Spacer />
            {/* <Link to={'/dashboard/clientes/create'}>
                <Button colorScheme='teal' variant='outline'>
                    Nuevo
                </Button>
            </Link> */}
        </Flex>
    </>);
}
