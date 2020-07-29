import React, { createContext, useState } from 'react'

const [header, setHeader] = useState('Headlines')

export const NavContext = createContext({header, setHeader})