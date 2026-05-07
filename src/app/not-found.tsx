import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-4">
        404
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        页面不存在，或者已被删除。
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md"
      >
        回到首页
      </Link>
    </div>
  );
}
