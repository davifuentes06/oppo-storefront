import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-muted-foreground mb-8">
                Parece que aún no has añadido ningún producto a tu carrito.
              </p>
              <Link to="/productos">
                <Button variant="hero" size="lg" className="gap-2">
                  Explorar productos
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Tu <span className="text-gradient">Carrito</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div 
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`}
                  className="bg-card rounded-2xl p-6 flex gap-6"
                >
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-secondary rounded-xl flex items-center justify-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.selectedColor} • {item.selectedStorage}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-secondary"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-foreground w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-secondary"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-lg font-bold text-foreground">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button 
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Resumen del pedido
                </h2>

                <div className="space-y-4 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span className="text-primary">Gratis</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>IVA incluido</span>
                    <span>€{(totalPrice * 0.21).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 border-b border-border">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button variant="hero" size="xl" className="w-full mt-6 gap-2">
                  Finalizar compra
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <Link 
                  to="/productos" 
                  className="block text-center text-sm text-primary hover:underline mt-4"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
