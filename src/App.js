import GlobalStyle from "./styles/global.js";
import RoutesApp from "./routes/index.js";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/auth.js";

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
    </>
  );
}

export default App;
