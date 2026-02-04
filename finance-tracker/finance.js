import chalk from 'chalk'
const { bold, green, red, yellow, cyan } = chalk
import transactions from './data.js'

// Add a new transaction. Create a shallow copy using the spread
// operator so the original object passed in isn't mutated by reference.
function addTransaction(transaction) {
    transactions.push({ ...transaction })
}

function getTotalIncome() {
    let totalIncome = 0
    // Use for...of and object destructuring for clarity
    for (const transactionItem of transactions) {
        const { type, amount } = transactionItem
        if (type === 'income') {
            totalIncome += amount
        }
    }
    return totalIncome
}

function getTotalExpenses() {
    let totalExpenses = 0
    // for...of loop with destructuring improves readability
    for (const transactionItem of transactions) {
        const { type, amount } = transactionItem
        if (type === 'expense') {
            totalExpenses += amount
        }
    }
    return totalExpenses
}

function getBalance() {
    return getTotalIncome() - getTotalExpenses()
}

function getTransactionsByCategory(category) {
    const filteredTransactions = []
    // Use for...of and destructuring to collect matching entries
    for (const transactionItem of transactions) {
        const { category: transactionCategory } = transactionItem
        if (transactionCategory === category) {
            filteredTransactions.push(transactionItem)
        }
    }
    return filteredTransactions
}

function getLargestExpense() {
    let largestAmount = 0
    // Iterate with destructuring to find the maximum expense amount
    for (const transactionItem of transactions) {
        const { type, amount } = transactionItem
        if (type === 'expense' && amount > largestAmount) {
            largestAmount = amount
        }
    }
    return largestAmount
}

function printAllTransactions() {
    console.log(bold('💰 PERSONAL FINANCE TRACKER 💰\n'))
    console.log(bold('All Transactions:'))
    // Use for...of for clearer iteration
    for (const transactionItem of transactions) {
        const { id, type, description, amount, category } = transactionItem
        const typeDisplay = type.toUpperCase()
        const amountColor = type === 'income' ? green : red
        const categoryColor = yellow
        console.log(
            `${id}. [${typeDisplay}] ${description} - ${amountColor(`€${amount}`)} (${categoryColor(category)})`
        )
    }
    console.log()
}

function printSummary() {
    const totalIncome = getTotalIncome()
    const totalExpenses = getTotalExpenses()
    const balance = getBalance()
    const largestExpenseAmount = getLargestExpense()

    // Find the largest expense transaction's description. We iterate
    // and compare amounts; stop early when we find the matching entry.
    let largestExpenseDescription = 'N/A'
    for (const transactionItem of transactions) {
        const { type, amount, description } = transactionItem
        if (type === 'expense' && amount === largestExpenseAmount) {
            largestExpenseDescription = description
            break
        }
    }

    const balanceColor = balance >= 0 ? cyan : red

    console.log(bold('📊 FINANCIAL SUMMARY 📊'))
    console.log(bold(`Total Income: ${green(`€${totalIncome}`)}`))
    console.log(bold(`Total Expenses: ${red(`€${totalExpenses}`)}`))
    console.log(bold(`Current Balance: ${balanceColor(`€${balance}`)}`))
    console.log(
        `\nLargest Expense: ${largestExpenseDescription} (${red(`€${largestExpenseAmount}`)})`
    )
    console.log(bold(`Total Transactions: ${transactions.length}`))
}

export {
    addTransaction,
    getTotalIncome,
    getTotalExpenses,
    getBalance,
    getTransactionsByCategory,
    getLargestExpense,
    printAllTransactions,
    printSummary,
}
