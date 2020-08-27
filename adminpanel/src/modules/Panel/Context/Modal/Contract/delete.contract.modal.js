import React from 'react';
import { AdminModal } from '../panel.modal';
import {
    Stack, ButtonGroup, Button, Text
} from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { removeContract, panel } from '../../../panel.slice'


const Form = (props) => {

    return <>
        <Stack spacing={4}>
            <Text>
                {`Do you want to delete the contract (${props.symbol})?`}
            </Text>
        </Stack>
    </>
}

const BtnGroup = (props) => {
    return <ButtonGroup>
        <Button color={"blue.400"} variantColor={"white.100"} variant="outline" cursor={"pointer"} onClick={() => props.onClickEvent()}>
            Delete
        </Button>
        <Button color={"blue.400"} variantColor={"white.100"} variant="outline" cursor={"pointer"} onClick={() => props.onCloseEvent()}>
            Cancel
        </Button>
    </ButtonGroup>
}


export const ContractDeleteModal = (props) => {
    const dispatch = useDispatch();
    const { contractSymbol } = useSelector(panel)
    const onDelete = () => {
        if (!!contractSymbol) {
            dispatch(removeContract(contractSymbol));
            props.onClose();
        }
    }
    return <>
        <AdminModal heading={"Confirmation"}
            form={<Form symbol={contractSymbol} />}
            buttonGroup={<BtnGroup onCloseEvent={props.onClose} onClickEvent={onDelete} />}
            isOpen={props.isOpen} onCloseEvent={props.onClose} />
    </>
}