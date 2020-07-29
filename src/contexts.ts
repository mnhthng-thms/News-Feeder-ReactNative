import React, { createContext } from 'react'
import navigationMachine from './machines/navigationMachine'
import { useMachine } from '@xstate/react'

const [state, send] = useMachine(navigationMachine)

export const NavContext = createContext({state, send})