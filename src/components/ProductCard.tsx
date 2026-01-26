import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], product.storage[0]);
  };

  return (
    <Link 
      to={`/producto/${product.id}`}
      className="group relative bg-card rounded-2xl overflow-hidden card-shadow hover:scale-[1.02] transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            Nuevo
          </span>
        )}
        {product.isBestseller && (
          <span className="px-3 py-1 bg-oppo-gray text-foreground text-xs font-semibold rounded-full border border-primary/50">
            Más vendido
          </span>
        )}
        {product.originalPrice && (
          <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
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
            src={product.image} 
            alt={product.name}
            className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs text-primary font-medium">{product.series}</span>
        <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground">Colores:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div 
                key={i}
                className="w-4 h-4 rounded-full border border-border"
                style={{ 
                  background: color.toLowerCase().includes('negro') ? '#1a1a1a' : 
                             color.toLowerCase().includes('blanco') ? '#f5f5f5' :
                             color.toLowerCase().includes('verde') ? '#1a9f4a' :
                             color.toLowerCase().includes('azul') ? '#2563eb' :
                             color.toLowerCase().includes('rosa') ? '#ec4899' :
                             color.toLowerCase().includes('dorado') ? '#d4a853' : '#888'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">€{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                €{product.originalPrice}
              </span>
            )}
          </div>
          <Button 
            size="icon" 
            variant="default"
            onClick={handleAddToCart}
            className="rounded-full"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
