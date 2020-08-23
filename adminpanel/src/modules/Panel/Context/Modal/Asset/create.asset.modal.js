import React, { useState } from 'react';
import { AdminModal } from '../panel.modal';
import {
    Stack, FormControl, FormLabel, Input, ButtonGroup, Button, Select,
} from "@chakra-ui/core";


export const AssetCreateModal = (props) => {

    const [state, setState] = useState({
        name: "",
        precision: "",
        symbol: ""
    })

    const changeHandler = (e) => setState({ ...state, [e.target.name]: e.target.value })

    return <>
        <AdminModal
            heading={"Create Asset"}
            form={<Form {...state} change={changeHandler} />}
            buttonGroup={<BtnGroup onCloseEvent={props.onClose} />}
            isOpen={props.isOpen}
            onCloseEvent={props.onClose} />
    </>
}


const Form = (props) => {

    return <>
        <Stack spacing={4}>
            <FormControl isRequired mr={"2rem"}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input type="text" id="name" name="name" value={props.name} onChange={props.change} />
            </FormControl>
            <FormControl isRequired mr={"2rem"}>
                <FormLabel htmlFor="precision">Precision</FormLabel>
                <Input type="text" id="precision" name="precision" value={props.precision} onChange={props.change} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="symbol">Enabled</FormLabel>
                <Select placeholder="Select symbol" id="symbol" name="symbol" value={props.symbol} onChange={props.change}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </Select>
            </FormControl>
        </Stack>
    </>
}

const BtnGroup = (props) => {
    return <ButtonGroup>
        <Button variantColor="teal" variant="solid">
            Create
        </Button>
        <Button variantColor="teal" variant="outline" onClick={() => props.onCloseEvent()}>
            Cancel
        </Button>
    </ButtonGroup>
}


