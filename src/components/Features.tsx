import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En pedidos superiores a €50',
  },
  {
    icon: Shield,
    title: 'Garantía 2 Años',
    description: 'Protección completa del producto',
  },
  {
    icon: CreditCard,
    title: 'Pago Seguro',
    description: 'Transacciones 100% protegidas',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Estamos aquí para ayudarte',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
