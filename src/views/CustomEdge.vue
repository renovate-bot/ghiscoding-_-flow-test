<script setup lang="ts">
import { EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core';
import { computed, onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

const { removeEdges } = useVueFlow();

const path = computed(() => getBezierPath(props));
onMounted(() => console.log('CustomEdge mounted'));
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <path :id="id" :style="style" class="vue-flow__edge-path" :d="path[0]" :marker-end="markerEnd" />
  <path style="opacity: 0" stroke-width="16" fill="none" :d="path[0]" />

  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <button class="edgebutton" @click="removeEdges([id])">×</button>
    </div>
  </EdgeLabelRenderer>
</template>
