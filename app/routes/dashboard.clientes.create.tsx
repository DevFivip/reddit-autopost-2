import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from '@chakra-ui/react'

import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
} from 'react-icons/md'

import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'

export default function DashboardClienteCreate() {

    return (<>

        <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box m={8}>
                <VStack spacing={5}>
                    <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                                <BsPerson color="gray.800" />
                            </InputLeftElement>
                            <Input type="text" size="md" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                                <MdOutlineEmail color="gray.800" />
                            </InputLeftElement>
                            <Input type="text" size="md" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="name" float="right">
                        <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                            Send Message
                        </Button>
                    </FormControl>
                </VStack>
            </Box>
        </Box>



    </>);
}
