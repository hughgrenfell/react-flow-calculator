'use client';

import { Handle, Position, NodeProps } from 'reactflow';

type OperatorNodeData = {
  inputs: number[];
  output: number;
};

export default function SubtractNode({ data }: NodeProps<OperatorNodeData>) {
  return (
    <div className="p-2 bg-yellow-100 border rounded text-center min-w-[100px]">
      <div className="font-semibold">−</div>
      <div className="text-sm">
        {data.inputs?.[0] ?? 0} − {data.inputs?.[1] ?? 0} = {data.output}
      </div>
      <Handle type="target" position={Position.Top} id="input" />
      <Handle type="source" position={Position.Bottom} id="result" />
    </div>
  );
}