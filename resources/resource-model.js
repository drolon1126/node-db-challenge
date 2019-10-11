const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('resources');
}

function findById(id) {
  return db('resources')
    .where({ id })
    .first()
    .then(resource=>{
      if(!resource){
        return null;
      } else {
        return resource;
      }
    });
}

function add(resource) {
  return db('resources')
    .insert(resource)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('resources')
    .where({ id })
    .update(changes)
    .then( ()=>{
      return findById(id);
    });
}

function remove(id) {
  let resource = findById(id);
  return db('resources')
    .where({id})
    .del()
    .then(res=>{
      if(res){
        return resource;
      } else{
        return null;
      }
    });
}