import React, { useState } from 'react'

export function wrapInput<P>(Input: React.FC<P>): React.FC<any> {
  return (props: P) => {
    const [response, setResponse] = useState<unknown | undefined>(undefined)
    return (
      <Input
        {...props}
        answer={response}
        handleChange={(newResponse: unknown) => {
          setResponse(newResponse ?? undefined)
          var responseString: string
          if (Array.isArray(newResponse)) {
            responseString = `[${newResponse.toString()}]`
          } else {
            responseString = newResponse?.toString() ?? ''
          }
          localStorage.setItem('student.input', responseString)
        }}
      />
    )
  }
}
