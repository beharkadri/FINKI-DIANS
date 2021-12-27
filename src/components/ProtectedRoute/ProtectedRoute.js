import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <Route {...restOfProps}>
      {isAuthenticated ? <Component /> : <Redirect to='/hm-admin' />}
    </Route>
  );
}

export default ProtectedRoute;
