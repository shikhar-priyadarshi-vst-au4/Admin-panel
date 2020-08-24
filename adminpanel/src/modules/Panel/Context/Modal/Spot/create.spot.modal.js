import React, { useState } from 'react';
import { AdminModal } from '../panel.modal';
import {
    Stack, FormControl, FormLabel, Input, ButtonGroup, Button, Select,
} from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { createNewSpot, panel } from '../../../panel.slice';

export const SpotCreateModal = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        description: "",
        volatility_threshold: "",
        is_enabled: false,
        is_composite: false,
        underlying_asset_id: "",
        quoting_asset_id: ""
    })

    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const submit = () => {
        if (!!state.description &&
            !!state.volatility_threshold &&
            !!state.underlying_asset_id &&
            !!state.quoting_asset_id &&
            !!state.is_composite &&
            !!state.is_enabled) {
            dispatch(createNewSpot(state));
        }
    }

    return <>
        <AdminModal
            heading={"Create Spot"}
            form={<Form {...state} change={changeHandler} />}
            buttonGroup={<BtnGroup onCloseEvent={props.onClose} onSubmitEvent={submit} />}
            isOpen={props.isOpen}
            onCloseEvent={props.onClose} />
    </>
}

const Form = (props) => {
    const { assets } = useSelector(panel);
    return <>
        <Stack spacing={4}>
            <FormControl isRequired mr={"2rem"}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input type="text" id="description" name="description" value={props.description} onChange={props.change} />
            </FormControl>
            <FormControl isRequired mr={"2rem"}>
                <FormLabel htmlFor="volatility_threshold">Volatility Threshold</FormLabel>
                <Input type="text" id="volatility_threshold" name="volatility_threshold" value={props.volatility_threshold} onChange={props.change} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="is_enabled">Enabled</FormLabel>
                <Select placeholder="Select option" id="is_enabled" name="is_enabled" value={props.is_enabled} onChange={props.change}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="is_composite">Composite</FormLabel>
                <Select placeholder="Select option" id="is_composite" name="is_composite" value={props.is_composite} onChange={props.change}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="underlying_asset_id">Underlying Asset Id</FormLabel>
                <Select placeholder="Select option" id="underlying_asset_id" name="underlying_asset_id" value={props.underlying_asset_id} onChange={props.change}>
                    {assets.map((val, i) => <option key={val.id} value={val.id}>{val.name}</option>)}
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="quoting_asset_id">Quoting Asset Id</FormLabel>
                <Select placeholder="Select option" id="quoting_asset_id" name="quoting_asset_id" value={props.quoting_asset_id} onChange={props.change}>
                    {assets.map((val, i) => <option key={val.id} value={val.id}>{val.name}</option>)}
                </Select>
            </FormControl>
        </Stack>
    </>
}

const BtnGroup = (props) => {
    return <ButtonGroup>
        <Button variantColor="teal" variant="solid" onClick={() => props.onSubmitEvent()}>
            Create
        </Button>
        <Button variantColor="teal" variant="outline" onClick={() => props.onCloseEvent()}>
            Cancel
        </Button>
    </ButtonGroup>
}


