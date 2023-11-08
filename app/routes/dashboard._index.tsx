import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function DashboardIndexPage() {
    return (<>
        <Flex>
            <Heading as='h2' size='xl'>
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </Heading>
            <Spacer />
        </Flex>
    </>);
}
