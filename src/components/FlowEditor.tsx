'use client';

import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowInstance,
  Background,
  Controls,
  MiniMap,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import AddNode from './nodes/AddNode';
import SubtractNode from './nodes/SubtractNode';
import MultiplyNode from './nodes/MultiplyNode';
import DivideNode from './nodes/DivideNode';
import InputNode from './nodes/InputNode';

import { useFlowStore } from '@/lib/flowStore';

// ✅ Local types
type InputNodeData = {
  output: number;
  onChange: (id: string, value: number) => void;
};

type OperatorNodeData = {
  inputs: number[];
  output: number;
};

type CustomNodeData = InputNodeData | OperatorNodeData;

const nodeTypes = {
  add: AddNode,
  subtract: SubtractNode,
  multiply: MultiplyNode,
  divide: DivideNode,
  input: InputNode,
};

export default function FlowEditor() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    changeInputValue,
  } = useFlowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowWrapper.current || !reactFlowInstance.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.current.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      let data: CustomNodeData;

      if (type === 'input') {
        data = {
          output: 0,
          onChange: changeInputValue,
        };
      } else {
        data = {
          inputs: [0, 0],
          output: 0,
        };
      }

      const newNode: Node<CustomNodeData> = {
        id: `${+new Date()}`,
        type,
        position,
        data,
      };

      addNode(newNode);
    },
    [addNode, changeInputValue]
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="flex-grow relative bg-white h-screen"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => (reactFlowInstance.current = instance)}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
