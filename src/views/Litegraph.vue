<script setup lang="ts">
import lg, { LGraph, LiteGraph, LGraphCanvas, LGraphNode } from 'litegraph.js';
import { onMounted } from 'vue';
// import * as glMatrix from 'gl-matrix';

//https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
// plugin - macro
interface Param {
  name: string;
  type: string;
  index: number;
}
interface Node {
  id: number;
  name: string;
  params: Param[];
  pos: [number, number];
  type: string; // this need to be a specific type like basic/sum, need to find out how to create a custom
}
interface Link {
  id: number;
  sourceId: number;
  sourceIndex: number;
  targetId: number;
  targetIndex: number;

  source?: lg.LGraphNode;
  target?: lg.LGraphNode;
}
interface Graph {
  nodes: Node[];
  links: Link[];
}

class Test extends LGraphNode {
  constructor() {
    super();
    this.title = 'Multiplication';
    this.properties = { precision: 0.1 };
  }
  override onExecute() {
    // console.log('ttttttttt')
    let A = this.getInputData(0);
    if (A === undefined) A = 0;
    let B = this.getInputData(1);
    if (B === undefined) B = 0;
    this.setOutputData(0, A + B);
  }

  // https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
  override onConnectInput(
    inputIndex: number,
    outputType: lg.INodeOutputSlot['type'],
    outputSlot: lg.INodeOutputSlot,
    outputNode: LGraphNode,
    outputIndex: number
  ): boolean {
    console.log('connect input', inputIndex, outputType, outputSlot, outputNode, outputIndex);
    return true;
  }

  override onConnectOutput?(
    outputIndex: number,
    inputType: lg.INodeInputSlot['type'],
    inputSlot: lg.INodeInputSlot,
    inputNode: LGraphNode,
    inputIndex: number
  ): boolean {
    console.log('connect output', inputIndex, inputType, inputSlot, inputNode, outputIndex);
    return true;
  }
}

let graph!: LGraph;
let canvas!: LGraphCanvas;

// // @ts-ignore
// (globalThis as any).lgMatrix = glMatrix.glMatrix;
// // @ts-ignore
// console.log(window, global);

onMounted(() => {
  const data: Graph = {
    nodes: [
      {
        id: 0,
        name: 'First Node',
        pos: [100, 100],
        type: 'basic/sum',
        params: [
          {
            name: 'Aa',
            type: 'number',
            index: 0,
          },
          {
            name: 'Bb',
            type: 'number',
            index: 0,
          },
          {
            name: 'Cc',
            type: 'number',
            index: 0,
          },
        ],
      },
      {
        id: 1,
        name: 'Second Node',
        pos: [250, 250],
        type: 'basic/sum',
        params: [
          {
            name: 'Bb',
            type: 'number',
            index: 0,
          },
          {
            name: 'Cc',
            type: 'number',
            index: 0,
          },
        ],
      },
      {
        id: 2,
        name: 'Third Node',
        pos: [500, 500],
        type: 'basic/sum',
        params: [
          {
            name: 'Aa',
            type: 'number',
            index: 0,
          },
          {
            name: 'Cc',
            type: 'number',
            index: 0,
          },
        ],
      },
    ],
    links: [
      {
        id: 0,
        sourceId: 0,
        sourceIndex: 1,
        targetId: 1,
        targetIndex: 1,
      },
      {
        id: 1,
        sourceId: 0,
        sourceIndex: 2,
        targetId: 1,
        targetIndex: 0,
      },
      {
        id: 3,
        sourceId: 1,
        sourceIndex: 0,
        targetId: 2,
        targetIndex: 0,
      },
    ],
  };

  graph = new LGraph();
  canvas = new LGraphCanvas('#mycanvas', graph);
  // canvas.background_image = null;
  graph.load(new URL('./graph.JSON', import.meta.url).href);
  // graph.start();

  // Demo #1
  // LiteGraph.registerNodeType('basic/sum', Test);

  // const graphNodes: LGraphNode[] = [];
  // data.nodes.forEach((n) => {
  //   const node = lg.LiteGraph.createNode(n.type);
  //   node.pos = n.pos;
  //   node.title = n.name;
  //   node.id = n.id;
  //   n.params.forEach((p) => {
  //     node.addInput(p.name, p.type);
  //     node.addOutput(p.name, p.type);
  //   });
  //   graph.add(node);
  //   graphNodes.push(node);
  // });
  // data.links.forEach((l) => {
  //   const source = graphNodes.find((x) => x.id === l.sourceId);
  //   const target = graphNodes.find((x) => x.id === l.targetId);
  //   if (source && target) {
  //     source.connect(l.sourceIndex, target, l.targetIndex);
  //   }
  // });

  // Demo #2
  // const graph = new LGraph();
  // const canvas = new LGraphCanvas('#mycanvas', graph);
  // console.log(canvas);
  // canvas.canvas.style.backgroundColor = '#333';
  // canvas.canvas.style.width = '1024px';
  // canvas.canvas.style.height = '720px';

  // const node_const = LiteGraph.createNode('basic/const');
  // node_const.pos = [200, 200];
  // graph.add(node_const);
  // node_const.setValue(4.5);

  // const node_watch = LiteGraph.createNode('basic/watch');
  // node_watch.pos = [700, 200];
  // graph.add(node_watch);

  // node_const.connect(0, node_watch, 0);

  // // @ts-ignore
  // LiteGraph.registerNodeType('basic/sum', () => {
  //   //add some input slots
  //   const node = new LGraphNode();
  //   node.addInput('A', 'number');
  //   node.addInput('B', 'number');
  //   //add some output slots
  //   node.addOutput('A+B', 'number');
  //   //add some properties
  //   node.properties = { precision: 1 };
  //   return node;
  // });
});
</script>
<template>
  <div class="about">
    <canvas id="mycanvas" width="1024" height="600" style="border: 1px solid"></canvas>
  </div>
</template>

<style>
@import 'litegraph.js/css/litegraph.css';
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
