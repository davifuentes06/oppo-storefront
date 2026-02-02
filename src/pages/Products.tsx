import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminProductCard from '@/components/AdminProductCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';

interface Product {
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

const categories = [
  { id: "all", name: "Todos", description: "Ver todos los productos" },
  { id: "find", name: "Find Series", description: "Fotografía profesional" },
  { id: "reno", name: "Reno Series", description: "Diseño y estilo" },
  { id: "a-series", name: "A Series", description: "Calidad accesible" },
  { id: "flagship", name: "Flagship", description: "Lo mejor de OPPO" },
  { id: "smartphone", name: "Smartphones", description: "Dispositivos móviles" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    loadProducts();
  }, [searchParams]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.PRODUCTS);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los productos.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error de conexión',
        description: 'No se pudo conectar con el servidor.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory === 'all') return true;
      return product.categoria === selectedCategory;
    })
    .filter(product => {
      return product.precio >= priceRange[0] && product.precio <= priceRange[1];
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.precio - b.precio;
        case 'price-desc':
          return b.precio - a.precio;
        case 'name':
          return a.nombre.localeCompare(b.nombre);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestros <span className="text-gradient">Productos</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explora nuestra colección completa de smartphones OPPO. 
              Desde los más avanzados hasta los más accesibles.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort & View Options */}
            <div className="flex gap-2 lg:ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Mostrando {filteredProducts.length} productos
          </p>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Cargando productos...
              </h3>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <AdminProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron productos
              </h3>
              <p className="text-muted-foreground">
                {products.length === 0 
                  ? 'No hay productos disponibles. Los administradores pueden agregar productos desde el panel de administración.'
                  : 'Intenta ajustar los filtros para encontrar lo que buscas'
                }
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
