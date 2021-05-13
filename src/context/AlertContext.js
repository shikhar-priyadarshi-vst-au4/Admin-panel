import React, { useState, useMemo } from 'react';
import {Success} from '../components/Notification/success';
import {Error} from '../components/Notification/error';
import {Info} from '../components/Notification/info';

export const AlertContext = React.createContext()

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null)

  function show(alertType, msg) {
    setMessage(msg);
    setType(alertType);
    setTimeout(() => {hide()}, 1000);
  }

  function hide() {
    setType(null);  
    setMessage(null);
  }

  const value = useMemo(
    () => ({
      hide,
      show,
    }),
    [type]
  )

  return <AlertContext.Provider value={value}>
                                        <Success show={type === "success"} message={message}/>
                                        <Error show={type === "error"} message={message}/>
                                        <Info show={type === "info"} message={message}/>

                                            {children}
         </AlertContext.Provider>
}
