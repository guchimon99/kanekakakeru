import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Provider as WalletProvider } from '../hooks/wallet'

import Work from './Work'
import Bet from './Bet'

const App = () => (
  <WalletProvider>
    <Router>
      <Switch>
        <Route path="/work" exact component={Work} />
        <Route path="/bet" exact component={Bet} />
        <Redirect to="/work" />
      </Switch>
    </Router>
  </WalletProvider>
)

export default App
