import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import { Header } from './components/Header';
import { CartPage } from './pages/CartPage';
import { Home } from './pages/HomePage';
import { ProductDetail } from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Header />

        <div className='min-h-screen bg-gray-100'>
          <div className='max-w-[1280px] mx-auto mt-[120px]'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/products/:id' component={ProductDetail} />
              <Route path='/cart' component={CartPage} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
