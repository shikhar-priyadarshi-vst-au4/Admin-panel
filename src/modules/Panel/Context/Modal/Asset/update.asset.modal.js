import React, { useState, useEffect } from 'react';
import { AdminModal } from '../panel.modal';
import {
    Stack, FormControl, FormLabel, Input, ButtonGroup, Button, Select,
} from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAsset, panel } from '../../../panel.slice';

export const AssetUpdateModal = (props) => {
    const dispatch = useDispatch();
    const { asset } = useSelector(panel)
    const [asset_id, setAssetId] = useState("");
    const [state, setState] = useState({
        name: "",
        precision: "",
        symbol: ""
    })

    useEffect(() => {
        if (!!asset) {
            let { id, ...rest } = asset;
            setAssetId(id)
            setState({ ...state, ...rest });
        }
    }, [asset])

    const changeHandler = (e) => setState({ ...state, [e.target.name]: e.target.value })

    const submit = () => {
        console.log(state);
        if (!!state.name && !!state.precision && !!state.symbol) {
            dispatch(UpdateAsset(state));
        }
    }

    return <>
        <AdminModal
            heading={"Update Asset"}
            form={<Form {...state} change={changeHandler} />}
            buttonGroup={<BtnGroup onCloseEvent={props.onClose} onSubmitEvent={submit} />}
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
            <FormControl isRequired mr={"2rem"}>
                <FormLabel htmlFor="symbol">Symbol</FormLabel>
                <Input type="text" id="symbol" name="symbol" value={props.symbol} onChange={props.change} />
            </FormControl>
        </Stack>
    </>
}

const BtnGroup = (props) => {
    return <ButtonGroup>
        <Button variantColor="dark" variant="outline" cursor={"pointer"} onClick={() => props.onSubmitEvent()}>
            Update
        </Button>
        <Button variantColor="dark" variant="outline" cursor={"pointer"} onClick={() => props.onCloseEvent()}>
            Cancel
        </Button>
    </ButtonGroup>
}


