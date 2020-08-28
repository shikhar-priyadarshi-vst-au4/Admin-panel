import React, { useState, useRef, useEffect } from 'react';


import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, InputGroup, InputRightElement, Box, Stack, Button, Text } from "@chakra-ui/core";
import { handleLogin, loginStatus } from './login.slice';

const Wrapper = styled.div`
max-width : 1280px;
margin : 0 auto;
`;

const Container = styled.div`
display : grid;
grid-template-columns : 200px auto 200px;
grid-template-rows: 100vh;
@media (max-width : 600px){
    grid-template-columns : auto;
    grid-template-rows: 100vh;   
}`;

const FormWrap = styled.div`
width : 100%;
grid-column : 2/3;
padding-top : 4rem;
@media (max-width : 600px){
    grid-column : 1;
}
`;



export const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector(loginStatus);
    // console.log("isAuthenticated", isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/panel");
        }
    }, [isAuthenticated])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onsubmit = () => {
        dispatch(handleLogin(data));
    }

    return (<>
        <Wrapper>
            <Container>
                <FormWrap>
                    <Box
                        border={"1px"}
                        borderColor="grey.300"
                        borderRadius={"0.2rem"}
                        bg={"white.100"}
                        boxShadow={"0px 3px 5px 0px #b6afafb5"}
                        px={4} pt={8} pb={8} mx={"auto"} w={"300px"}>
                        <Stack spacing={8}>
                            <Text fontSize={"lg"} mx={2} color={"grey.600"}>Login Account</Text>
                            <Input
                                name={"email"}
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                w={"auto"}
                                mx={2}
                                borderColor="grey.300"
                            />
                            <InputGroup size="md">
                                <Input
                                    name={"password"}
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    w={"auto"}
                                    mx={2}
                                    borderColor="grey.300"
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                />
                                <InputRightElement width="3rem" mr={"1rem"} mt={"2px"} >
                                    <Button h="1.75rem"
                                        size="sm"
                                        border={"0.8px solid"}
                                        borderColor={"grey.300"}
                                        _focus={{
                                            bg: "grey.300"
                                        }}
                                        cursor={"pointer"}
                                        onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                py={4} px={2}>
                                <Button w={"200px"} bg={"#270000b8"} color={"#fff"} borderColor={"transparent"}
                                    _hover={{
                                        bg: "#270000b8"
                                    }}
                                    _active={{
                                        bg: "#270000b8"
                                    }}
                                    cursor={"pointer"}
                                    onClick={() => onsubmit()}
                                >LOGIN</Button>
                            </Box>
                        </Stack>
                    </Box>
                </FormWrap>
            </Container>
        </Wrapper>
    </>)
}




// import { Container, Text, Card, FormHandle, Input, Button } from './login.styles';

// export const Login = () => {
//     let loginRef = useRef(null);
//     let [mediaPredicate, setMediaQuery] = useState({ width: 0, height: 0 });
//     useEffect(() => {
//         if (!!loginRef.current) {
//             setMediaQuery({ ...mediaPredicate, width: loginRef.current.clientWidth, height: loginRef.current.clientHeight });
//         }
//     }, [])
//     console.log(mediaPredicate);
//     return (<>
//         <Container ref={loginRef}>
//             <Text textTransform={"uppercase"}>login your account</Text>
//             <Card>
//                 <FormHandle>
//                     <Input
//                         placeholder="Mailing Address"
//                         above430={{ "border-top-left-radius": "20px" }}
//                         below430={{ "border-top-left-radius": "20px", "border-top-right-radius": "20px" }} />
//                     <Input
//                         placeholder="Password"
//                         above430={{ "border-top-right-radius": "20px" }} />
//                 </FormHandle>
//                 <Button>SIGN IN</Button>
//             </Card>
//         </Container>
//     </>)
// }
