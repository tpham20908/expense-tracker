const router = require("express").Router();

const Expense = require("../models/expense");

router.route("/").get((req, res) => {
  Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const { amount, description } = req.body;
  const date = Date.parse(req.body.date);

  const newExpense = new Expense({ amount, date, description });

  newExpense
    .save()
    .then(() => res.json("Expense added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json("Expense deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Expense.findById(req.params.id)
    .then(expense => {
      expense.amount = req.body.amount;
      expense.date = Date.parse(req.body.date);
      expense.description = req.body.description;

      expense
        .save()
        .then(() => res.json("Expense updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
