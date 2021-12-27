import './App.css';
import Headers from './components/Headers';
import UserList from './components/UserList';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EditUser from './components/EditUser';

function App() {
  return (
    <div>
      <Headers />
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={<UserList />}>
          </Route>
          <Route
            path="/EditUser/:userId"
            element={<EditUser />}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
