<template>
  <div class="morphing">
    <div class="word">hello</div>
    <div class="word">hi</div>
    <div class="word">welcome</div>
    <div class="word">안녕하세요</div>
    <div class="word">반갑습니다</div>
    <div class="word">감사합니다</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
$speed: 10s;
$wordCount: 6;

.morphing {
  position: relative;
  height: 100vh;
  font-size: 6em;
  font-weight: 700;
  color: white;
  background: black;
  filter: contrast(25) blur(1px);
}

.word {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: wordAni $speed infinite ease-in-out;
  @for $i from 0 to $wordCount {
    &:nth-child(#{$i + 1}) {
      animation-delay: (calc($speed / ($wordCount + 1)) * $i)-$speed;
    }
  }
  @keyframes wordAni {
    0%,
    5%,
    100% {
      filter: blur(0px);
      opacity: 1;
    }
    20%,
    80% {
      filter: blur(1em);
      opacity: 0;
    }
  }
}
</style>
