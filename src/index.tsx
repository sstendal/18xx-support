import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css'
import App from './components/App/App'
import store from './state/store'
import {listenToKeyEvents} from './services/thunks'
import Modal from 'react-modal'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Overriding react-modal styles
Modal.setAppElement('#root')
Modal.defaultStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: 'whitesmoke',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0.4rem',
        outline: 'none',
        padding: '2rem'
    }
}

// Registering a function that will listen to keystrokes globally
// and dispatch actions to redux
store.dispatch(listenToKeyEvents())

// Using sentry to discover runtime errors in browsers
Sentry.init({
    dsn: "https://0d29e3571ce64cf9bcfbc2adaee937a8@o1187137.ingest.sentry.io/6307069",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

