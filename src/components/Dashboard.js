import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { firebaseAuth } from '../config'
import Form from './Form';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div class="border-bottom">
        <h1>Welcome</h1>
        <p>This is the dashboard, if you can see this you're logged in.</p>
        <button onClick={() => firebaseAuth().signOut()}>Sign out</button>
      </div>
      <Form />
    </div>
  );
};

export default Dashboard;