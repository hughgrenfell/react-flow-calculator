'use client';

import { Handle, Position } from 'reactflow';

export default function DivideNode({ data }: any) {
  const [a = 0, b = 1] = data.inputs || [];
  const result = b !== 0 ? a / b : '∞';

  return (
    <div className="p-2 bg-yellow-100 border rounded text-center min-w-[100px]">
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
      <div className="font-semibold">Divide</div>
      <div>{a} ÷ {b} = <strong>{result}</strong></div>
      <Handle type="source" position={Position.Bottom} id="result" />
    </div>
  );
}
