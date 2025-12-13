# Expense Tracker

## Overview

The Expense Tracker is a simple command-line application that helps you manage your expenses efficiently. You can add, list, and categorize your expenses, making it easier to keep track of your spending habits.

## Features

- Add new expenses with descriptions, amounts, and categories.
- List all recorded expenses.
- Filter expenses by category.

## Installation

To get started with the Expense Tracker, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Expense Tracker
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```

## Commands

Here are the available commands you can use with the Expense Tracker:

### 1. Add Expense

To add a new expense, use the following command:

```bash
pnpm expense-tracker add --description "<description>" --amount <amount> --category "<category>"
```

**Example:**

```bash
pnpm expense-tracker add --description "Food" --amount 1000 --category "Meals"
```

### 2. List Expenses

To list all your expenses, run:

```bash
pnpm expense-tracker list
```

### 3. Filter by Category

To filter expenses by a specific category, use:

```bash
pnpm expense-tracker list --category "<category>"
```

**Example:**

```bash
pnpm expense-tracker list --category "Meals"
```

## Usage

After setting up the application, you can start adding your expenses and managing them through the command line. The application will help you keep track of your spending and categorize your expenses for better financial management.

## Contributing

If you would like to contribute to the Expense Tracker, feel free to submit a pull request or open an issue for discussion.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy tracking!
