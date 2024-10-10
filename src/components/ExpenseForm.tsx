import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { categories } from "../data/categories";
import { useBudget } from '../hooks/useBudget';
import { DrafExpense, Value } from '../types/insdex';
import { ErrorMessage } from './ErrorMessage';


export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DrafExpense>({
    amount: 0,
    name: '',
    category: '',
    date: new Date()
  })

  const {dispatch} = useBudget()

  const [error,setError] = useState('')

  const hadleChage = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // En caso de que estemos escribiendo en expenseAmount
    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      // Si es amount, se convierte a number con +value, si no, se registra tal cual
      [name]: isAmountField ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(expense).includes('') || Object.values(expense).includes(0)) {
      setError("No se puede enviar un campo vacio")
      return
    }
    // Registrar el gasto en nuestro useReducer
    dispatch({type:'add-expense',payload:{expense}})
    // Reiniciamos nuestro state local de expense
    setExpense({
      amount: 0,
      name: '',
      category: '',
      date: new Date()
    })

  }

  return (
    <div className="">
      <form action="" className="space-y-5 " onSubmit={handleSubmit}>

        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
          Nuevo gasto
        </legend>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xl">
            Gasto
          </label>
          <input
            className="bg-slate-100 p-2"
            type="text"
            name="name"
            id="name"
            placeholder="Añade el nombre del gasto"
            onChange={hadleChage}
            value={expense.name}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-xl">
            Cantidad
          </label>
          <input
            className="bg-slate-100 p-2"
            type="number"
            name="amount"
            id="amount"
            placeholder="Añade la cantidad del gasto"
            value={expense.amount}
            onChange={hadleChage}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-xl">
            Categoria
          </label>
          <select
            className="bg-slate-100 p-2"
            name="category"
            id="category"
            value={expense.category}
            onChange={hadleChage}
          >
            <option value="">-- Seleccione una categoría --</option>
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="expense"
            className="text-xl">
            Fecha del gasto
          </label>
          <DatePicker
            className="bg-slate-100 border-0"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>

        <input type="submit" value={'Registrar gasto'} className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />

      </form>
    </div>
  )
}