import React from "react";

const Collaborate = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Collaborate</h1>
        <p className="text-gray-600 mb-6">
          Work together with others to write and edit books in real-time. Invite
          collaborators and start creating amazing content together!
        </p>
        <div className="bg-gray-50 p-4 rounded-md shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Collaborators
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Collaborator 1</li>
            <li>Collaborator 2</li>
            <li>Collaborator 3</li>
          </ul>
        </div>
        <button className="mt-6 bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Invite Collaborators
        </button>
      </div>
    </div>
  );
};

export default Collaborate;
