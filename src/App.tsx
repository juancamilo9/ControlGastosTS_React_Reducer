import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from './components/ExpenseModal';
import { useBudget } from "./hooks/useBudget";
import { ExpenseLists } from './components/ExpenseLists';

function App() {

  const { state } = useBudget()

  const isBudgetValid = useMemo(() => state.budget > 0, [state.budget])
  
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-white text-center text-4xl font-black">Planificador de gastos</h1>
      </header>
      
      <div className="shadow-lg max-w-3xl mx-auto bg-white rounded-lg mt-10 p-10">
        {isBudgetValid ? <BudgetTracker /> : <BudgetForm></BudgetForm>}
      </div>
      {isBudgetValid &&(
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseLists/>
          <ExpenseModal />
        </main>
      )
      }
    </>
  )
}

export default App
