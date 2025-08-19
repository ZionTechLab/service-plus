import React from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';

function Profile() {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <h1>Profile Page</h1>
          <p>This is the user's profile page.</p>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Profile;
