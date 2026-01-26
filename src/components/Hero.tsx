import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full glow-effect animate-pulse-slow" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-12">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nuevo lanzamiento</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              <span className="text-gradient">OPPO</span> Find X7
              <br />
              <span className="text-muted-foreground">Ultra</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0">
              Fotografía de nivel profesional con el sistema de cámara Hasselblad. 
              El smartphone más avanzado jamás creado por OPPO.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/producto/1">
                <Button variant="hero" size="xl">
                  Descubrir más
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/productos">
                <Button variant="heroOutline" size="xl">
                  Ver productos
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              <div>
                <div className="text-3xl font-bold text-foreground">50MP</div>
                <div className="text-sm text-muted-foreground">Cámara Hasselblad</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">100W</div>
                <div className="text-sm text-muted-foreground">SuperVOOC</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">120Hz</div>
                <div className="text-sm text-muted-foreground">AMOLED</div>
              </div>
            </div>
          </div>

          {/* Phone Image */}
          <div className="relative flex items-center justify-center animate-fade-in">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 glow-effect scale-150" />
              
              {/* Phone Image */}
              <div className="relative w-64 md:w-80 lg:w-[400px] animate-float">
                <img 
                  src="/oppo-hero-phone.png" 
                  alt="OPPO Find X7 Ultra"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-card rounded-xl border border-border shadow-lg animate-pulse-slow">
                <span className="text-sm font-semibold text-primary">Hasselblad</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-card rounded-xl border border-border shadow-lg animate-pulse-slow delay-500">
                <span className="text-sm font-semibold text-foreground">5G Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
