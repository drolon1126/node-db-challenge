const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findTasks,
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

function findTasks(id){
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .where( 'p.id', id)
    .select('t.id','t.description as taskName', 't.notes','p.name as projectName', 'p.description as projectDesc');
}

function findTaskById(id) {
  return db('tasks')
    .where({ id })
    .first()
    .then(task=>{
      if(!task){
        return null;
      } else {
        return task;
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

function addTask(task,id) {
  let tD = task;
  tD.project_id = id;
  return db('tasks')
    .insert(tD)
    .then(ids => {
      return findTaskById(ids[0]);
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