import {prestations} from './';


let routes = prestations.reduce(function (acc, obj) {
  if (acc.length === 0){
    acc.push({category: obj.category, title:[obj.title]})
  }else{
  let index = acc.findIndex((object)=> object.category === obj.category);
  if(index !== -1 ){
    acc[index].title.push(obj.title);
  }else{
    acc.push({category: obj.category, title:[obj.title]})
  }     
}
  return acc;
}, []);

export default routes;