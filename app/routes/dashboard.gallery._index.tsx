import { Outlet } from "@remix-run/react";
import { useLoaderData, Link } from "@remix-run/react";
import {

    Flex,
    Box,
    ButtonGroup,
    Button,
    Badge, Stack,
    Image,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Text,
    VStack
} from '@chakra-ui/react'

import { useRevalidator } from "@remix-run/react";

// import { all, TypeCliente } from "~/models/cliente";
import { getAll } from "prisma/customer";
import { Customer } from "@prisma/client";
import { BsReddit } from "react-icons/bs";

export async function loader() {
    // const query = null; //TODO agregar usuario de ROLES Y TODO ESO

    // const customers: Customer[] = await getAll(query);
    // return ({ customers });

    return {}
}


export default function DashboardGalleryLayout() {

    const { customers } = useLoaderData<typeof loader>();

    return (<>
        <Flex color='white'>
            <Box flex='1'>
                <Box textAlign="center" py={10} px={6}>
                    <Text color={'gray.500'} mb={6}>
                        The page you&apos;re looking for does not seem to exist
                    </Text>


                    <Button
                        colorScheme="teal"
                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                        color="white"
                        variant="solid">
                        Go to Home
                    </Button>

                </Box>
                <SimpleGrid minChildWidth='md' spacing='10px'>

                    {Array.from({ length: 10 }).fill(1).map(() => {
                        return (
                            <Card maxW='sm'>
                                <CardBody>
                                    <Image
                                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />

                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'>
                                            Buy now
                                        </Button>
                                        <Button variant='ghost' colorScheme='blue'>
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>)
                    })
                    }


                </SimpleGrid>
            </Box>
        </Flex>

        <Outlet />

    </>);
}
