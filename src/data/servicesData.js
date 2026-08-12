/* ==========================================================================
   SERVICES & KITS DATA MODULE - EDITH DELGADO
   ========================================================================== */

export const categories = [
  { id: "all", label: "Todos los Kits" }
];

export const servicesData = [
  {
    id: "libera-tu-mente",
    categoryId: "all",
    title: "Libera tu mente",
    description: "La rumia es un patrón de pensamiento persistente y repetitivo, donde la persona se enfoca en experiencias negativas.",
    image: "./assets/images/kit-libera-mente.png",
    price: "$7.99",
    ctaText: "Inscribirse",
    link: "./course/liberatumente/index.html"
  },
  {
    id: "distancia-pensamientos",
    categoryId: "all",
    title: "Distancia de los pensamientos",
    description: "Aprende a tomar distancia de tus pensamientos y desactivar la ansiedad con este kit practico de ejercicios guiados y registro semanal.",
    image: "./assets/images/kit-distancia.png",
    price: "$7.99",
    ctaText: "Inscribirse",
    link: "./course/distancia-de-los-pensamientos/index.html"
  },
  {
    id: "radar-rumia",
    categoryId: "all",
    title: "Tu radar de rumia",
    description: "Una guia paso a paso para salir del piloto automatico y evitar que tus pensamientos secuestren tu atencion.",
    image: "./assets/images/kit-radar.png",
    price: "$7.99",
    ctaText: "Inscribirse",
    link: "./course/radar-de-rumia/index.html"
  }
];
