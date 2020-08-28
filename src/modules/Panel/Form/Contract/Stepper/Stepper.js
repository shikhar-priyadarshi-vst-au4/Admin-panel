import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width : 100%;
height : 100px;
padding : 1rem 0;
`;

const Steps = styled.div`
max-width : 500px;
margin : auto;
height :  70px;
border : 0.5px dashed #2c232338;
border-radius : 1rem;
display : flex;
justify-content : center;
box-shadow : 0px 1px 3px 0px #464141eb;
@media (max-width : 510px){
    margin : 1rem;
}
`;

const Wrapper = styled.div`
width : 33.33%;
display : flex;
align-items :  center;
`;

const LastWrap = styled(Wrapper)`
width : auto;
`;

const Step = styled.div`
min-width : 30px;
min-height : 30px;
width : 20%;
height : 20%;
color : ${props => !!props.status ? "#79d70f" : "#fa1616"};
font-weight : 600;
border-radius : 1rem;
border : 1px solid ${props => !!props.status ? "#79d70f" : "#fa1616"};
display : flex;
justify-content :  center;
align-items :  center;
box-shadow : 0px 1px 0px 5px ${props => !!props.status ? "#79d70f" : "#fa1616"};
cursor : pointer;
`;
const StepLine = styled.div`
width : 80%;
height : 0.5px;
background-color : ${props => !!props.status ? "#79d70f" : "#fa1616"};
box-shadow : 0px 1px 0px 0px ${props => !!props.status ? "#79d70f" : "#fa1616"};
`;

export const Stepper = (props) => {
    const STEP1 = Boolean(Number(props.index) > 0 && Number(props.index) < 4);
    const STEP2 = Boolean(Number(props.index) > 1 && Number(props.index) < 4);
    const STEP3 = Boolean(Number(props.index) > 2 && Number(props.index) < 4);
    return <>
        <Container>
            <Steps>
                <Wrapper>
                    <Step status={STEP1}>1</Step>
                    <StepLine status={STEP1} />
                </Wrapper>
                <Wrapper>
                    <Step status={STEP2}>2</Step>
                    <StepLine status={STEP2} />
                </Wrapper>
                <LastWrap>
                    <Step status={STEP3}>3</Step>
                </LastWrap>
            </Steps>
        </Container>
    </>
}