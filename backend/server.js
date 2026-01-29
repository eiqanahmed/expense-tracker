// const express = require('express');
// const mongoose = require('mongoose');
// const TransactionModel = require("./models/Transactions");
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// const allowedOrigins = [
//   "https://expense-tracker-frontend-pi.vercel.app",
//   "http://localhost:3000",
// ];

// app.use(cors({
//   origin: (origin, cb) => {
//     if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//     return cb(new Error("Not allowed by CORS"));
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json())
// app.use(cors());

// mongoose.connect(process.env.MONGODB_URI);


// app.get('/', (req, res) => {
//   res.send('Welcome to the Expense Tracker API');
// });

// app.get("/getTransactions", (req, res) => {
//     TransactionModel.find({}).then(function(transactions) {
//         res.json(transactions);
//     }).catch(function(err) {
//         console.log(err);
//     })
// })

// app.post("/createTransaction", async (req, res) => {
//     const transaction = req.body;
//     const newTransaction = new TransactionModel(transaction);
//     await newTransaction.save();
//     res.json(transaction);
// })

// app.delete('/deleteTransaction/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       await TransactionModel.findByIdAndDelete(id);
//       res.status(200).send({ message: 'Transaction deleted successfully' });
//     } catch (error) {
//       res.status(500).send({ message: 'Error deleting transaction', error });
//     }
//   });


// app.listen(3001, () => {
//     console.log("Server is running");
// })

const express = require("express");
const mongoose = require("mongoose");
const TransactionModel = require("./models/Transactions");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://expense-tracker-frontend-pi.vercel.app",
  "http://localhost:3000",
];

app.use(express.json());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow Postman / server-to-server
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

app.get("/getTransactions", async (req, res) => {
  try {
    const transactions = await TransactionModel.find({});
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

app.post("/createTransaction", async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    const saved = await newTransaction.save();
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating transaction" });
  }
});

app.delete("/deleteTransaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TransactionModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting transaction", error });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});

