import { useMemo, useState } from "react"


const BudgetForm = () => {
  
    const [budget,setBudget] = useState(0)

    const hadleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setBudget(+e.target.value)
    }

    const isValid = useMemo(()=>{
       return isNaN(budget) || budget <= 0
    },[budget])

    const hadleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      console.log('Definir presupuesto')
    }

    return (
    <>
      <form className="space-y-5" onSubmit={hadleSubmit}>
        <div className="flex space-y-5 flex-col">
            <label 
                className="text-4xl font-bold text-center text-blue-600" 
                htmlFor="budget">
               Definir Presupuesto
            </label>
            <input 
                className="w-full bg-white border border-gray-200 p-2 rounded-lg" 
                placeholder="Define tu presupuesto" 
                name="budget"
                id="budget" 
                type="number"
                value={budget}
                onChange={hadleChange}
            />
        </div>
        <input
            value="Definir presupuesto"
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-600 uppercase disabled:opacity-40"
            disabled={isValid}
        />
      </form>
    </>
  )
}

export default BudgetForm
