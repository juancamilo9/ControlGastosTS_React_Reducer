import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetReducer,initialState, BudgetState,BudgetActions } from "../reducers/budget-reducer" 

// type para BudgetContext
type BudgetContextProps = {
    state:BudgetState
    dispatch:Dispatch<BudgetActions>
}

// type para children, de BudgetProvider
type BudgetProviderProps = {
    children: ReactNode
}

// context quepodemos usar en los componenetes
export const BudgetContext = createContext<BudgetContextProps>(null!)

// children, hace referencia a los hijos de un componente, BudgetProvider es dedonde vienen los datos
export const BudgetProvider = ({children}:BudgetProviderProps)=>{

    const [state,dispatch] = useReducer(BudgetReducer,initialState)

    return (
        // conecxión tante de provider como de context
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}