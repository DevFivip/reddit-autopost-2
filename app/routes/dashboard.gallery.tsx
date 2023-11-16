import { Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link, Outlet } from "@remix-run/react";

export default function DashboardPostsLayout() {
    return (
        <>
            <Flex mb={5}>
                <Heading as='h2' size='xl'>
                    <Link to="/dashboard/gallery">
                        Galeria
                    </Link>
                </Heading>
                <Spacer />
            </Flex>
            <Outlet />
        </>
    );
}
