import './App.css';
import { ShoppingContextProvider} from './contexts/ShoppingContext';
import Shopping from './components/shopping/shopping';

function App() {
  return (
    <div className="App">
      <ShoppingContextProvider>
        <Shopping />
      </ShoppingContextProvider>
    </div>
  );
}

export default App;
