import mongoose from 'mongoose'

export interface IDebt extends mongoose.Document {
    reason: string;
    to: string;
    from: string;
    amount: number;
    done: boolean
    date: Date;
}

export const DebtSchema = new mongoose.Schema({
    reason: {type: String, required: true},
    to: {type: String, required: true},
    from: {type: String, required: true},
    amount: {type: Number, required: true},
    done: {type: Boolean, required: true},
    date: {type: Date, required: true}
})

const Debt = mongoose.model<IDebt>('Debt', DebtSchema, 'DebtCollection')
export default Debt;