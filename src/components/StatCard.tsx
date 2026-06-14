export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="surface-card stat-card">
      <h3 className="stat-label">{title}</h3>

      <p className="stat-value">
        {value}
      </p>
    </div>
  );
}