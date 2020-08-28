import React, { useEffect } from 'react';
import {
    Box, Input, Text,
    SimpleGrid, Button,
    Select
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Assets, Spots, panel } from '../../panel.slice';

export const ContractStepFirst = (props) => {

    const dispatch = useDispatch();

    const { assets, spots } = useSelector(panel);

    useEffect(() => {
        dispatch(Assets());
        dispatch(Spots());
    }, [])

    console.log(assets, spots);

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
                    {props.formOne.map((v, i) => {
                        return (v.name === "symbol" ?
                            <Input
                                variant="outline"
                                w="auto"
                                key={i}
                                placeholder={v.placeholder}
                                name={v.name}
                                value={v.value}
                                type={v.type}
                                onChange={props.change} />
                            :
                            <Select
                                placeholder={v.placeholder}
                                bg={"white.100"} cursor={"pointer"}
                                height={"2.8rem"}
                                key={i}
                                name={v.name}
                                value={v.value}
                                onChange={props.change}>
                                {v.name === "settling_asset_id" ?
                                    assets.map((val, i) => <option key={val.id} value={val.id}>{val.name}</option>)
                                    : v.name === "spot_id" ?
                                        spots.map((val, i) => <option key={val.id} value={val.id}>{val.symbol}</option>)
                                        : v.options.map((val, i) => <option key={i} value={val}>{val}</option>)}
                            </Select>)
                    })}


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
