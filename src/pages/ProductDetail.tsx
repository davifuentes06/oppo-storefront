import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Check, ChevronLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground">Producto no encontrado</h1>
          <Link to="/productos" className="text-primary hover:underline mt-4 inline-block">
            Volver a productos
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedStorage);
    toast({
      title: '¡Añadido al carrito!',
      description: `${product.name} se ha añadido correctamente.`,
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const colorMap: Record<string, string> = {
    'negro': '#1a1a1a',
    'blanco': '#f5f5f5',
    'verde': '#1a9f4a',
    'azul': '#2563eb',
    'rosa': '#ec4899',
    'dorado': '#d4a853',
    'gris': '#6b7280',
  };

  const getColorHex = (colorName: string) => {
    const lowerName = colorName.toLowerCase();
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerName.includes(key)) return value;
    }
    return '#888';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <span>/</span>
            <Link to="/productos" className="hover:text-primary">Productos</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-b from-secondary to-card rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 glow-effect opacity-30" />
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Nuevo
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-4 py-2 bg-destructive text-destructive-foreground text-sm font-semibold rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="text-primary font-medium">{product.series}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-foreground">€{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    €{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ background: getColorHex(color) }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-foreground mb-3">Almacenamiento</h3>
                <div className="flex gap-3">
                  {product.storage.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedStorage === storage
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-foreground mb-3">Cantidad</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-secondary"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-foreground w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-secondary"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Añadir al carrito
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-8">
                <h3 className="text-sm font-medium text-foreground mb-4">Características principales</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Envío gratis</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">2 años garantía</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">30 días devolución</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Productos relacionados
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
