import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen w-screen bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink opacity-1000"></div>


      {/* Header */}
      <header className="absolute top-8 left-0 right-0 ml-8 w-96 bg-gray-800 shadow-lg rounded-lg font-mono">
  <div className="container mx-auto px-4 py-6">
    <div className="flex justify-center">
      <h1 className="text-6xl font-bold text-white">Boom Blogs</h1>
    </div>
  </div>
</header>




      {/* Main Content */}
      <main className="relative z-10 flex items-center h-full">
        {/* Blog Post Cards */}
        <div className="max-w-6xl m-8">
          {/* Example Blog Post Card */}
          <div className="bg-gray-800  rounded-lg p-4 shadow-md flex justify-center items-center font-mono">
            <img src="./src/assets/file.png" alt="Blog Post" className="w-96 h-96 object-cover rounded-xl " />
            <div className="p-6">
            <h2 className="text-4xl font-bold text-white">Create Blogs at</h2>
            <h2 className="text-4xl font-bold text-white">Booming speeds!</h2>
            </div>

          </div>
          {/* Repeat this card structure for other blog posts */}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full bg-gray-800 text-white text-center py-2">
        <div className="container mx-auto">
          <p>&copy; 2024 BoomBlogs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;


