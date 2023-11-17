import GlobalStyle from "./styles/global.js";
import Routes from "./routes/index.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/auth.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
