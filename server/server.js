const express = require('express');
const mongoose = require('mongoose');
const TransactionModel = require("./models/Transactions");
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors());

mongoose.connect(
    "mongodb+srv://eiqanahmed:eiqan027@expensetracker.uzqhdwd.mongodb.net/expenses?retryWrites=true&w=majority&appName=ExpenseTracker");

app.get("/getTransactions", (req, res) => {
    TransactionModel.find({}).then(function(transactions) {
        res.json(transactions);
    }).catch(function(err) {
        console.log(err);
    })
})

app.post("/createTransaction", async (req, res) => {
    const transaction = req.body;
    const newTransaction = new TransactionModel(transaction);
    await newTransaction.save();
    res.json(transaction);
})

app.delete('/deleteTransaction/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await TransactionModel.findByIdAndDelete(id);
      res.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error deleting transaction', error });
    }
  });


app.listen(3001, () => {
    console.log("Server is running");
})