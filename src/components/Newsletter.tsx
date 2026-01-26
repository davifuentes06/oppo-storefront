import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: '¡Suscripción exitosa!',
        description: 'Te mantendremos informado sobre las últimas novedades.',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Únete a la comunidad <span className="text-gradient">OPPO</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Suscríbete para recibir ofertas exclusivas, novedades de productos 
            y consejos de fotografía directamente en tu correo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-card border-border focus:border-primary"
              required
            />
            <Button type="submit" variant="hero" size="lg" className="gap-2">
              Suscribirse
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Al suscribirte, aceptas nuestra política de privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
