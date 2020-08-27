import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Stepper } from './Stepper/Stepper';
import { ContractStepFirst } from './contract.step.first';
import { ContractStepSecond } from './contract.step.second';
import { ContractStepThird } from './contract.step.third';
import { OBJECT_MAP_TO_JSON, JSON_MAP_TO_OBJECT } from './ObjectMapping/object.map';
import { panel, createNewContract } from '../../panel.slice';
import { Zoom } from 'react-reveal';

export const ContractForm = () => {
    const { contract } = useSelector(panel);
    const { operation } = useParams();
    const dispatch = useDispatch();
    const value = operation === "update" ? contract : null;
    const { FIRST_REQ = null, SECOND_REQ = null, SECOND_OPT = null,
        THIRD_OPT = null, FIRST_REQ_RESP = null, SECOND_REQ_RESP = null,
        SECOND_OPT_RESP = null, THIRD_OPT_RESP = null } = OBJECT_MAP_TO_JSON(value);

    const [formOne, setFormOne] = useState(FIRST_REQ || FIRST_REQ_RESP);
    const [formTwoReq, setFormTwoReq] = useState(SECOND_REQ || SECOND_REQ_RESP);
    const [formTwoOpt, setFormTwoOpt] = useState(SECOND_OPT || SECOND_OPT_RESP);
    const [formThreeOpt, setFormThreeOpt] = useState(THIRD_OPT || THIRD_OPT_RESP);

    const [tab, setTab] = useState(1);

    const nextIndex = () => tab < 4 ? setTab(Number(tab) + 1) : "";
    const prevIndex = () => tab > 0 ? setTab(Number(tab) - 1) : "";
    const setIndex = (v) => (Number(v) > 0 && Number(v) < 4) ? setTab(Number(v)) : "";

    const changeHandleFirst = (e) => {
        let result = formOne.map(v => {
            if (v.name === e.target.name) {
                v.value = e.target.value;
            }
            return v;
        })
        setFormOne(result);
    }

    const changeHandleSecond = (e) => {
        let result1 = formTwoReq.map(v => {
            if (v.name === e.target.name) {
                v.value = e.target.value;
            }
            return v;
        })
        let result2 = formTwoOpt.map(v => {
            if (v.name === e.target.name) {
                v.value = e.target.value;
            }
            return v;
        })
        setFormTwoReq(result1);
        setFormTwoOpt(result2);
    }

    const changeHandleThird = (e) => {
        let result = formThreeOpt.map(v => {
            if (v.name === e.target.name) {
                // v.value = e.target.value;
                v.value = null;
            }
            return v;
        })
        setFormThreeOpt(result);
    }

    const submitHandle = () => {
        let form_One = formOne.map(v => {
            if (v.name === "is_enabled") {
                v.value = Boolean(v.value === "Yes") || !Boolean(v.value === "No");

            }
            return v;
        })
        const json = {
            first_req: form_One,
            second_req: formTwoReq,
            second_opt: formTwoOpt,
            third_opt: formThreeOpt
        }
        const result = JSON_MAP_TO_OBJECT(json);
        console.log("result", result);
        dispatch(createNewContract(result));
    }

    return <>
        <Stepper index={tab} changeIndex={setIndex} />
        {tab === 1 && <Zoom><ContractStepFirst next={nextIndex} change={changeHandleFirst} formOne={formOne} /></Zoom>}
        {tab === 2 && <Zoom><ContractStepSecond prev={prevIndex} next={nextIndex} change={changeHandleSecond} formTwoReq={formTwoReq} formTwoOpt={formTwoOpt} /></Zoom>}
        {tab === 3 && <Zoom><ContractStepThird prev={prevIndex} change={changeHandleThird} formThreeOpt={formThreeOpt} submit={submitHandle} /></Zoom>}
    </>
}