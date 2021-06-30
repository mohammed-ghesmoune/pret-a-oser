import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
//import New from './New';
//import Edit from './Edit';
import All from './All';
import NewEdit from './NewEdit';

const Testimonial = () => {

  const match = useRouteMatch('/admin/testimonial/:param');
  const param = match ? match.params.param : null;

  const switchRoutes = (param) => {
    switch (param) {
      case 'new':
        return <Route path={`${match.url}`} component={NewEdit} />
      case 'edit':
        return <Route path={`${match.url}`} component={NewEdit} />
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

export default Testimonial
