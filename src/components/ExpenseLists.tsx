import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetails } from './ExpenseDetails';

export const ExpenseLists = () => {

    const { state } = useBudget();

    // Declaramos un useMemo para que se detecte elcambio de state.expenses
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

    return (
        <div className="mt-10">
            {isEmpty ?
                <p className="text-gray-600 font-bold text-center text-2xl"> Sin gastos</p>
                : (
                    <>
                        <p className="font-bold text-gray-600 text-center my-5 text-2xl"> Lista de Gastos</p>
                        {state.expenses.map(expense => (
                            <ExpenseDetails
                                key={expense.id}
                                expense = {expense}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}