import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Zap, Globe } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Globe,
      title: "Universal Language Support",
      description: "Supporting all major programming languages including Python, JavaScript, Java, C++, Go, Rust, and many more."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant solutions powered by advanced AI algorithms that understand context and provide accurate fixes."
    },
    {
      icon: Users,
      title: "Developer-Focused",
      description: "Built by developers for developers, with features designed to fit seamlessly into your development workflow."
    },
    {
      icon: Target,
      title: "Precision Solutions",
      description: "Multiple solution approaches with explanations, letting you choose the best fix for your specific use case."
    }
  ];

  const stats = [
    { value: "50K+", label: "Errors Resolved" },
    { value: "100+", label: "Languages Supported" },
    { value: "98%", label: "Success Rate" },
    { value: "< 2s", label: "Average Response Time" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">About Code Bud</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Your AI-Powered Debugging Partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Code Bud revolutionizes how developers debug their code. Our advanced AI platform understands error messages across all programming languages and provides instant, accurate solutions with explanations you can understand.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Statement */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 to-accent/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                To empower developers worldwide by making debugging effortless, educational, and efficient. We believe that every developer deserves instant access to expert-level debugging assistance, regardless of their experience level or the complexity of their code.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;