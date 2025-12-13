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

export const getBudgets = (): budget[] => {
  initializeFiles();
  const data = fs.readFileSync('budgets.json', 'utf-8');
  return JSON.parse(data) as budget[];
};

export const addBudget = (totalAmount: number, month: number, year: number): void => {
  const budgets = getBudgets();
  const newBudget: budget = {
    id: (budgets[budgets.length - 1]?.id ?? 0) + 1,
    totalAmount,
    month,
    year,
  };
  budgets.push(newBudget);
  fs.writeFileSync('budgets.json', JSON.stringify(budgets, null, 2));
  console.log(`Budget added successfully: $${totalAmount} for ${month}/${year}`);
}

export const getExpensesByCategory = (category: string): expense[] => {
  const expenses = getExpenses();
  return expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase());
};

export const getExpensesByMonth = (month: number, year: number): expense[] => {
  const expenses = getExpenses();
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
  });
};

export const summarizeExpensesByCategory = (): void => {
  const expenses = getExpenses();
  const summary: { [key: string]: number } = {};
  expenses.forEach(expense => {
    if (!summary[expense.category]) {
      summary[expense.category] = 0;
    }
    summary[expense.category] += expense.amount;
  });
  console.log("Expense Summary by Category:");
  for (const category in summary) {
    console.log(`- ${category}: $${summary[category]}`);
  }
}

export const summarizeExpensesByMonth = (): void => {
  const expenses = getExpenses();
  const summary: { [key: string]: number } = {};
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!summary[monthYear]) {
      summary[monthYear] = 0;
    }
    summary[monthYear] += expense.amount;
  });
  console.log("Expense Summary by Month:");
  for (const monthYear in summary) {
    console.log(`- ${monthYear}: $${summary[monthYear]}`);
  }
}