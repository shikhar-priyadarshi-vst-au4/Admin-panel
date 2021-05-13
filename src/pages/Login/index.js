import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { handleLogin, loginStatus } from './slice';
import { AlertContext } from '../../context/AlertContext'
import {LineScalePulseOutRapid} from '../../components/Loaders';
import SecureLS from 'secure-ls';

import ImageLight from '../../assets/img/login-office.jpeg'
import ImageDark from '../../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'

const ls = new SecureLS();

const Backdrop = ({children, click = () => {}}) => {

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    },[])

    return <>
        <div className="fixed inset-0">
            <div className="fixed w-full h-full bg-indigo-600 bg-opacity-25" onClick={click}></div>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="h-40 z-50 shadow rounded bg-gray-300 bg-opacity-25 w-screen max-w-md  flex items-center justify-center">
                    {children}
                </div>    
            </div>
        </div>
    </>
}


function Login() {
    const [showCaptcha, setCaptcha] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        captcha_token: "",
    })
    const dispatch = useDispatch();
    const {show} = useContext(AlertContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }
    const { isAuthenticated, loading, error } = useSelector(loginStatus);
    
    useEffect(() => {
        if (!loading && !!ls.get("token")) {
            history.push(from);
        }
    }, [loading])

   useEffect(() => {
       if(!!error){
           onMessage(error);
       }
   },[error])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleCaptcha = (value) => {
        setCaptcha(false);
        dispatch(handleLogin({ ...data, captcha_token: value }));
        
    }

    const onMessage = (msg) => {
        show("error", msg);
    }


    const triggerCaptcha = () => {
        if(!!data.email && !!data.password){
            setCaptcha(true);
        }
    }    

  return (<>
                        
    {loading && <Backdrop click={() => {}}>
                    <LineScalePulseOutRapid/>   
                </Backdrop>}
    {showCaptcha && <Backdrop click={() => setCaptcha(false)}>
                            <ReCAPTCHA    
                                    badge="inline"
                                    sitekey="6Lci5M0ZAAAAAFsf0HF9X6arMJUElFrnWg4faVty"
                                    onExpired={() => {
                                        onMessage("Google captcha expired. Please, redo.");
                                    }}
                                    onErrored={() => {
                                        onMessage("Google captcha facing network failure. Try later.");
                                    }}
                                    onChange={handleCaptcha}
                                    size={"normal"} 
                                                        />
                    </Backdrop>} 
               
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input 
                        className="mt-1" 
                        id="mailid" 
                        type="text" 
                        name={"email"} 
                        value={data.email} 
                        onChange={(e) => handleChange(e)}
                        autoComplete="off" 
                        placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input 
                        className="mt-1" 
                        id="pass" 
                        type="password" 
                        name={"password"} 
                        value={data.password} 
                        onChange={(e) => handleChange(e)}
                        autoComplete="off" 
                        placeholder="***************" />
              </Label>

              <Button className="mt-4" block onClick={() => triggerCaptcha()}>
                Log in
              </Button>

              {/* <hr className="my-8" /> */}

              
              {/* <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
