import {configureStore} from '@reduxjs/toolkit'
import reducer from './reducer'
import extendSavedState from './preloadedState'
import {loadState, saveState} from './localstorage'
import throttle from 'lodash/throttle'
import {useDispatch} from 'react-redux'

let preloadedState = extendSavedState(loadState())

const store = configureStore({
    reducer,
    preloadedState
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000))

export default store
