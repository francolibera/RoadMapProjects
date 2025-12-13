import { initializeFiles, getExpenses, addExpense } from "./expenseService.js";

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
  default:
    console.log('Unknown command. Available commands: init, list, add');
    break;
}
