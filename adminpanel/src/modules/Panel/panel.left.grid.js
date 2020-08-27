import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Select, Button, Stack, Icon } from "@chakra-ui/core";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Asset, Contract, Spot, panel } from './panel.slice';
import { ModalContext } from './Context/context.modal';

const createBtn = {
    leftIcon: "add",
    variant: "solid",
    color: "white.100",
    border: "none",
    cursor: "pointer",
    bg: "green.500",
    fontWeight: "500",
    _active: {
        bg: "green.500"
    },
    _hover: {
        bg: "green.500"
    }
}

const updateBtn = {
    leftIcon: FaEdit,
    variant: "solid",
    color: "white.100",
    border: "1px",
    cursor: "pointer",
    bg: "yellow.400",
    fontWeight: "500",
    _active: {
        bg: "yellow.400"
    },
    _hover: {
        bg: "yellow.400"
    }
}

const deletebtn = {
    leftIcon: FaTrash,
    variant: "solid",
    color: "white.100",
    border: "1px",
    cursor: "pointer",
    bg: "red.500",
    fontWeight: "500",
    _active: {
        bg: "red.500"
    },
    _hover: {
        bg: "red.500"
    }
}

export const LeftPanelGrid = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(ModalContext);
    const [data, setData] = useState({
        symbol_asset: "",
        symbol_contract: "",
        symbol_spot: ""
    })
    const symbolAsset = useRef(null);
    const symbolContract = useRef(null);
    const symbolSpot = useRef(null);
    const { assets, contracts, spots, asset, contract, spot } = useSelector(panel);

    useEffect(() => {

        if (!!data.symbol_asset && data.symbol_asset !== symbolAsset.current) {
            setTimeout(() => {
                symbolAsset.current = data.symbol_asset;
                dispatch(Asset(data.symbol_asset))
            }, 300)
        }
        if (!!data.symbol_contract && data.symbol_contract !== symbolContract.current) {
            setTimeout(() => {
                symbolContract.current = data.symbol_contract;
                dispatch(Contract(data.symbol_contract));
            }, 300)
        }
        if (!!data.symbol_spot && data.symbol_spot !== symbolSpot.current) {
            setTimeout(() => {
                symbolSpot.current = data.symbol_spot;
                dispatch(Spot(data.symbol_spot));
            }, 300)
        }

    }, [data.symbol_asset, data.symbol_contract, data.symbol_spot])

    const onchange = (e) => {
        let { value, name } = e.target;
        setData({ ...data, [name]: value });
    }

    console.log("asset, contract, spot", asset, contract, spot);

    return <>
        <Box maxWidth={["250px", "400px"]} margin={"0 auto"}>
            <Stack spacing={6}>
                <Box>
                    <Select placeholder="Assets" my={2}
                        bg={"white.100"} cursor={"pointer"}
                        borderColor="grey.300"
                        borderRadius={"0.2rem"}
                        name={"symbol_asset"}
                        value={data.symbol_asset}
                        onChange={onchange}>
                        {assets.map(v =>
                            <option key={v.id} value={v.symbol}>{v.name}</option>
                        )}
                    </Select>
                    <Box display={"flex"} justifyContent={"space-between"} my={"2rem"}>
                        <Button {...createBtn} onClick={() => context.openCreateAsset()}>Create</Button>
                        <Button {...updateBtn} onClick={() => context.openUpdateAsset()}>Update</Button>
                        <Button {...deletebtn} onClick={() => context.openDeleteAsset()}>Delete</Button>
                    </Box>
                </Box>
                <Box>
                    <Select placeholder="Contracts" my={2}
                        bg={"white.100"} cursor={"pointer"}
                        borderColor="grey.300"
                        borderRadius={"0.2rem"}
                        name={"symbol_contract"}
                        value={data.symbol_contract}
                        onChange={onchange}>
                        {contracts.map(v =>
                            <option key={v.id} value={v.symbol}>{v.symbol}</option>
                        )}
                    </Select>
                    <Box display={"flex"} justifyContent={"space-between"} my={"2rem"}>
                        <Button {...createBtn} onClick={() => history.push('/create/contract')}>Create</Button>
                        <Button {...updateBtn} onClick={() => history.push('/update/contract')}>Update</Button>
                        <Button {...deletebtn} onClick={() => context.openDeleteContract()}>Delete</Button>
                    </Box>
                </Box>
                <Box>
                    <Select placeholder="Spots" my={2}
                        bg={"white.100"} cursor={"pointer"}
                        borderColor="grey.300"
                        borderRadius={"0.2rem"}
                        name={"symbol_spot"}
                        value={data.symbol_spot}
                        onChange={onchange}>
                        {spots.map(v =>
                            <option key={v.id} value={v.symbol}>{v.symbol}</option>
                        )}
                    </Select>
                    <Box display={"flex"} justifyContent={"space-between"} my={"2rem"}>
                        <Button {...createBtn} onClick={() => context.openCreateSpot()}>Create</Button>
                        <Button {...updateBtn} onClick={() => context.openUpdateSpot()}>Update</Button>
                        <Button {...deletebtn} onClick={() => context.openDeleteSpot()}>Delete</Button>
                    </Box>
                </Box>
            </Stack>
        </Box>
    </>
}