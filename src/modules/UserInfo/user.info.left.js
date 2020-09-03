import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text } from "@chakra-ui/core";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Button
} from "@chakra-ui/core";
import { GetUsers, GetUserById, GetUserByEmail, GetUserAccounts, UpdateUser } from './user.info.slice';

export const UserLeftInfo = (props) => {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState("");
    const [mailId, setMailId] = useState("");
    const [block, setBlock] = useState(false);
    const [disable2FA, setDisable2FA] = useState(false);
    const response = useSelector(state => state.user);
    console.log(response);
    const Ref = useRef(1);
    const [superTab, setSuperTab] = useState(1);
    const [tab, setTab] = useState(1);

    useEffect(() => {
        dispatch(GetUsers())
    }, [])

    useEffect(() => {
        if (superTab !== Ref.current) {
            Ref.current = superTab;
            setTab(1);
        }
    }, [superTab]);


    const onSubmit = () => {
        if (superTab === 1 && tab === 1) {
            dispatch(GetUserById(userId));
        }
        else if (superTab === 1 && tab === 2) {
            dispatch(GetUserByEmail(mailId))
        }
        else if (superTab === 2 && tab === 1) {
            dispatch(GetUserAccounts(userId))
        }
        else if (superTab === 2 && tab === 2) {

        }
        else if (superTab === 3 && tab === 1) {
            let value = {
                block,
                enabled_2fa: disable2FA
            }
            dispatch(UpdateUser(userId, value))
        }
    }
    return <>
        <LeftContainer>
            <Text fontSize={"lg"} textAlign={"center"}>Retrieve User Details</Text>
            <Tabs>
                <SuperTabList>
                    <SuperTab onClick={() => setSuperTab(1)}>
                        <Text fontSize={"sm"} textAlign={"center"}>User Details</Text>
                        {superTab === 1 && <TabList>
                            <Tab active={tab === 1} onClick={() => setTab(1)}>By Id</Tab>
                            <Tab active={tab === 2} onClick={() => setTab(2)}>By Mail</Tab>
                        </TabList>}
                    </SuperTab>
                    <SuperTab onClick={() => setSuperTab(2)}>
                        <Text fontSize={"sm"} textAlign={"center"}>User Accounts</Text>
                        {superTab === 2 && <TabList>
                            <Tab active={tab === 1} onClick={() => setTab(1)}>By Id</Tab>
                            {/* <Tab active={tab === 2} onClick={() => setTab(2)}>By Mail</Tab> */}
                        </TabList>}
                    </SuperTab>
                    <SuperTab onClick={() => setSuperTab(3)}>
                        <Text fontSize={"sm"} textAlign={"center"}>Update User</Text>

                    </SuperTab>
                </SuperTabList>
            </Tabs>

            <Position>
                {superTab === 1 &&
                    <>
                        {tab === 1 &&
                            <FormControl >
                                <FormLabel htmlFor="userId">User</FormLabel>
                                <Select id={"userId"} placeholder="Select User" name={"userId"} w={"200px"} onChange={(e) => setUserId(e.target.value)}>
                                    {response?.users?.map(v => <option value={v.id}>{v.first_name + " " + v.last_name}</option>)}

                                </Select>
                            </FormControl>}
                        {tab === 2 &&
                            <div style={{ display: "flex", flexDirection: "column" }}>

                                <FormControl >
                                    <FormLabel htmlFor="email">Email Id</FormLabel>
                                    <Input id="email" placeholder="Email Id" w={"200px"} />
                                </FormControl>
                                <Text fontSize={"sm"} textAlign={"center"}>Or</Text>
                                <FormControl >
                                    <FormLabel htmlFor="email">Email Id</FormLabel>
                                    <Select id="email" placeholder="Select Email" name={"mailId"} w={"235px"} onChange={(e) => setMailId(e.target.value)}>
                                        {response?.users?.map(v => <option value={v.email}>{v.email}</option>)}
                                    </Select>
                                </FormControl>
                            </div>}
                    </>}
                {superTab === 2 && <FormControl>
                    <FormLabel htmlFor="userId">User</FormLabel>
                    <Select id={"userId"} placeholder="Select User" name={"userId"} w={"200px"} onChange={(e) => setUserId(e.target.value)}>
                        {response?.users?.map(v => <option value={v.id}>{v.first_name + " " + v.last_name}</option>)}

                    </Select>
                </FormControl>}
                {superTab === 3 &&
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl isRequired my={2}>
                            <FormLabel htmlFor="userId">User</FormLabel>
                            <Select id={"userId"} placeholder="Select User" name={"userId"} w={"200px"} onChange={(e) => setUserId(e.target.value)}>
                                {response?.users?.map(v => <option value={v.id}>{v.first_name + " " + v.last_name}</option>)}

                            </Select>
                        </FormControl>
                        <FormControl isRequired my={2}>
                            <FormLabel htmlFor="block">Block&nbsp;/&nbsp;Unblock</FormLabel>
                            <Select id={"block"} placeholder="Select Option" name={"block"} w={"200px"} onChange={(e) => setBlock(e.target.value)}>
                                <option value={false}>Unblock</option>
                                <option value={true}>Block</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired my={2}>
                            <FormLabel htmlFor="disable2FA">Disable 2FA</FormLabel>
                            <Select id={"disable2FA"} placeholder="Select Option" name={"disable2FA"} w={"200px"} onChange={(e) => setDisable2FA(e.target.value)}>
                                <option value={false}>disable</option>
                            </Select>
                        </FormControl>
                    </div>
                }
            </Position>
            <div style={{ textAlign: "center" }}>
                <Button variantColor="dark" variant="outline" cursor={"pointer"} mx={8} onClick={() => onSubmit()}>
                    Query
             </Button>
            </div>
        </LeftContainer>
    </>
}

const Tabs = styled.div``;

const TabList = styled.ul`
padding-left : 0;
list-style : none;
display :  flex;
`;

const SuperTabList = styled(TabList)`
@media (max-width : 450px){
    flex-direction : column;
}
`;

const SuperTab = styled.li`
padding : 0.8em 0;
margin : 0 1em;
min-width : 122px;
transition : all 1s ease-in;
cursor : pointer;
`

const Tab = styled.li`
border-bottom : ${props => props.active ? "0.5px solid #272727" : "none"};
padding : 0.8em 0;
margin : 0 1em;
cursor : pointer;
font-size : 0.8em;
transition : all 1s ease-in;
`;

const Position = styled.div`
display : flex;
justify-content : center;
margin : 2rem 0;
`;

const LeftContainer = styled.div`
width : auto;
padding: 1rem;
min-height : 400px;
`;