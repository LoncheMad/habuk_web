// lottie-web's light player (SVG renderer, no expressions) shares the main package's types
declare module "lottie-web/build/player/lottie_light" {
  import lottie from "lottie-web";
  export default lottie;
}
