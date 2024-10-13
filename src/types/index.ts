export type Expense ={
    id:string
    amount:number
    name:string
    category:string
    date:Value
}

export type DrafExpense = Omit<Expense, 'id'>

export type Category = {
    id:string
    name:string
    icon:string
}

export type ValuePiece = Date | null;
export  type Value = ValuePiece | [ValuePiece, ValuePiece];
