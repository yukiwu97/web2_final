const router = require('express').Router();
let Record = require('../models/record.model');

router.route('/add').post((req, res) => {
    console.log('add called!!');
    var recordData = new Record(req.body); 
    recordData.year = recordData.date.getFullYear();
    recordData.month = recordData.date.getMonth() + 1;
    console.log(recordData);
    recordData.save()
        .then(() => res.json('Record added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  console.log('update called!!')
  const newData = new Record(req.body);
  console.log(newData);
  const newRecord = {
    date: newData.date,
    amount: newData.amount,
    category: newData.category,
    notes: newData.notes,
    year: newData.date.getFullYear(),
    month: newData.date.getMonth() + 1
  }
  Record.updateOne({_id: req.params.id}, newRecord)
    .then(() => res.json("Record modified!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    console.log("get all called!!")
    Record.find()
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/yearMonth/:year/:month').get((req, res) => {
    console.log("get by year month called!!")
    var findParam = {};
    const yearToFind = parseInt(req.params.year);
    if (yearToFind != 0) {
      findParam.year = yearToFind;
    }
    const monthToFind = parseInt(req.params.month);
    if (monthToFind != 0) {
      findParam.month = monthToFind;
    }
    console.log('findParam is: ' + findParam.year + ', ' + findParam.month)
    Record.find(findParam)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Record.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').get((req, res) => {
    console.log('delete called!!');
    Record.findByIdAndDelete(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;