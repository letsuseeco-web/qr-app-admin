// components/ui/Table.jsx
export default function Table({ columns, data }) {
  return (
    <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm">

      <thead className="bg-gray-100 text-left text-sm text-gray-500">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-3">{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">

            {Object.values(row).map((cell, idx) => (
              <td key={idx} className="p-3">{cell}</td>
            ))}

          </tr>
        ))}
      </tbody>

    </table>
  );
}