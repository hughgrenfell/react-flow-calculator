'use client';

import { Handle, Position } from 'reactflow';

export default function SubtractNode({ data }: any) {
  const [a = 0, b = 0] = data.inputs || [];
  const result = a - b;

  return (
    <div className="p-2 bg-red-100 border rounded text-center min-w-[100px]">
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
      <div className="font-semibold">Subtract</div>
      <div>{a} − {b} = <strong>{result}</strong></div>
      <Handle type="source" position={Position.Bottom} id="result" />
    </div>
  );
}
