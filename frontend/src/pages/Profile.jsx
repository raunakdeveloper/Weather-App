import React from 'react';
import { getStoredUser } from '../utils/localStorage';

const Profile = () => {
  const storedUser = getStoredUser();

  if (!storedUser) {
    return <div className="text-center text-red-500">User not found</div>;
  }

  const { name, email } = storedUser.user;

  return (
    <div className="mt-4 max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
            <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
            <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
