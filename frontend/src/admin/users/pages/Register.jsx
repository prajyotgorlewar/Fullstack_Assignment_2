import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [error, setError] = useState(null); // Add error state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true when submitting
    setError(null); // Clear any previous errors

    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        // Optionally, you can handle the response here (e.g., display a success message)
    } catch (error) {
        console.error('Error during registration:', error);
        setError(error.message || 'An error occurred');
    } finally {
        setIsLoading(false); // Set isLoading back to false after submission
    }
};


  return (
    <div className="min-h-screen bg-pink w-full">
      <div className="bg-gray-800 p-8 w-96 ml-auto mr-auto mt-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
