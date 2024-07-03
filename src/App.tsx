import BudgetForm from "./components/BudgetForm"

function App() {

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-white text-center text-4xl font-black">Planificador de gastos</h1>
      </header>

      <div className="shadow-lg max-w-3xl mx-auto bg-white rounded-lg mt-10 p-10">
        <BudgetForm></BudgetForm>
      </div>
    </>
  )
}

export default App
