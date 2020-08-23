import React, { useState } from 'react';
import {
    Box, Input, Text,
    SimpleGrid, Button
} from '@chakra-ui/core';
import data from './Contract.json';

// const initState = JSON.parse(JSON.stringify(data));

export const ContractStepFirst = (props) => {
    // const [formOne, setFormOne] = useState(initState[0].required.first)

    return <>
        <Box width="100%">
            <Box border={"0.5px dashed #272727"}
                borderRadius={"1rem"}
                m={{ base: "10px", md: "10px", lg: "auto" }}
                boxShadow={"0px 1px 3px 0px #464141eb"} maxW={"1000px"} >
                <Text fontSize="lg" textAlign="center" my={"4rem"}>Mandatory fields for creating a contract</Text>
                <SimpleGrid columns={{ md: 1, lg: 2 }}
                    spacing="20px"
                    margin={{ base: "10px", md: "10px", lg: "10px auto 10px" }}
                    minW="250px"
                    maxW="800px" >
                    {props.formOne.map((v, i) =>
                        <Input
                            variant="outline"
                            w="auto"
                            key={i}
                            placeholder={v.placeholder}
                            name={v.name}
                            value={v.value}
                            type={v.type}
                            onChange={props.change} />)}
                </SimpleGrid>

                <Box width="100%" textAlign="center" margin={"2rem 0"}>
                    <Button
                        rightIcon="arrow-forward"
                        color="blue.400"
                        variantColor="blue"
                        variant="outline"
                        onClick={() => props.next()}>
                        Next Step
                </Button>
                </Box>
            </Box>
        </Box>
    </>

}

// {/* <FormControl isRequired>
//   <FormLabel htmlFor="fname">First name</FormLabel>
//   <Input id="fname" placeholder="First name" />
// </FormControl> */}