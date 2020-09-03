import React from 'react';
import styled from 'styled-components';
import { Text } from "@chakra-ui/core";
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';

export const UserRightInfo = (props) => {
    const response = useSelector(state => state.user);
    return <>
        <RightContainer>
            <Text fontSize={"lg"} textAlign={"center"}>Action Response</Text>
            <Position>
                <ReactJson
                    src={response.user}
                // onEdit={this.onEdit}
                // onDelete={this.onDelete}
                />
            </Position>
        </RightContainer>
    </>
}

const RightContainer = styled.div`
width : 100%;
padding: 1rem;
`;
const Position = styled.div`
display : flex;
justify-content : center;
margin : 2rem 0;
`;