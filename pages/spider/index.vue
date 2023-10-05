<template>
  <div
    class="container"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @touchmove="onTouchMove"
    @touchstart="onTouchMove"
  >
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { gsap } from "gsap";

const canvasRef = ref();
let ctx;
let win;
let mouse;
let paws;

const opts = {
  cellSize: 40,
  pawRadius: 94,
  pawHeight: 200,
  pawRandomStep: 0.2,
  bodyHeight: 20,
  spiderOffsetX: 30,
  spiderOffsetY: 40,
  shadowY: 0.3,
  speed: 0.12,
  stop: false,
  jump: 0,
};
let cols = 0;
let rows = 0;

const onMouseMove = (e) => {
  if (opts.stop) {
    mouse.lerpX = win.w * 0.5;
    mouse.lerpY = win.h * 0.5;
    mouse.x = win.w * 0.5;
    mouse.y = win.h * 0.5;
  } else {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
};
const onTouchMove = (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
};
const onMouseDown = () => {
  console.log("down");
  gsap.killTweensOf(opts);
  gsap.to(opts, {
    jump: opts.bodyHeight,
    duration: 0.5,
    ease: "power3.out",
  });
};
const onMouseUp = () => {
  gsap.killTweensOf(opts);
  gsap.to(opts, {
    jump: 0,
    duration: 2,
    ease: "elastic(1.4, 0.1)",
  });
};

const lerp = (a, b, c) => {
  return (1 - c) * a + c * b;
};

const setRandom = (start, range) => {
  return start - range + Math.random() * range * 2;
};

const clear = () => {
  ctx.clearRect(0, 0, win.w, win.h);
};

const walk = () => {
  let ind = 0;
  Array(10)
    .fill()
    .forEach((_, i) => {
      const theta = i / 10;
      if (i % 5 === 0) return;
      const x = setRandom(
        mouse.x + cols * 0.5 + opts.pawRadius * Math.sin(theta * Math.PI * 2),
        opts.pawRadius * opts.pawRandomStep,
      );
      const y = setRandom(
        mouse.y + rows * 0.5 + opts.pawRadius * Math.cos(theta * Math.PI * 2),
        opts.pawRadius * opts.pawRandomStep,
      );

      gsap.to(paws[ind++], {
        x,
        y,
        duration: opts.speed,
        ease: "power3.out",
        delay: ((i + 2) % 4) * 0.1,
      });
    });
};

const checkStep = () => {
  mouse.stepX = Math.round((mouse.x / win.w) * (cols - 1)) * opts.cellSize;
  mouse.stepY = Math.round((mouse.y / win.h) * (rows - 1)) * opts.cellSize;

  if (mouse.oldStepX !== mouse.stepX || mouse.oldStepY !== mouse.stepY) {
    walk();
  }

  mouse.oldStepX = mouse.stepX;
  mouse.oldStepY = mouse.stepY;
};

const drawSpider = () => {
  const x = mouse.lerpX - opts.spiderOffsetX;
  const y = mouse.lerpY - opts.spiderOffsetY;

  paws.forEach((p) => {
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + opts.bodyHeight);
    const x2 = lerp(x, p.x, 0.5);
    const y2 = lerp(y + opts.jump, p.y, opts.shadowY);
    ctx.quadraticCurveTo(x2, y2, p.x, p.y);
    ctx.stroke();
    ctx.closePath();
  });

  paws.forEach((p) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y + opts.jump);
    const x1 = lerp(x, p.x, 0.5);
    const y1 = lerp(y + opts.jump, p.y - opts.pawHeight, 0.5);
    ctx.quadraticCurveTo(x1, y1, p.x, p.y);
    ctx.stroke();
    ctx.closePath();
  });
};

const drawMouse = () => {
  mouse.lerpX = lerp(mouse.lerpX, mouse.x, 0.1);
  mouse.lerpY = lerp(mouse.lerpY, mouse.y, 0.1);

  if (opts.stop) {
    mouse.lerpX = win.w * 0.5;
    mouse.lerpY = win.h * 0.5;
    mouse.x = win.w * 0.5;
    mouse.y = win.h * 0.5;
  }
  checkStep();
};

const draw = () => {
  clear();
  drawMouse();
  drawSpider();
  requestAnimationFrame(draw);
};

const onResize = () => {
  win.w = window.innerWidth;
  win.h = window.innerHeight;
  canvasRef.value.width = win.w;
  canvasRef.value.height = win.h;
  cols = Math.round(win.w / opts.cellSize) + 1;
  rows = Math.round(win.h / opts.cellSize) + 1;
};

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  win = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  mouse = {
    x: win.w * 0.5,
    y: win.h * 0.5,
    lerpX: win.w * 0.5,
    lerpY: win.h * 0.5,
    stepX: 0,
    stepY: 0,
    oldStepX: 0,
    oldStepY: 0,
    angle: 0,
  };
  paws = [
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
    { x: win.w * 0.5, y: win.h * 0.5 },
  ];

  draw();
  onResize();

  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
