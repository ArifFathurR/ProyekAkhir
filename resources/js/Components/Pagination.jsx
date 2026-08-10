import { Link } from '@inertiajs/react';

export default function Pagination({ data }) {
  if (!data?.links || data.links.length <= 3) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Menampilkan <span className="font-medium">{data.from || 0}</span> sampai{' '}
          <span className="font-medium">{data.to || 0}</span> dari{' '}
          <span className="font-medium">{data.total || 0}</span> data
        </div>
        <nav className="flex space-x-2">
          {data.links.map((link, index) =>
            link.url ? (
              <Link
                key={index}
                href={link.url}
                preserveState
                preserveScroll
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  link.active
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ) : (
              <span
                key={index}
                className="px-3 py-2 text-sm font-medium rounded-md text-gray-400 border border-gray-200 cursor-not-allowed"
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )
          )}
        </nav>
      </div>
    </div>
  );
}