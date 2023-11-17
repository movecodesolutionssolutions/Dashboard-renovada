import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoutes = ({ role, ...rest }) => {
  const { userLogged } = useAuth();

  if (!userLogged()) {
    return <Redirect to="/"/>
  }
  if (!role && userLogged()) {
    return (<Route {...rest} />)
  }

};

export default PrivateRoutes;
