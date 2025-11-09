import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css'
import App from './components/App/App'
import store from './state/store'
import {listenToKeyEvents} from './services/thunks'
import Modal from 'react-modal'
import * as Sentry from "@sentry/react";

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
    dsn: "https://154043590edfb2252e4ca7f7e936e937@o1187137.ingest.us.sentry.io/4508669311123456",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [/^https:\/\/18xx-support\.sstendal\.io/, /https:\/\/18xx-support\.netlify\.app/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

