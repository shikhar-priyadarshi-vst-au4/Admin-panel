import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SimpleGrid, Box, Text } from "@chakra-ui/core";
import { Assets, Contracts, Spots, panel } from './panel.slice';
import { LeftPanelGrid } from './panel.left.grid';
import { RightPanelGrid } from './panel.right.grid';
import { ModalControl } from './Context/Modal/context.modal';
import styled from 'styled-components';
import { Bounce } from 'react-reveal';
import './panel.css';
import Header from "../../components/Header";


export const Panel = () => {
    // const history = useHistory();
    const dispatch = useDispatch();
    const { createdStatus, updatedStatus, deletedStatus } = useSelector(panel);
    useEffect(() => {
        dispatch(Assets());
        dispatch(Contracts());
        dispatch(Spots());
    }, [createdStatus, updatedStatus, deletedStatus]);

    return <>
        <ModalControl>
            <Header />
            <Container>
                <SimpleGrid columns={[1, 2]} spacing={6}>
                    <Bounce left>
                        <Box borderRadius={"0.5em"} borderColor={"grey.400"} p={4} className="box-elem">
                            <Text fontSize={"lg"} textAlign={"center"}>Operations</Text>
                            <LeftPanelGrid />
                        </Box>
                    </Bounce>
                    <Bounce right>
                        <Box borderRadius={"0.5em"} borderColor={"grey.400"} p={4} className="box-elem">
                            <RightPanelGrid />
                        </Box>
                    </Bounce>
                </SimpleGrid>
            </Container>
        </ModalControl>
    </>
}


const Container = styled.div`
width : 100%;
background-color : #ffffff;
overflow-x : hidden;
`;