import * as localforage from 'localforage';
import {uid} from '../functions';

class Store {

  constructor(storeName) {
    this.store = localforage.createInstance({
      name: process.env.REACT_APP_DB_NAME,
      storeName: storeName
    })
  }

  // register / update 
  add(data) {
    data = {
      ...data,
      id: data.id || uid(),
      createdAt: data.createdAt || (new Date()).toLocaleDateString(),
      updatedAt: (new Date()).toLocaleDateString()
    }
    return this.store.setItem(data.id, data)
  }
  
  findAll() {
    let data = [];
    return this.store.keys().then(keys =>{
      for (let key of keys) {
        data.push(this.store.getItem(key))
      }
     return  Promise.all(data)

    })
  }
  
  findBy(type,value) {
    return this.findAll().then(result => {
      return result.filter(item => item[type] === value )
    })
  }

  findOneBy(type,value) {
    return this.findBy(type,value).then(result => result[0])
  }

  delete(id) {
     return this.store.removeItem(id)
  }

  findOneById(id) {
    return  this.store.getItem(id)
  }

  serviceWorkerAdd(data){
    return this.store.setItem(data.id, data)
  }
}

export default Store;