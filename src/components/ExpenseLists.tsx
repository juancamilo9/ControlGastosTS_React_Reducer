import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetails } from './ExpenseDetails';

export const ExpenseLists = () => {

    const { state } = useBudget();

    const filterCategory = state.currentCategory? state.expenses.filter(expense => expense.category === state.currentCategory): state.expenses

    
    // Declaramos un useMemo para que se detecte elcambio de state.expenses
    const isEmpty = useMemo(() => filterCategory.length === 0, [filterCategory])

    return (
        <div className="mt-10">
            {isEmpty ?
                <p className="text-gray-600 font-bold text-center text-2xl"> Sin gastos</p>
                : (
                    <>
                        <p className="font-bold text-gray-600 text-center my-5 text-2xl"> Lista de Gastos</p>
                        {filterCategory.map(expense => (
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