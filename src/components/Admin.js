import React, { useState } from 'react';
import AdminCalendar from './AdminCalendar';

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            id="user"
            name="user"
            onChange={(event) => setUser(event.target.value)}
            value={user}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            id="user"
            name="user"
            onChange={(event) => setPass(event.target.value)}
            value={pass}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function Admin() {
  const [auth, setauth] = useState(false);

  if (!auth) {
    return <Login />;
  } else
    return (
      <div className="AdminCalendar">
        <AdminCalendar />
      </div>
    );
}

export default Admin;
