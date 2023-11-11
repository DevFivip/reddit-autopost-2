import { Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link, Outlet } from "@remix-run/react";



export default function DashboardSubredditsLayout() {
  return (
    <>
      <Flex mb={5}>
        <Heading as='h2' size='xl'>
          <Link to="/dashboard/subreddits">
            Subreddits
          </Link>
        </Heading>
        <Spacer />
        <Link to={'/dashboard/subreddits/create'}>
          <Button colorScheme='teal' variant='outline'>
            Nuevo
          </Button>
        </Link>
      </Flex>
      <Outlet />
    </>
  );
}
