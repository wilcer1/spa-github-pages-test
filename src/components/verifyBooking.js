import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function VerifyBooking() {
  return (
    <GoogleOAuthProvider clientId="916587672516-pib163h8ridhcoknethuiq0l3d3ahbc6.apps.googleusercontent.com">
      ...;
      <div className="VerifyBooking">
        <h1>Testing</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse, credentialResponse);
            localStorage.setItem('Token', 'hey');
          }}
          onError={(error) => {
            console.log('Login Failed', error);
          }}
        />
        ;
      </div>
    </GoogleOAuthProvider>
  );
}

export default VerifyBooking;
