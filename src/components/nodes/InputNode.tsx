'use client';

import { Handle, Position, NodeProps } from 'reactflow';

type InputNodeData = {
  output: number;
  onChange: (id: string, value: number) => void;
};

export default function InputNode({ id, data }: NodeProps<InputNodeData>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    data.onChange(id, value);
  };

  return (
    <div className="p-2 bg-gray-200 border rounded text-center min-w-[100px]">
      <div className="font-semibold">Input</div>
      <input
        type="number"
        defaultValue={data.output ?? 0}
        onChange={handleChange}
        className="w-full border rounded px-1 mt-1"
      />
      <Handle type="source" position={Position.Bottom} id="result" />
    </div>
  );
}
