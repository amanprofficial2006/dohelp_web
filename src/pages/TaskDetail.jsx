import { useParams } from "react-router-dom";
import tasks from "../data/tasks";

export default function TaskDetail() {
  const { id } = useParams();
  const task = tasks.find(t => t.id === Number(id));

  if (!task) return <div className="max-w-2xl mx-auto mt-8 p-6 text-center"><p className="text-xl">Task not found</p></div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <div className="space-y-3 mb-6">
        <p className="text-lg">{task.description}</p>
        <p className="text-sm opacity-80">{task.location}</p>
        <p className="text-2xl font-bold text-cyan-300">₹{task.price}</p>
      </div>
      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
        Accept Task
      </button>
    </div>
  );
}
