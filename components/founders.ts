/**
 * The restaurants running HaBuk, in the order they joined. The founding offer's
 * count is read from this list (names and logos as the guest app shows them), so the number shown can never disagree with the names.
 */
export const FOUNDERS = [
  { name: "Primavera", logo: "/images/founders/primavera.jpg" },
  { name: "Dora Bakery", logo: "/images/founders/dora-bakery.png" },
  { name: "L'Appetit", logo: "/images/founders/lappetit.jpg" },
  { name: "Doner 21", logo: "/images/founders/doner-21.jpg" },
] as const;

/** Places in the founding offer. */
export const FOUNDER_PLACES = 10;

export const PROMO_PATH = "/promocion-fillestar";
