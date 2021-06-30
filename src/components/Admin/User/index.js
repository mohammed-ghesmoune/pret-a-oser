import React from 'react'
import { Switch , Route , useRouteMatch } from 'react-router-dom'
import New from './New';
import Edit from './Edit';
import All from './All';
//import NewEdit from './NewEdit';

const Users = () => {

  const match = useRouteMatch('/admin/user/:param');
  const param = match ? match.params.param : null;

  const switchRoutes = (param) => {
    switch (param) {
      case 'new':
        return <Route path={`${match.url}`} component={New} />
      case 'edit':
        return <Route path={`${match.url}`} component={Edit} />
      default:
        return <Route path="*" component={All}></Route>
    }
  }
  return (
    <Switch>
      {
        switchRoutes(param)
      }
    </Switch>
  )
}

export default Users
