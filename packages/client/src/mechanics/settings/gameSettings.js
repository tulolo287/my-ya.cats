export default {
  width: 1600,
  height: 700,
  gameSpeed: 25,
  parallaxBackground: [
    {
      src: "./images/background_layer_1.png",
      speed: 1,
    },
    {
      src: "./images/background_layer_2.png",
      speed: 2,
    },
    {
      src: "./images/background_layer_3.png",
      speed: 3,
    },
  ],
  playerAnimation: {
    walk: {
      frameY: 4,
      totalFrames: 7,
    },
    jump: {
      frameY: 19,
      totalFrames: 3,
    },
    fall: {
      frameY: 20,
      totalFrames: 3,
    },
  },
};
