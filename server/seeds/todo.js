
exports.seed = function (knex, Promise) {
  return knex('todo').del() // remove all the rows in the todo table
    .then(function () {
      const todos = [{
        title: 'Build a CRUD App',
        priority: 1,
        date: new Date()
      }, {
        title: 'Buy a table cover',
        priority: 3,
        date: new Date()
      }, {
        title: 'Go to the Lidl',
        priority: 2,
        date: new Date()
      }, {
        title: 'Buy a table cover',
        priority: 3,
        date: new Date()
      }, {
        title: 'Buy a table cover',
        priority: 3,
        date: new Date()
      }, {
        title: 'Buy a table cover',
        priority: 3,
        date: new Date()
      }]
  return knex('todo').insert(todos); // now insert them
});
};
