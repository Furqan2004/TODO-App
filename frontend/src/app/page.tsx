import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
        Modern Todo App
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-lg">
        The ultimate full-stack multi-user task management solution.
        Manage your tasks securely from anywhere.
      </p>
      
      <div className="flex gap-6">
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="/signin"
          className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
