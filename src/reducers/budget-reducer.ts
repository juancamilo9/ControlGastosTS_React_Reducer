import { v4 as uuidv4 } from 'uuid';
import { DrafExpense, Expense } from '../types/insdex';

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    { type: 'add-expense', payload: { expense: DrafExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } }

export type BudgetState = {
    budget: number,
    modal:boolean,
    expenses:Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    modal:false,
    expenses:[]
}

// Fucnion parac rear un gasto
const createExpense= (drafExpense:DrafExpense) : Expense=>{
    return {...drafExpense,
        id:uuidv4()
    }
}

export const BudgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions

) => {
    if (action.type === 'add-budget') {
        return { 
            ...state, 
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return { 
            ...state, 
            modal:true
        }
    }

    if (action.type === 'close-modal') {
        return { 
            ...state, 
            modal:false
        }
    }

    if (action.type === 'add-expense') {
        
        const expense = createExpense(action.payload.expense);
        return { 
            ...state, 
            expenses:[...state.expenses, expense],
            modal:false
        }
    }

    if (action.type==='delete-expense'){
        // Traemos todos los expenses diferentes al id compartido
        const newExpenses = state.expenses.filter(expense => expense.id != action.payload.id)
        
        return {
            ...state,
            expenses:newExpenses
        }
    }
    return state
}