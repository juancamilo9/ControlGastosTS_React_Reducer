import { ChangeEvent } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
const FilterByCategory = () => {

    const { dispatch } = useBudget()

    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        dispatch({type:'search-category',payload:{category:e.target.value}})
    }

    return (
        <div className="bg-white shadow-lg p-10">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtar gastos</label>
                    <select
                        onChange={handleChange}
                        id="category"
                        className="bg-slate-100 p-3 flex-3 rounded">
                        <option value=""> -- Todas lascatrgorías -- </option>
                        {categories.map(category =>
                            <option value={category.id} key={category.id}>{category.name}</option>
                        )}
                    </select>
                </div>
            </form>
        </div>
    )
}

export default FilterByCategory
