import List from "./components/List/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <ToastContainer autoClose={false} />
            <List />
        </>
    );
};

export default App;
