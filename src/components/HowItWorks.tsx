import { Card, CardContent } from "@/components/ui/card";
import { Upload, Brain, Code, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Paste Your Error",
      description: "Simply copy and paste your error message, stack trace, or describe your bug in any programming language.",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your error, understands the context, and identifies the root cause instantly.",
      color: "text-warning"
    },
    {
      icon: Code,
      title: "Get Solutions",
      description: "Receive multiple solution approaches with detailed explanations and best practices for each fix.",
      color: "text-info"
    },
    {
      icon: CheckCircle,
      title: "Fixed Code",
      description: "Get the complete corrected code ready to use, along with explanations of what was changed and why.",
      color: "text-success"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How Code Bud Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your code fixed in four simple steps. Our AI-powered platform makes debugging faster and more efficient than ever before.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 bg-accent/50 border border-accent-foreground/20 rounded-full px-6 py-3">
              <span className="text-sm font-medium text-accent-foreground">
                🚀 Ready to debug smarter? Try it now!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;