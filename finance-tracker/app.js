// This is the entrypoint for your application.
// node app.js

import {
    addTransaction,
    printAllTransactions,
    printSummary,
} from './finance.js'

const newTransaction = {
    id: 6,
    type: 'income',
    category: 'freelance',
    amount: 500,
    description: 'Freelance project',
    date: '2025-01-20',
}

addTransaction(newTransaction)

// Display all transactions
printAllTransactions()

// Display financial summary
printSummary()
