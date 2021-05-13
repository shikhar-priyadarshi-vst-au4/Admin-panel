import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Info} from './info';
import {Error} from './error';
import {Success} from './success';
import {Warn} from './warn';

const alertVariants = {
    open : {
        x: 0,
        opacity : 1,
        display : 'block',
        transition : {
            type : "tween",
        }
    },
    close : {
        x : 100,
        opacity : 0,
        display : 'none'
    }
}



export const Notify = ({type = null, message = null}) => {
    
    const [alert, setAlert] = useState(type);

    useEffect(() => {
        
        let timer;
        
        if(!!alert){
            let body = document.getElementsByTagName('body')[0];
            
            timer = setTimeout(() => {
                setAlert(null);
            }, 1000)
            
            body.classList.add('overflow-hidden');
        }
        
        return () => {
            clearTimeout(timer);
            body.classList.remove("overflow-hidden");
        }

    }, [])

    return (
        <>
            <motion.div initial={'close'} animate={alert === "success" ? "open" : "close"} variants={alertVariants}>
               <Success message={message}/> 
            </motion.div>
            <motion.div initial={'close'} animate={alert === "error" ? "open" : "close"} variants={alertVariants}>
               <Error message={message}/> 
            </motion.div>
            <motion.div initial={'close'} animate={alert === "warn" ? "open" : "close"} variants={alertVariants}>
               <Warn message={message}/> 
            </motion.div>
            <motion.div initial={'close'} animate={alert === "info" ? "open" : "close"} variants={alertVariants}>
               <Info message={message}/> 
            </motion.div>
        </>
    )
}
