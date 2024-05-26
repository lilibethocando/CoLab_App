import './App.css';
import { FirstComponent } from './components/FirstComponent';
import { SecondComponent } from './components/SecondComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>React</p>

      <FirstComponent/> 
      <SecondComponent />
      </header>
      
    </div>
  );
}

export default App;
