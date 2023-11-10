import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";

import {
    Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue,
} from '@chakra-ui/react'

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const resp = await authenticator.authenticate("form", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        throwOnError: true,
        context,
    });
    console.log(resp);
    return resp;
};

/**
 * get the cookie and see if there are any errors that were
 * generated when attempting to login
 *
 * @param param0
 * @returns
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {

    await authenticator.isAuthenticated(request, {
        successRedirect: "/dashboard"
    });

    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );

    const error = session.get("sessionErrorKey");
    return json<any>({ error });
};

/**
 *
 * @returns
 */
// export default function LoginPage() {
//     // if i got an error it will come back with the loader data
//     const loaderData = useLoaderData();
//     console.log(loaderData);
//     return (
//         <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
//             <h1>Welcome to Remix-Auth Example</h1>
//             <p>
//                 Based on the Form Strategy From{" "}
//                 <a href="https://github.com/sergiodxa/remix-auth" target={"_window"}>
//                     Remix-Auth Project
//                 </a>
//             </p>
//             <Form method="post">
//                 <input type="email" name="email" placeholder="email" required />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="password"
//                     autoComplete="current-password"
//                 />
//                 <button>Sign In</button>
//             </Form>
//             <div>
//                 {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
//             </div>
//         </div>
//     );
// }

export default function LoginPage() {
    const loaderData = useLoaderData();
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Inicia Sesion ✌️</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Form method="post">
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name="email" placeholder="email" required />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name="password" placeholder="password" autoComplete="current-password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    mt={5}
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Text color={'blue.400'}>Forgot password?</Text>
                                </Stack>
                                <Button
                                    as={'button'}
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Ingresar
                                </Button>
                                <Stack>

                                    {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}

                                </Stack>
                            </Stack>
                        </Form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}