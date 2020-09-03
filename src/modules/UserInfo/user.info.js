import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from "../../components/Header";
// import { SimpleGrid, Box, Text } from "@chakra-ui/core";
import { UserLeftInfo } from './user.info.left'
import { UserRightInfo } from './user.info.right';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from "@chakra-ui/core";
import { setSuccess } from './user.info.slice';

export const UserInfo = (props) => {
    const { success } = useSelector(state => state.user);
    const toast = useToast();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!!success) {
            toast({
                position: "top",
                title: "User Updated Successfully",
                description: "We've updated user details.",
                status: "success",
                duration: 9000,
            })
        }
        else {
            dispatch(setSuccess(false));
        }
    }, [success])

    return <>
        <UserWrapper>
            <Header />
            <Grid>
                <LeftGrid>
                    <UserLeftInfo />
                </LeftGrid>
                <RightGrid>
                    <UserRightInfo />
                </RightGrid>
            </Grid>
        </UserWrapper>
    </>;
}


const UserWrapper = styled.div`
margin : 0 auto;
`;

const Grid = styled.div`
display : grid;
grid-template-columns : 45% 45%;
grid-template-rows : auto;
justify-content : center;
gap : 10px 10px;
@media (max-width : 768px){
    grid-template-columns : 100%;
}
`;

const LeftGrid = styled.div`
min-width : 200px;
background-color : #ffffff;
box-shadow: 2px 3px 5px 2px rgb(139 129 129 / 49%);
border-radius : 0.5rem;
border-bottom: 1.5px solid #272727;
`;

const RightGrid = styled.div`
background-color : #ffffff;
box-shadow: 2px 3px 5px 2px rgb(139 129 129 / 49%);
border-radius : 0.5rem;
border-bottom: 1.5px solid #272727;
`;