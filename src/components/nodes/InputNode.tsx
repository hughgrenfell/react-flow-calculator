'use client';

import { Handle, Position } from 'reactflow';

export default function InputNode({ data, id }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    data.onChange(id, value); // will use Zustand
  };

  return (
    <div className="p-2 bg-gray-100 border rounded text-center min-w-[100px]">
      <div className="font-semibold">Input</div>
      <input
        type="number"
        defaultValue={data.output}
        onChange={handleChange}
        className="w-full border rounded px-1 mt-1"
      />
      <Handle type="source" position={Position.Bottom} id="result" />
    </div>
  );
}
