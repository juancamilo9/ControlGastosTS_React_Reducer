import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, BudgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"


// type para BudgetContext
type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses:number
    available:number
}

// type para children, de BudgetProvider
type BudgetProviderProps = {
    children: ReactNode
}

// context quepodemos usar en los componenetes
export const BudgetContext = createContext<BudgetContextProps>(null!)

// children, hace referencia a los hijos de un componente, BudgetProvider es dedonde vienen los datos
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(BudgetReducer, initialState)


    //state derivado para calcular lo gastado
    const totalExpenses: number = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    //state derivado para calcular lo disponible
    const available = state.budget - totalExpenses

    return (
        // conecxión tante de provider como de context
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                available
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}