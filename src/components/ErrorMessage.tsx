import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export const ErrorMessage = ({children}:ErrorMessageProps) => {
  return (
    <p className="bg-red-400 p-2 font-bold text-sm text-center text-white rounded-lg">
        {children}
    </p>
  )
}