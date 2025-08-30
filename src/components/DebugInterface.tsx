import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Copy, CheckCircle, AlertCircle, Lightbulb, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DebugInterface = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        errorType: "TypeError",
        language: "JavaScript",
        explanation: "This error occurs when trying to access a property of an undefined or null value.",
        solutions: [
          {
            title: "Add null check",
            description: "Check if the object exists before accessing its properties",
            code: `if (user && user.name) {\n  console.log(user.name);\n}`
          },
          {
            title: "Use optional chaining",
            description: "Use the optional chaining operator to safely access nested properties",
            code: `console.log(user?.name);`
          },
          {
            title: "Set default value",
            description: "Provide a default value if the property doesn't exist",
            code: `const userName = user?.name || 'Anonymous';\nconsole.log(userName);`
          }
        ],
        fixedCode: `// Original problematic code\n// console.log(user.name);\n\n// Fixed code with optional chaining\nconsole.log(user?.name || 'User name not available');\n\n// Alternative with explicit check\nif (user && user.name) {\n  console.log(user.name);\n} else {\n  console.log('User name not available');\n}`
      });
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Paste Your Error, Get Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Simply paste your error message, stack trace, or describe your bug below
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Error Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste your error message, stack trace, or describe your bug here...

Example:
TypeError: Cannot read property 'name' of undefined
    at getUserName (app.js:15)
    at handleUser (app.js:8)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="secondary">All Languages</Badge>
                    <Badge variant="secondary">AI Powered</Badge>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="bg-primary hover:bg-primary-hover"
                  >
                    {isLoading ? (
                      "Analyzing..."
                    ) : (
                      <>
                        Debug Now
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {results && (
            <div className="space-y-6">
              {/* Error Analysis */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Error Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-destructive/10 text-destructive">
                        {results.errorType}
                      </Badge>
                      <Badge variant="outline">
                        {results.language}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {results.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Solutions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-warning" />
                    Multiple Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {results.solutions.map((solution: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {solution.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {solution.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(solution.code)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="bg-code-bg text-code-foreground p-3 rounded-md text-sm overflow-x-auto">
                          <code>{solution.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fixed Code */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Complete Fixed Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground">
                        Here's your complete corrected code:
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(results.fixedCode)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </Button>
                    </div>
                    <pre className="bg-code-bg text-code-foreground p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{results.fixedCode}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Thank You Message */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium text-primary">
                    Thank you for choosing Code Bud
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DebugInterface;