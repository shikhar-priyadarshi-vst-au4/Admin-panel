import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './modules/Login/login';
import { Panel } from './modules/Panel/panel';
import { UserInfo } from './modules/UserInfo/user.info';
import { AccountInfo } from './modules/AccountInfo/account.info';
import { ContractForm } from './modules/Panel/Form/Contract/contract';
import { ThemeProvider } from "@chakra-ui/core";
import { customTheme } from './theme';

const Router = props => {
    return (
        <ThemeProvider theme={customTheme}>
            <BrowserRouter basename={"/admin"} >
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/panel" component={Panel} />
                    <Route exact path="/user/info" component={UserInfo} />
                    <Route exact path="/account/info" component={AccountInfo} />
                    <Route exact path={"/:operation/contract"} component={ContractForm} />
                    <Route exact path="*" render={() => <Redirect to="/login" />} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Router;
