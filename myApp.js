require('dotenv').config();

// #1 
let mongoose = require('mongoose');     // Create Mongoose requirement
const mySecret = process.env['MONGO_URI'] // Access URI
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology : true});  // Connect to database

// #2
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

// # 3

const createAndSavePerson = (done) => {
  let harryWhyte = new Person({name: "Harry Whyte", age: 23, favoriteFoods: ['Cheese']})

  harryWhyte.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  })
};


// #4 

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null,people)}
)};

// # 5

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound)
  }) 
};

// # 6
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : [food]}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound)
  })
};

// #7
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound)
  })
};

// #8
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err,personFound) {
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
}

// #9
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, function(err, updatedDoc) {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })};

// #10
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id : personId}, function(err, updatedDoc) {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

// #11
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, function(err, updatedDoc) { 
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

// #12
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch})
  .sort({name : 1})
  .limit(2)
  .select({age : 0})
  .exec(function(err, data){
    if(err) return console.log(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
