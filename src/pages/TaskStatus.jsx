export default function TaskStatus() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <h2 className="text-3xl font-bold mb-6 text-center">Task Status</h2>
      <div className="text-center space-y-4">
        <p className="text-xl">Status: <span className="font-semibold text-yellow-300">In Progress</span></p>
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
          Mark as Completed
        </button>
      </div>
    </div>
  );
}
