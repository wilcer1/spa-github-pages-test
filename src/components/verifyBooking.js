import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
};

function VerifyBooking() {
  return (
    <div className="VerifyBooking">
      <h1>Testing</h1>
      <GoogleLogin
        clientId="310046150503-9oopaeieiv9p6l5t7qmiitev0jugfuvu.apps.googleusercontent.com"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Verify booking with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default VerifyBooking;
