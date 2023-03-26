import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactToastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="colored"
    />
  );
};

export default ReactToastify;
