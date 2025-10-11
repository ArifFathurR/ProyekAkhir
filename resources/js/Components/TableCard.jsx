export default function TableCard({ 
  title, 
  description, 
  headerActions, 
  filterForm,
  children,
  pagination 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Card Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          
          {/* Action Buttons */}
          {headerActions && (
            <div className="flex gap-3">
              {headerActions}
            </div>
          )}
        </div>

        {/* Filter Form */}
        {filterForm && (
          <div className="mt-4">
            {filterForm}
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {children}
      </div>

      {/* Pagination */}
      {pagination}
    </div>
  );
}