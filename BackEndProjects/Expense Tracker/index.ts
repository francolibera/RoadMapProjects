import { initializeFiles, getExpenses, addExpense, addBudget, getBudgets, summarizeExpensesByCategory, summarizeExpensesByMonth, deleteExpense, sumarizeAllExpenses, deleteBudget } from "./expenseService.js";

const args = process.argv.slice(2);

function getArgValue(flagName: string): string | undefined {
  const index = args.indexOf(flagName);
  return index >= 0 ? args[index + 1] : undefined;
}

const command = args[0];

switch (command) {
  case 'init':
    initializeFiles();
    break;
  case 'list':
    const expenses = getExpenses();
    if (expenses.length === 0) {
      console.log('No expenses found.');
    } else {
      console.table(expenses);
    }
    break;
  case 'add':
    const description = getArgValue('--description');
    const amountStr = getArgValue('--amount');
    const category = getArgValue('--category');
    const amount = amountStr ? Number(amountStr) : NaN;

    if (!description || isNaN(amount) || !category) {
      console.log('Usage: pnpm expense-tracker add --description "Food" --amount 1000 --category "Food"');
    } else {
      addExpense(description, amount, category);
    }
    break;
  case 'delete':
    const idStr = getArgValue('--id');
    const id = idStr ? Number(idStr) : NaN;
    if (isNaN(id)) {
      console.log('Usage: pnpm expense-tracker delete --id 1');
    } else {
      deleteExpense(id);
    }
    break;
  case 'add-budget':
    const totalAmountStr = getArgValue('--totalAmount');
    const monthStr = getArgValue('--month');
    const yearStr = getArgValue('--year');
    const totalAmount = totalAmountStr ? Number(totalAmountStr) : NaN;
    const month = monthStr ? Number(monthStr) : NaN;
    const year = yearStr ? Number(yearStr) : NaN;
    if (isNaN(totalAmount) || isNaN(month) || isNaN(year)) {
      console.log('Usage: pnpm expense-tracker add-budget --totalAmount 5000 --month 6 --year 2024');
    } else {
      addBudget(totalAmount, month, year);
    }
    break;
  case 'get-budgets':
    const budgets = getBudgets();
    if (budgets.length === 0) {
      console.log('No budgets found.');
    } else {
      console.table(budgets);
    }
    break;
  case 'summarize-by-category':
    summarizeExpensesByCategory();
    break;
  case 'summarize-by-month':
    summarizeExpensesByMonth();
    break;
  case 'summarize-all':
    sumarizeAllExpenses();
    break;
  case 'delete-budget':
    const budgetIdStr = getArgValue('--id');
    const budgetId = budgetIdStr ? Number(budgetIdStr) : NaN;
    if (isNaN(budgetId)) {
      console.log('Usage: pnpm expense-tracker delete-budget --id 1');
    } else {
      deleteBudget(budgetId);
    }
    break;
  default:
    console.log('Unknown command. Available commands: init, list, add');
    break;
}
