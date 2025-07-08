'use client';

const nodeTypes = ['input', 'add', 'subtract', 'multiply', 'divide'];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="p-4 bg-gray-100 border-r w-40 space-y-2">
      <div className="font-bold mb-2">Node Types</div>
      {nodeTypes.map((type) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          className="p-2 bg-white border rounded cursor-move text-center capitalize"
        >
          {type}
        </div>
      ))}
    </aside>
  );
}
