import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Code } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/20 z-0" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/50 border border-accent-foreground/20 rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              AI-Powered Debugging Assistant
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Debug Any Code
            <br />
            <span className="text-primary">Instantly</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Paste your error message, get instant solutions, and automatically fixed code. 
            Supporting all programming languages and technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Start Debugging
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-card border rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 bg-card border rounded-full px-4 py-2">
              <Code className="h-4 w-4 text-info" />
              <span className="text-sm font-medium">All Languages</span>
            </div>
            <div className="flex items-center gap-2 bg-card border rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;