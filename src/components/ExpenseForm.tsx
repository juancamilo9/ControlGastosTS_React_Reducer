import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { categories } from "../data/categories";
import { useBudget } from '../hooks/useBudget';
import { DrafExpense, Value } from '../types';
import { ErrorMessage } from './ErrorMessage';


export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DrafExpense>({
    amount: 0,
    name: '',
    category: '',
    date: new Date()
  })

  const { state, dispatch,available } = useBudget()
  const [perviusAmount,setPreviusAmount] = useState(0);
  const [error, setError] = useState('')

  useEffect(() => {
    if(state.editingId){
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPreviusAmount(editingExpense.amount)
    }
  }, [state.editingId])


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

    // Validar valores del presupuesto, que no me pase del limite 
    if ((expense.amount - perviusAmount) > available) {
      setError("El presupuesto ha sido superado")
      return
    }

    if(state.editingId){
      // Editamos un gasto
      dispatch({type:'edit-expense', payload:{expense:{id:state.editingId,...expense}}})
    }else{
      // Registrar un nuevo gasto
      dispatch({ type: 'add-expense', payload: { expense } })
    }
    // Reiniciamos nuestro state local de expense
    setExpense({
      amount: 0,
      name: '',
      category: '',
      date: new Date()
    })

    setPreviusAmount(0)
  }

  return (
    <div className="">
      <form action="" className="space-y-5 " onSubmit={handleSubmit}>

        <legend className={state.editingId?"uppercase text-center text-2xl font-black border-b-4 border-orange-500 py-2":"uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"}>
         {state.editingId?'Actualizar gasto':'Nuevo gasto'}
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
        {state.editingId?
          <input type="submit" value={'Actualizar gasto'} className="bg-orange-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
        :
          <input type="submit" value={'Registrar gasto'} className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
        }

      </form>
    </div>
  )
}