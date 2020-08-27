import React from 'react';
import { AdminModal } from '../panel.modal';
import {
    Stack, ButtonGroup, Button, Text
} from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { removeSpot, panel } from '../../../panel.slice'

const Form = (props) => {

    return <>
        <Stack spacing={4}>
            <Text>
                {`Do you want to delete the spot (${props.symbol})?`}
            </Text>
        </Stack>
    </>
}

const BtnGroup = (props) => {
    return <ButtonGroup>
        <Button color={"blue.400"} variantColor={"white.100"} variant="outline" cursor={"pointer"} onClick={() => props.onClickEvent()} >
            Delete
        </Button>
        <Button color={"blue.400"} variantColor={"white.100"} variant="outline" cursor={"pointer"} onClick={() => props.onCloseEvent()}>
            Cancel
        </Button>
    </ButtonGroup>
}


export const SpotDeleteModal = (props) => {
    const dispatch = useDispatch();
    const { spotSymbol } = useSelector(panel)
    const onDelete = () => {
        if (!!spotSymbol) {
            dispatch(removeSpot(spotSymbol));
            props.onClose();
        }
    }
    return <>
        <AdminModal heading={"Confirmation"} form={<Form symbol={spotSymbol} />}
            buttonGroup={<BtnGroup onCloseEvent={props.onClose} onClickEvent={onDelete} />}
            isOpen={props.isOpen} onCloseEvent={props.onClose} />
    </>
}