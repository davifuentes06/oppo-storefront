import { Link } from 'react-router-dom';
import { Smartphone, Camera, Zap, Star } from 'lucide-react';

const categories = [
  {
    id: 'find',
    name: 'Find Series',
    description: 'Fotografía profesional',
    icon: Camera,
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'reno',
    name: 'Reno Series',
    description: 'Diseño y estilo',
    icon: Star,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'a-series',
    name: 'A Series',
    description: 'Calidad accesible',
    icon: Smartphone,
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'flagship',
    name: 'Flagship',
    description: 'Lo mejor de OPPO',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
  },
];

const Categories = () => {
  return (
    <section className="py-24 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explora por <span className="text-gradient">Categoría</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encuentra el smartphone perfecto para ti según tus necesidades
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/productos?category=${category.id}`}
              className="group relative bg-card rounded-2xl p-8 overflow-hidden hover:scale-[1.02] transition-all duration-300 card-shadow"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>

              {/* Arrow */}
              <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
