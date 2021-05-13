import React, { Suspense } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './assets/css/tailwind.output.css'
import App from './App'
import store from './app/store';
import { SidebarProvider } from './context/SidebarContext'
import { AlertProvider } from './context/AlertContext';
import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker';

import './index.scss';

// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

ReactDOM.render(
  <Provider store={store}>
      <SidebarProvider>
        <AlertProvider>
          <Suspense fallback={<ThemedSuspense />}>
            <Windmill usePreferences>
              <App />
            </Windmill>
          </Suspense>
          </AlertProvider>
      </SidebarProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
