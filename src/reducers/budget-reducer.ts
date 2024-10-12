import { v4 as uuidv4 } from 'uuid';
import { DrafExpense, Expense } from '../types/insdex';

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DrafExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'edit-expense', payload: { expense: Expense } } |
    { type: 'reset-app' }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
    editingId: Expense['id']
    modalBugdget:boolean
}

const initialBudget = (): number=>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget:0;
}

const initialExpenses = (): Expense[]=>{
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses):[]
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    modalBugdget:false
}

// Fucnion parac rear un gasto
const createExpense = (drafExpense: DrafExpense): Expense => {
    return {
        ...drafExpense,
        id: uuidv4()
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
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId:''
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'delete-expense') {
        // Traemos todos los expenses diferentes al id compartido
        const newExpenses = state.expenses.filter(expense => expense.id != action.payload.id)

        return {
            ...state,
            expenses: newExpenses
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'edit-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId:''
        }
    }

    if(action.type==='reset-app'){
        return{
            ...state,
            budget:0,
            expenses: [],
        }
    }

    return state
}