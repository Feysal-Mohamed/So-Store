
const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <label className="block mb-2 text-gray-700">Name</label>
        <input type="text" className="w-full border border-gray-300 rounded p-2 mb-4" />

        <label className="block mb-2 text-gray-700">Email</label>
        <input type="email" className="w-full border border-gray-300 rounded p-2 mb-4" />

        <label className="block mb-2 text-gray-700">Message</label>
        <textarea className="w-full border border-gray-300 rounded p-2 mb-4" rows="4"></textarea>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
