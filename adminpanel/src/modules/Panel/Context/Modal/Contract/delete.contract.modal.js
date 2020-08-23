import React from 'react';
import { AdminModal } from '../panel.modal';
import {
    Stack, ButtonGroup, Button, Text
} from "@chakra-ui/core";

const Form = (props) => {

    return <>
        <Stack spacing={4}>
            <Text>
                Do you want to delete the contract?
            </Text>
        </Stack>
    </>
}

const BtnGroup = (props) => {
    return <ButtonGroup>
        <Button variantColor="teal" variant="solid">
            Delete
        </Button>
        <Button variantColor="teal" variant="outline" onClick={() => props.onCloseEvent()}>
            Cancel
        </Button>
    </ButtonGroup>
}


export const ContractDeleteModal = (props) => {

    return <>
        <AdminModal heading={"Confirmation"} form={<Form />} buttonGroup={<BtnGroup onCloseEvent={props.onClose} />} isOpen={props.isOpen} onCloseEvent={props.onClose} />
    </>
}