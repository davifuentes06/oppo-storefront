export interface Product {
  id: string;
  name: string;
  series: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  category: 'flagship' | 'reno' | 'a-series' | 'find';
  isNew?: boolean;
  isBestseller?: boolean;
  colors: string[];
  storage: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "OPPO Find X7 Ultra",
    series: "Find X Series",
    price: 1299,
    image: "/placeholder.svg",
    description: "El smartphone de fotografía más avanzado con sistema de cámara Hasselblad",
    features: ["Cámara Hasselblad 50MP", "Snapdragon 8 Gen 3", "100W SuperVOOC", "Pantalla AMOLED 120Hz"],
    category: "find",
    isNew: true,
    colors: ["Negro Obsidiana", "Blanco Perla"],
    storage: ["256GB", "512GB"]
  },
  {
    id: "2",
    name: "OPPO Find X6 Pro",
    series: "Find X Series",
    price: 999,
    originalPrice: 1199,
    image: "/placeholder.svg",
    description: "Fotografía profesional en tu bolsillo con triple cámara de 50MP",
    features: ["Triple cámara 50MP", "Snapdragon 8 Gen 2", "100W + 50W Wireless", "Pantalla curva 120Hz"],
    category: "find",
    isBestseller: true,
    colors: ["Negro", "Verde Oliva"],
    storage: ["256GB", "512GB"]
  },
  {
    id: "3",
    name: "OPPO Reno 11 Pro",
    series: "Reno Series",
    price: 699,
    image: "/placeholder.svg",
    description: "Diseño elegante con cámara de retrato profesional",
    features: ["Cámara 50MP + Teleobjetivo", "Dimensity 8200", "80W SuperVOOC", "Diseño ultra delgado"],
    category: "reno",
    isNew: true,
    colors: ["Gris Lunar", "Verde Aurora", "Rosa Champán"],
    storage: ["256GB", "512GB"]
  },
  {
    id: "4",
    name: "OPPO Reno 11",
    series: "Reno Series",
    price: 499,
    image: "/placeholder.svg",
    description: "Captura cada momento con estilo y rendimiento",
    features: ["Cámara 64MP", "Dimensity 7050", "67W SuperVOOC", "Pantalla AMOLED 120Hz"],
    category: "reno",
    colors: ["Negro Rock", "Azul Océano", "Verde Menta"],
    storage: ["128GB", "256GB"]
  },
  {
    id: "5",
    name: "OPPO A98",
    series: "A Series",
    price: 349,
    originalPrice: 399,
    image: "/placeholder.svg",
    description: "Gran batería y rendimiento para el día a día",
    features: ["Cámara 64MP", "Snapdragon 695", "67W SuperVOOC", "Batería 5000mAh"],
    category: "a-series",
    isBestseller: true,
    colors: ["Negro Noche", "Azul Cool"],
    storage: ["128GB", "256GB"]
  },
  {
    id: "6",
    name: "OPPO A78",
    series: "A Series",
    price: 249,
    image: "/placeholder.svg",
    description: "Diseño premium a un precio accesible",
    features: ["Cámara 50MP", "Helio G99", "67W SuperVOOC", "Pantalla AMOLED 90Hz"],
    category: "a-series",
    colors: ["Negro Misterio", "Verde Aqua"],
    storage: ["128GB"]
  },
  {
    id: "7",
    name: "OPPO A58",
    series: "A Series",
    price: 199,
    image: "/placeholder.svg",
    description: "Tu entrada al mundo OPPO con todas las funciones esenciales",
    features: ["Cámara 50MP", "Helio G85", "33W SuperVOOC", "Batería 5000mAh"],
    category: "a-series",
    colors: ["Negro", "Azul"],
    storage: ["64GB", "128GB"]
  },
  {
    id: "8",
    name: "OPPO Find N3 Flip",
    series: "Find N Series",
    price: 1099,
    image: "/placeholder.svg",
    description: "El plegable compacto más elegante del mercado",
    features: ["Pantalla plegable AMOLED", "Cámara 50MP Hasselblad", "44W SuperVOOC", "Diseño compacto premium"],
    category: "flagship",
    isNew: true,
    colors: ["Negro Elegante", "Rosa Crema", "Dorado"],
    storage: ["256GB", "512GB"]
  }
];

export const categories = [
  { id: "all", name: "Todos", description: "Ver todos los productos" },
  { id: "find", name: "Find Series", description: "Fotografía profesional" },
  { id: "reno", name: "Reno Series", description: "Diseño y estilo" },
  { id: "a-series", name: "A Series", description: "Calidad accesible" },
  { id: "flagship", name: "Flagship", description: "Lo mejor de OPPO" },
];
