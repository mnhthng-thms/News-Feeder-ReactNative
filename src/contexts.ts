import React, { createContext } from 'react'
interface NavContextSchema {
  header: string, 
  // type of 2nd array element returned by useState<string>
  setHeader: React.Dispatch<React.SetStateAction<string>>
}

export const NavContext = createContext({ header: 'Headlines' } as NavContextSchema)