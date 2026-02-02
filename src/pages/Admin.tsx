import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Package, Search, Plus, Trash2, Eye } from 'lucide-react';

interface AdminProduct {
  id: string;
  codigo: string;
  nombre: string;
  precio: number;
  descripcion: string;
  createdAt: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchCode, setSearchCode] = useState('');
  const [foundProduct, setFoundProduct] = useState<AdminProduct | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    precio: '',
    descripcion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is admin from localStorage
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus !== 'true') {
      toast({
        title: 'Acceso denegado',
        description: 'No tienes permisos de administrador.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    setIsAdmin(true);
    
    // Load products from localStorage
    loadProducts();
  }, [navigate, toast]);

  const loadProducts = () => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  const saveProducts = (newProducts: AdminProduct[]) => {
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate
    if (!formData.nombre || !formData.codigo || !formData.precio || !formData.descripcion) {
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Check if code already exists
    const codeExists = products.some(p => p.codigo.toLowerCase() === formData.codigo.toLowerCase());
    if (codeExists) {
      toast({
        title: 'Error',
        description: 'Ya existe un producto con ese código.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    const newProduct: AdminProduct = {
      id: crypto.randomUUID(),
      nombre: formData.nombre,
      codigo: formData.codigo.toUpperCase(),
      precio: parseFloat(formData.precio),
      descripcion: formData.descripcion,
      createdAt: new Date().toISOString(),
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);

    toast({
      title: 'Producto creado',
      description: `${newProduct.nombre} ha sido añadido correctamente.`,
    });

    // Reset form
    setFormData({ nombre: '', codigo: '', precio: '', descripcion: '' });
    setIsSubmitting(false);
  };

  const handleSearch = () => {
    if (!searchCode.trim()) {
      toast({
        title: 'Error',
        description: 'Ingresa un código para buscar.',
        variant: 'destructive',
      });
      return;
    }

    const product = products.find(p => p.codigo.toLowerCase() === searchCode.toLowerCase());
    if (product) {
      setFoundProduct(product);
    } else {
      setFoundProduct(null);
      toast({
        title: 'No encontrado',
        description: 'No existe un producto con ese código.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    saveProducts(updatedProducts);
    toast({
      title: 'Producto eliminado',
      description: 'El producto ha sido eliminado correctamente.',
    });
    if (foundProduct?.id === id) {
      setFoundProduct(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona los productos de la tienda OPPO</p>
          </div>

          <Tabs defaultValue="crear" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="crear" className="gap-2">
                <Plus className="w-4 h-4" />
                Crear Producto
              </TabsTrigger>
              <TabsTrigger value="listar" className="gap-2">
                <Package className="w-4 h-4" />
                Ver Productos
              </TabsTrigger>
              <TabsTrigger value="buscar" className="gap-2">
                <Search className="w-4 h-4" />
                Buscar por Código
              </TabsTrigger>
            </TabsList>

            {/* Create Product Tab */}
            <TabsContent value="crear">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Crear Nuevo Producto</CardTitle>
                  <CardDescription>Completa el formulario para añadir un nuevo producto al catálogo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre del Producto</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          placeholder="Ej: OPPO Find X7 Ultra"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="codigo">Código del Producto</Label>
                        <Input
                          id="codigo"
                          name="codigo"
                          placeholder="Ej: OPP-X7-001"
                          value={formData.codigo}
                          onChange={handleInputChange}
                          className="bg-secondary border-border uppercase"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input
                          id="precio"
                          name="precio"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Ej: 1299.99"
                          value={formData.precio}
                          onChange={handleInputChange}
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        name="descripcion"
                        placeholder="Describe las características del producto..."
                        rows={4}
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        className="bg-secondary border-border resize-none"
                      />
                    </div>
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Creando...' : 'Crear Producto'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* List Products Tab */}
            <TabsContent value="listar">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Listado de Productos</CardTitle>
                  <CardDescription>
                    {products.length} producto(s) en el catálogo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No hay productos creados aún.</p>
                      <p className="text-sm">Crea tu primer producto en la pestaña "Crear Producto".</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead>Código</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id} className="border-border">
                              <TableCell className="font-mono text-primary">{product.codigo}</TableCell>
                              <TableCell className="font-medium">{product.nombre}</TableCell>
                              <TableCell>{formatPrice(product.precio)}</TableCell>
                              <TableCell className="max-w-xs truncate text-muted-foreground">
                                {product.descripcion}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(product.id)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Search by Code Tab */}
            <TabsContent value="buscar">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Buscar Producto por Código</CardTitle>
                  <CardDescription>Ingresa el código del producto para ver sus detalles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Ingresa el código del producto..."
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value)}
                      className="bg-secondary border-border uppercase max-w-md"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} className="gap-2">
                      <Search className="w-4 h-4" />
                      Buscar
                    </Button>
                  </div>

                  {foundProduct && (
                    <Card className="bg-secondary border-border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{foundProduct.nombre}</CardTitle>
                            <CardDescription className="font-mono text-primary">
                              {foundProduct.codigo}
                            </CardDescription>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {formatPrice(foundProduct.precio)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-muted-foreground">Descripción</Label>
                            <p className="mt-1 text-foreground">{foundProduct.descripcion}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Fecha de creación</Label>
                            <p className="mt-1 text-foreground">
                              {new Date(foundProduct.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(foundProduct.id)}
                            className="gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar Producto
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
