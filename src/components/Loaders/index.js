import React from 'react';
import Loader from 'react-loaders';
import './loaders.scss';

export const BallScaleLoader = () => {
    return  <Loader type="ball-scale-multiple" active/>
}

export const LineScalePulseOutRapid = () => {
    return <Loader type="line-scale-pulse-out-rapid" active/>
}