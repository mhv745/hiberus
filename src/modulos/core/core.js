import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Auth } from '../auth/auth'
import { Home } from '../home/home'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Logout } from '../auth/logout'
import { css } from '@emotion/css'
import { Spinner, SpinnerSize } from '@fluentui/react'

export const Core = () => {
  const { token, user, loading } = useAuth()

  if (loading || (!loading && (typeof token !== 'undefined') && (typeof user === 'undefined'))) {
    return <div className={css`
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    `}>
      <Spinner size={SpinnerSize.large} />
    </div>
  }

  if (token && user) {
    return <Router basename={`${process.env.REACT_APP_BASE_URL}`}>
    <Switch>
      <Route exact path="/usuarios" component={Home} />
      <Route exact path="/logout" component={Logout} />
      <Redirect to="/usuarios" />
    </Switch>
  </Router>
  }

  return <Router basename={`${process.env.REACT_APP_BASE_URL}`}>
    <Switch>
      <Route exact path="/login" component={Auth} />
      <Route path="/register/" component={Auth} />
      <Redirect to="/login" />
    </Switch>
  </Router>
}
