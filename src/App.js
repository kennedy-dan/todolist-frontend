import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import ToDoList from './pages/ToDoList';

function App() {
  return (
    <Provider store={store}>
      <ToDoList />
    </Provider>
  );
}

export default App;
