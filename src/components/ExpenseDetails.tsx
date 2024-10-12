import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import { formatDate } from "../helpers";
import { Expense } from "../types/insdex"
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import 'react-swipeable-list/dist/styles.css'

type ExpenseDetailProps = {
  expense: Expense
}

export const ExpenseDetails = ({ expense }: ExpenseDetailProps) => {

  const { id, name, amount, date, category } = expense;

  const{dispatch} = useBudget()

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === category)[0], [expense])
  
  const leadingActions = ()=>(
    <LeadingActions>
      <SwipeAction
        onClick={()=>dispatch({type:'get-expense-by-id', payload:{id:id}})}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = ()=>(
    <TrailingActions>
      <SwipeAction
        onClick={()=>dispatch({type:'delete-expense', payload:{id:id}})}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList className="m-3 rounded-lg">
      <SwipeableListItem 
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-100 flex gap-5 items-center">
          <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono de la categoria" className="w-20" />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p className="text-black text-1xl font-bold">{name}</p>
            <p className="text-slate-600 text-sm">{formatDate(date!.toString())}</p>
          </div>

          <AmountDisplay
            amount={amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>

  )
}