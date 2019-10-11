const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  addTask,
  update,
  remove,
};

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
    .where({ id })
    .first()
    .then(project=>{
      if(!project){
        return null;
      } else {
        return project;
      }
    });
}

function add(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return findById(ids[0]);
    });
}

function addTask(task) {
  return db('tasks')
    .insert(task)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('projects')
    .where({ id })
    .update(changes)
    .then( ()=>{
      return findById(id);
    });
}

function remove(id) {
  let project = findById(id);
  return db('projects')
    .where({id})
    .del()
    .then(res=>{
      if(res){
        return project;
      } else{
        return null;
      }
    });
}