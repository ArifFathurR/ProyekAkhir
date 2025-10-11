export default function StatsCard({ title, value, icon, gradientFrom, gradientTo, iconBgColor }) {
  return (
    <div className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${gradientFrom.split('-')[0]}-100 text-sm font-medium`}>{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`bg-${iconBgColor} bg-opacity-50 rounded-full p-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
}