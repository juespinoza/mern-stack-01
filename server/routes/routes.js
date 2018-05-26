const express = require('express');
const router = express.Router();
const Expense = require("../../models/Expense").Expense; // importar solo el modelo.

router.get('/', (req, res) => {
 	res.render('index')
});

router.route('/insert').post((req,res) => {
	const expense = new Expense();
	expense.description = req.body.desc;
	expense.amount = req.body.amount;
	expense.month = req.body.month;
	expense.year = req.body.year;

	expense.save((err) => {
		if(err) res.send(err);
		res.send('Expense successfully added!');
	});
});

router.route('/update').post((req, res) => {
	const doc = {
		description: req.body.description,
		amount: req.body.amount,
		month: req.body.month,
		year: req.body.year
	};
	console.log(doc);
	Expense.update({_id: req.body._id}, doc, (err, result) => {
		if(err) res.send(err);
		res.send('Expense successfully updated!');
	});
});

router.get('/delete', (req, res) => {
	let id = req.query.id;
	Expense.find({_id: id}).remove().exec((err, expense) => {
		if(err) res.send(err);
		res.send('Expense successfully deleted!');
	});
});

router.get('/getAll',(req, res) => {
	let monthRec = req.query.month;
	let yearRec = req.query.year;
	if(monthRec && monthRec != 'All') {
		Expense.find({$and: [ {month: monthRec}, {year: yearRec}]}, (err, expenses) => {
			if(err) res.send(err);
			res.json(expenses);
		});
	} else {
		Expense.find({year: yearRec}, (err, expenses) => {
			if(err) res.send(err);
			res.json(expenses);
		});
	}
});

module.exports = router;