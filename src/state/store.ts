import {configureStore} from '@reduxjs/toolkit'
import reducer from './reducer'
import preloadedState from './preloadedState'
import {loadState, saveState} from './localstorage'
import throttle from 'lodash/throttle'
import {useDispatch} from 'react-redux'

let savedState = loadState()
if(!savedState) {
    savedState = preloadedState
}

const store = configureStore({
    reducer,
    preloadedState: savedState
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000))

export default store