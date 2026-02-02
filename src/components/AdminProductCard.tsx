import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface AdminProduct {
  id: string;
  codigo: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen?: string;
  categoria: string;
  stock: number;
  activo: boolean;
  createdAt: string;
}

interface AdminProductCardProps {
  product: AdminProduct;
}

const AdminProductCard = ({ product }: AdminProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Convertir el producto del admin al formato esperado por el carrito
    const cartProduct = {
      id: product.id,
      name: product.nombre,
      series: product.categoria,
      price: Number(product.precio),
      image: product.imagen || '/placeholder.svg',
      description: product.descripcion,
      features: [],
      category: product.categoria as any,
      colors: ['Negro'], // Valores por defecto
      storage: ['128GB'], // Valores por defecto
    };
    addToCart(cartProduct, 'Negro', '128GB');
  };

  const getCategoryName = (categoria: string) => {
    const categoryMap: { [key: string]: string } = {
      'find': 'Find Series',
      'reno': 'Reno Series',
      'a-series': 'A Series',
      'flagship': 'Flagship',
      'smartphone': 'Smartphone'
    };
    return categoryMap[categoria] || categoria;
  };

  return (
    <Link 
      to={`/producto/${product.id}`}
      className="group relative bg-card rounded-2xl overflow-hidden card-shadow hover:scale-[1.02] transition-all duration-300"
    >
      {/* Stock Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.stock > 0 ? (
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            Stock: {product.stock}
          </span>
        ) : (
          <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
            Sin stock
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Image */}
      <div className="aspect-square p-8 bg-gradient-to-b from-secondary to-card flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 glow-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={product.imagen || '/placeholder.svg'} 
            alt={product.nombre}
            className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs text-primary font-medium">{getCategoryName(product.categoria)}</span>
        <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
          {product.nombre}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.descripcion}
        </p>

        {/* Code */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground">Código:</span>
          <span className="text-xs font-mono text-primary">{product.codigo}</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">€{Number(product.precio).toFixed(2)}</span>
          </div>
          <Button 
            size="icon" 
            variant="default"
            onClick={handleAddToCart}
            className="rounded-full"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default AdminProductCard;