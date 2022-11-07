<script setup lang="ts">
import { ConnectionMode, type Elements, isEdge, type Node, Position, type SnapGrid, useVueFlow, VueFlow } from '@vue-flow/core';
import { Background, Controls, MiniMap } from '@vue-flow/additional-components';
import { markRaw, onMounted, ref } from 'vue';
import CustomEdge from './CustomEdge.vue';
import CustomEdge2 from './CustomEdge2.vue';

import ColorSelectorNode from './ColorSelectorNode.vue';

const elements = ref<Elements>([]);
const bgColor = ref('#7d9788');
const connectionLineStyle = { stroke: '#fff' };
const { onConnect, addEdges } = useVueFlow();

const snapGrid: SnapGrid = [16, 16];
const nodeStroke = (n: Node): string => {
  if (n.type === 'input') return '#0041d0';
  if (n.type === 'selectorNode') return bgColor.value;
  if (n.type === 'output') return '#ff0072';
  return '#eee';
};

const nodeColor = (n: Node): string => {
  if (n.type === 'selectorNode') return bgColor.value;
  return '#fff';
};

const edgeTypes = {
  custom: markRaw(CustomEdge),
};
const nodeTypes = {
  colorSelectorNode: markRaw(ColorSelectorNode),
};

const onChange = (event: Event) => {
  elements.value.forEach((e) => {
    if (isEdge(e) || e.id !== '2') return e;
    bgColor.value = (event.target as HTMLInputElement).value;
  });
};

onMounted(() => {
  elements.value = [
    {
      id: '1',
      type: 'input',
      label: 'An input node',
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right,
    },
    {
      id: '2',
      type: 'selectorNode',
      data: { onChange, color: bgColor },
      style: { border: '1px solid #777', padding: '10px' },
      position: { x: 250, y: 50 },
    },
    {
      id: '3',
      type: 'output',
      label: 'Output A',
      position: { x: 650, y: 25 },
      targetPosition: Position.Left,
    },
    {
      id: '4',
      type: 'output',
      label: 'Output B',
      position: { x: 650, y: 100 },
      targetPosition: Position.Left,
    },
    { id: 'e1-2', type: 'custom', source: '1', target: '2' },
    { id: 'e2a-3', type: 'custom2', source: '2', sourceHandle: 'a', target: '3', animated: false, style: { stroke: '#fff' } },
    { id: 'e2b-4', source: '2', sourceHandle: 'b', target: '4', animated: false, style: { stroke: '#fff' } },
  ];
});

const { onPaneReady } = useVueFlow({
  connectionMode: ConnectionMode.Loose,
  connectionLineStyle,
  snapToGrid: true,
  snapGrid,
  defaultZoom: 1.5,
});

onPaneReady((i) => {
  i.fitView();
  console.log('flow loaded:', i);
});

onConnect((params) => addEdges([params]));
</script>

<template>
  <VueFlow
    v-model="elements"
    :style="{ backgroundColor: bgColor }"
    :default-edge-options="{ type: 'smoothstep' }"
    :auto-connect="false"
    :edge-types="edgeTypes"
  >
    <template #node-selectorNode="props">
      <ColorSelectorNode v-bind="props" />
    </template>
    <template #edge-custom="props">
      <CustomEdge v-bind="props" />
    </template>
    <template #edge-custom2="props">
      <CustomEdge2 v-bind="props" />
    </template>
    <Background />
    <Controls />
    <MiniMap />
  </VueFlow>
</template>

<style lang="scss">
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.2.1/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.2.1/dist/theme-default.css';
</style>
