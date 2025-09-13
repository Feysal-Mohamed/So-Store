
const People = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example team members */}
        {["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"].map((person) => (
          <div key={person} className="bg-white shadow-md rounded-lg p-4 text-center">
            <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">{person[0]}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{person}</h3>
            <p className="text-gray-600 mt-2">Team Member</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
