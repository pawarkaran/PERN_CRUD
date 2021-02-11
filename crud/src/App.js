import './App.css';
import View from './Crud_App/views/View';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { DataAPI } from './DataProvider/DataAPI';
import EditTodo from './Crud_App/views/EditTodo';

function App() {
  return (
    <div className="App">
      <DataAPI>

        <Router>

          <Switch>

          <Route exact path="/" name="home" component={View} />

          <Route exact path="/:id" name="home" component={EditTodo} />

          </Switch>

        </Router>

      </DataAPI>
    </div>
  );
}

export default App;
