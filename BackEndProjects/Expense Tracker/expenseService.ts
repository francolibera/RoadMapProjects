import * as fs from 'fs';
import { expense, budget } from './expenseInterface';

export function initializeFiles(): void {
  if (!fs.existsSync('expenses.json')) {
    fs.writeFileSync('expenses.json', '[]');
  }
  if (!fs.existsSync('budgets.json')) {
    fs.writeFileSync('budgets.json', '[]');
  } 
}

export const getExpenses = (): expense[] => {
  initializeFiles();
  const data = fs.readFileSync('expenses.json', 'utf-8');
  return JSON.parse(data) as expense[];
};

export const addExpense = (description: string, amount: number, category:string): void => {
  const expenses = getExpenses();
  const newExpense: expense = {
    id: (expenses[expenses.length - 1]?.id ?? 0) + 1,
    amount,
    description,
    category,
    date: new Date(),
  };
  expenses.push(newExpense);
  fs.writeFileSync('expenses.json', JSON.stringify(expenses, null, 2));
  console.log(`Expense added successfully: ${description} - $${amount}`);
}