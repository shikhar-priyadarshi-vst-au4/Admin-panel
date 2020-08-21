import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import JSONViewer from 'react-json-viewer';
import { panel } from './panel.slice';
import { Box, Checkbox, Stack } from '@chakra-ui/core';
import "./panel.css";

export const RightPanelGrid = () => {
    const [json, setJSON] = useState();
    const [check, setCheck] = useState("");
    const { asset, contract, spot } = useSelector(panel)
    useEffect(() => {
        setCheck('Asset');
    }, [])
    useEffect(() => {
        if (check === 'Asset') setJSON(asset);
        if (check === 'Contract') setJSON(contract);
        if (check === 'Spot') setJSON(spot);
    }, [check, asset, contract, spot])

    const onCheckbox = (e) => {
        setCheck(e.target.value);
    }
    return <>
        <Box maxWidth={["250px", "400px"]} margin={"0 auto"} py={"3rem"}>
            <Stack spacing={6}>
                <Box display={"flex"} justifyContent={{ base: "flex-start", md: "space-between" }}
                    flexDirection={{ base: "column", md: "row" }}>
                    <Checkbox
                        value="Asset"
                        onChange={onCheckbox}
                        m={{ base: 1, md: 0 }}
                        isChecked={Boolean(check === "Asset")}>ASSET</Checkbox>
                    <Checkbox
                        value="Contract"
                        onChange={onCheckbox}
                        m={{ base: 1, md: 0 }}
                        isChecked={Boolean(check === "Contract")}>CONTRACT</Checkbox>
                    <Checkbox
                        value="Spot"
                        onChange={onCheckbox}
                        m={{ base: 1, md: 0 }}
                        isChecked={Boolean(check === "Spot")}>SPOT</Checkbox>
                </Box>

                <ReactJson
                    src={json}
                // onEdit={this.onEdit}
                // onDelete={this.onDelete}
                />
                <Box mt={8} width="100%" overflowX={"auto"} className="scrolling_effect" >
                    <JSONViewer
                        json={json}
                    />
                </Box>
            </Stack>
        </Box>
    </>

}