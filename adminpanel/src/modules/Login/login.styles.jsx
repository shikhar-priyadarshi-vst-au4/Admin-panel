import styled from 'styled-components';

export const Card = styled.div`
width : 400px;
min-height : 150px;
background-color : transparent;
margin : 0 auto auto auto;
@media screen and (max-width : 430px){
    width : 280px;
}
`;

export const Container = styled.div`
width : 100vw;
height : 100vh;
background: #252525;
display : grid;
`
// linear-gradient(135deg, #000000 10%, #b030b0 40%, #000000 90%)
export const Text = styled.div`
font-size : 20px;
font-weight : 500;
letter-spacing : 0.1rem;
margin : auto auto 1rem auto;
color : #fff;
text-transform : ${(props) => !!props.textTransform ? props.textTransform : "none"};
`;


export const FormHandle = styled.div`
display : grid;
grid-template-columns : 200px 200px;
grid-template-rows : 50px; 
@media screen and (max-width : 430px){
display : grid;
grid-template-columns : 280px;
grid-template-rows : 75px 75px; 
 
}
`;

export const Input = styled.input`
padding-left : 2em;
border : 0.2px solid transparent;
font-size : 1em;
outline : none;
@media (max-width : 430px) {
    ${(props) => props.below430 ? props.below430 : ""}
}
@media (min-width : 430px){
    ${(props) => props.above430}
}
`;

export const Button = styled.div`
color : #fff;
background-color : #272727;
display : flex;
justify-content : center;
align-items : center;
height : 50px;
cursor : pointer;
border-bottom-right-radius : 25px;
border-bottom-left-radius : 25px;
text-transform : uppercase;
font-weight : 500;
`;

// &:hover{
//     background-color : #b030b0; 
// }