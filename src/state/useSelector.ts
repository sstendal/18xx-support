import {useDispatch as reactUseDispatch, useSelector as reactUseSelector} from 'react-redux'
import {AppDispatch, RootState} from './store'

type RootStateSelector = <Selected>(selector: (state: RootState) => Selected, equalityFn?: (left: Selected, right: Selected) => boolean) => Selected

/**
 * Re-exporting the useSelector function with a type definition
 */
export const useSelector = reactUseSelector as RootStateSelector

/**
 * Re-exporting the useDispatch function with a type definition
 */
export const useDispatch = () => reactUseDispatch<AppDispatch>()