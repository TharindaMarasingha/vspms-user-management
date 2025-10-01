function Sidebar() {
  const items = ['Dashboard','Users','Parts Inventory','Orders','Suppliers','Reports','Settings']
  return (
    <aside className="bg-white border-r border-black/5 p-4 space-y-1">
      {items.map(i => (
        <button key={i} className="w-full text-left px-3 py-2 rounded-md hover:bg-softgray">{i}</button>
      ))}
    </aside>
  )
}

function StatCard({ title, value, tone='soft' }) {
  const toneMap = {
    soft: 'bg-softgray',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning'
  }[tone]
  return (
    <div className={`rounded-xl p-4 ${toneMap}`}>
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

export default function Admin() {
  return (
    <div className="grid grid-cols-12 min-h-[70vh]">
      <div className="col-span-3 lg:col-span-2"><Sidebar /></div>
      <div className="col-span-9 lg:col-span-10 p-6 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Orders" value="1,284" tone="soft" />
          <StatCard title="Revenue" value="$82,430" tone="success" />
          <StatCard title="Low Stock" value="12" tone="warning" />
          <StatCard title="Pending Deliveries" value="7" tone="soft" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="font-medium mb-2">Sales (Last 30 days)</div>
            <div className="h-40 bg-softgray rounded-lg"></div>
          </div>
          <div className="card p-4">
            <div className="font-medium mb-2">Stock by Category</div>
            <div className="h-40 bg-softgray rounded-lg"></div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">Recent Orders</div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md bg-softgray">Export CSV</button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-coolgray">
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({length:6}, (_,i)=> (
                  <tr key={i} className="border-t hover:bg-softgray">
                    <td className="py-2 pr-4">#10{i+1}</td>
                    <td className="py-2 pr-4">Jane Doe</td>
                    <td className="py-2 pr-4"><span className={`px-2 py-1 rounded-full text-xs ${['bg-warning/10 text-warning','bg-success/10 text-success','bg-softgray'][i%3]}`}>{['Pending','Approved','Delivered'][i%3]}</span></td>
                    <td className="py-2 pr-4">$129.00</td>
                    <td className="py-2 pr-4 space-x-2">
                      <button className="px-2 py-1 rounded-md bg-white border">Edit</button>
                      <button className="px-2 py-1 rounded-md bg-white border">Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

