<script lang="ts" setup>
import { type CSSProperties, defineProps, ref } from 'vue';
import { Handle, Position, type Connection, type Edge, type NodeProps } from '@vue-flow/core';
import CustomHandle from './CustomHandle.vue';

interface ColorSelectorNodeProps extends NodeProps {
  data: {
    color: string;
    onChange: (event: any) => void;
  };
}

const customHandles = ref<any[]>([
  {
    id: 1,
    connectable: true,
    position: Position.Left,
    style: { top: '10px' },
    label: 'input 1',
  },
  {
    id: 2,
    connectable: true,
    position: Position.Left,
    style: { bottom: '10px', top: 'auto' },
    label: 'input 2',
  },
]);

const props = defineProps<ColorSelectorNodeProps>();
const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: '10px' };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: '10px', top: 'auto' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <Handle
    v-for="hdl in customHandles"
    :key="hdl.id"
    type="target"
    :connectable="true"
    :position="hdl.position"
    :style="hdl.style"
    :on-connect="onConnect"
  >
    <div style="font-size: 0.5rem; position: relative">
      <div style="position: absolute; left: 8px; top: -5px; width: 50px">{{ hdl.label }}</div>
    </div>
  </Handle>
  <!-- <Handle type="target" :connectable="true" :position="Position.Left" :style="targetHandleStyle" :on-connect="onConnect" /> -->

  <div style="padding-left: 10%; padding-right: 10%; border-radius: 4px">
    Custom Color Picker Node: <strong>{{ data.color }}</strong>
    <input class="nodrag" type="color" :value="data.color" @input="props.data.onChange" />
  </div>

  <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA">
    <!-- <CustomHandle style="font-size: 0.5rem; position: relative"> -->
    <div style="font-size: 0.5rem; position: relative">
      <div style="position: absolute; right: 8px; top: -5px">If</div>
    </div>
    <!-- </CustomHandle> -->
  </Handle>

  <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB">
    <CustomHandle style="font-size: 0.5rem; position: relative">
      <div style="position: absolute; right: 8px; top: -5px">Else</div>
    </CustomHandle>
  </Handle>
</template>

<style lang="scss">
.vue-flow__node {
  background-color: #fff;
}
</style>
