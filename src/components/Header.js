import React, { useState } from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useHistory } from "react-router-dom";



export default function Header(props) {
    const [toggle, setToggle] = useState(false);
    const history = useHistory();

    return (<>
        <Navbar>
            <Nav>
                <NavImg src="/a5-black-header-logo.21ffb44e.svg" alt="" />
                <NavList toggle={toggle}>
                    <NavItem onClick={() => history.push('/user/info')}>Users</NavItem>
                    <NavItem onClick={() => history.push('/account/info')}>Accounts</NavItem>
                    <NavItem onClick={() => history.push('/panel')}>Operations</NavItem>
                </NavList>
            </Nav>
            <Display>
                < GiHamburgerMenu onClick={() => setToggle(!toggle)} />
            </Display>
        </Navbar>
    </>);
}

const Display = styled.div`
display : none;
@media (max-width : 728px){
    display : block;
    padding : 1rem;
}
`;

const Navbar = styled.div`
background-color : #ffffff;
box-sizing: border-box;
margin: 1em;
border-bottom: 1.5px solid #272727;
box-shadow : 1px 1px 2px 0px #847979a3;
border-radius : 0.5rem;
@media (max-width : 728px){
    display : flex;
    justify-content : space-between;
}`;

const Nav = styled.div`
display : flex;
justify-content : space-between;
@media (max-width : 728px){
    flex-direction :  column;
    
}
`;

const NavImg = styled.img`
width : 60px;
height : 60px;
margin : 1em 2em;
`;

const NavList = styled.ul`
padding-left : 0;
list-style : none;
display :  ${props => props.toggle ? "none" : "flex"};
flex-direction : row;
@media(min-width : 729px){
    align-items : center;
}
@media (max-width : 728px){
    flex-direction : column;
}`;

const NavItem = styled.li`
margin : 0 0.5em;
cursor : pointer;
padding : 0.5em 1em;
transition : all 0.5s ease-in;
@media (max-width : 728px){
    margin : 0.5em 1em;
    &:hover{
        position : relative;
      &::after{
          content : " ";
          border-radius : 1rem;
          width : 30px;
          height : 2.5px;
          left : 16px;
          bottom : 0px;
          position : absolute;
          background-color : #272727;
      }
    }
}
@media (min-width : 729px){
    &:hover{
        position : relative;
      &::after{
          content : " ";
          border-radius : 1rem;
          width : 30px;
          height : 2px;
          left : 17px;
          bottom : 0px;
          position : absolute;
          background-color : #272727;
      }
    }
}

`;

// const NavLinkItem = styled.div``;