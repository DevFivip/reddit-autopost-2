import { Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link, Outlet } from "@remix-run/react";



export default function DashboardPostsLayout() {
  return (
    <>
      <Flex mb={5}>
        <Heading as='h2' size='xl'>
          <Link to="/dashboard/posts">
            Posts
          </Link>
        </Heading>
        <Spacer />
        <Link to={'/dashboard/posts/create'}>
          <Button colorScheme='teal' variant='outline'>
            Nuevo
          </Button>
        </Link>
      </Flex>
      <Outlet />
    </>
  );
}
