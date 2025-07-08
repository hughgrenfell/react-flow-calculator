'use client';

import { create } from 'zustand';
import {
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
} from 'reactflow';

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  changeInputValue: (id: string, value: number) => void;
  evaluateFlow: () => void;
};

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
    get().evaluateFlow();
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
    get().evaluateFlow();
  },

  onConnect: (connection: Connection) => {
    set((state) => ({
      edges: addEdge(connection, state.edges),
    }));
    get().evaluateFlow();
  },

  changeInputValue: (id: string, value: number) => {
    set((state) => {
      const updatedNodes = state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, output: value } }
          : node
      );
      return { nodes: updatedNodes };
    });

    get().evaluateFlow();
  },

  evaluateFlow: () => {
    const { nodes, edges, setNodes } = get();

    const outputs: Record<string, number> = {};

    const inputMap: Record<string, string[]> = {};
    edges.forEach((edge) => {
      if (!inputMap[edge.target]) {
        inputMap[edge.target] = [];
      }
      inputMap[edge.target].push(edge.source);
    });

    // Topological sort
    const visited = new Set<string>();
    const sorted: string[] = [];

    const dfs = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);
      (inputMap[id] || []).forEach(dfs);
      sorted.push(id);
    };

    nodes.forEach((node) => dfs(node.id));

    const newNodes = [...nodes];

    for (const id of sorted) {
      const node = newNodes.find((n) => n.id === id);
      if (!node) continue;

      if (node.type === 'input') {
        outputs[id] = node.data.output ?? 0;
        continue;
      }

      const inputValues = edges
        .filter((e) => e.target === id)
        .map((e) => outputs[e.source] ?? 0);

      let result = 0;

      switch (node.type) {
        case 'add':
          result = (inputValues[0] ?? 0) + (inputValues[1] ?? 0);
          break;
        case 'subtract':
          result = (inputValues[0] ?? 0) - (inputValues[1] ?? 0);
          break;
        case 'multiply':
          result = (inputValues[0] ?? 0) * (inputValues[1] ?? 0);
          break;
        case 'divide':
          result =
            (inputValues[1] ?? 1) === 0
              ? Infinity
              : (inputValues[0] ?? 0) / inputValues[1];
          break;
      }

      outputs[id] = result;

      node.data = {
        ...node.data,
        inputs: inputValues,
        output: result,
      };
    }

    setNodes(newNodes);
  },
}));
