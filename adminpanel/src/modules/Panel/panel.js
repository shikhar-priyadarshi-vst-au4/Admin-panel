import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SimpleGrid, Box, Text } from "@chakra-ui/core";
import { Assets, Contracts, Spots, panel } from './panel.slice';
import { LeftPanelGrid } from './panel.left.grid';
import { RightPanelGrid } from './panel.right.grid';
import { ModalControl } from './Context/Modal/context.modal';

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
            <SimpleGrid columns={[1, 2]} spacing={10} m={"1rem"}>
                <Box border={"1px solid"} borderColor={"grey.200"} height="100%" p={4}>
                    <Text fontSize={"lg"} textAlign={"center"}>Operations</Text>
                    <LeftPanelGrid />
                </Box>
                <Box border={"1px solid"} borderColor={"grey.200"} height="100%">
                    <RightPanelGrid />
                </Box>
            </SimpleGrid>
        </ModalControl>
    </>
}