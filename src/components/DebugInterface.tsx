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
    
    // Analyze the input to detect language and error type
    const analysisResult = analyzeError(input);
    
    // Simulate API call with intelligent analysis
    setTimeout(() => {
      setResults(analysisResult);
      setIsLoading(false);
    }, 1500);
  };

  const analyzeError = (errorInput: string) => {
    const lowerInput = errorInput.toLowerCase();
    
    // Language detection patterns
    const languagePatterns = {
      javascript: [/javascript/i, /js/i, /node/i, /npm/i, /react/i, /vue/i, /angular/i, /typescript/i, /cannot read property/i, /undefined is not a function/i, /syntaxerror/i],
      python: [/python/i, /py/i, /pip/i, /django/i, /flask/i, /pandas/i, /numpy/i, /traceback/i, /nameerror/i, /indentationerror/i, /modulenotfounderror/i],
      java: [/java/i, /\.java/i, /classnotfoundexception/i, /nullpointerexception/i, /illegalargumentexception/i, /arrayindexoutofboundsexception/i],
      csharp: [/c#/i, /\.cs/i, /\.net/i, /system\./i, /nullreferenceexception/i, /argumentnullexception/i, /invalidoperationexception/i],
      cpp: [/c\+\+/i, /cpp/i, /\.cpp/i, /\.h/i, /segmentation fault/i, /core dumped/i, /undefined reference/i],
      php: [/php/i, /\.php/i, /parse error/i, /fatal error/i, /call to undefined function/i, /undefined variable/i],
      ruby: [/ruby/i, /\.rb/i, /rails/i, /gem/i, /undefined method/i, /nomethoderror/i, /argumenterror/i],
      go: [/golang/i, /go/i, /\.go/i, /panic/i, /runtime error/i, /undefined/i],
      rust: [/rust/i, /\.rs/i, /cargo/i, /error\[e/i, /borrow checker/i, /ownership/i],
      swift: [/swift/i, /\.swift/i, /xcode/i, /fatal error/i, /index out of range/i]
    };

    // Detect language
    let detectedLanguage = 'Unknown';
    let confidence = 0;
    
    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      const matches = patterns.filter(pattern => pattern.test(errorInput)).length;
      if (matches > confidence) {
        confidence = matches;
        detectedLanguage = lang.charAt(0).toUpperCase() + lang.slice(1);
      }
    }

    // Error type detection
    let errorType = 'General Error';
    let explanation = 'An error occurred in your code.';
    let solutions: any[] = [];
    let fixedCode = '';

    // JavaScript/TypeScript errors
    if (detectedLanguage === 'Javascript' || lowerInput.includes('typescript')) {
      if (lowerInput.includes('cannot read property') || lowerInput.includes('undefined')) {
        errorType = 'TypeError - Undefined Property Access';
        explanation = 'This error occurs when trying to access a property of an undefined or null value.';
        solutions = [
          {
            title: "Add null check",
            description: "Check if the object exists before accessing its properties",
            code: `if (obj && obj.property) {\n  console.log(obj.property);\n}`
          },
          {
            title: "Use optional chaining",
            description: "Use the optional chaining operator to safely access nested properties",
            code: `console.log(obj?.property);`
          },
          {
            title: "Set default value",
            description: "Provide a default value if the property doesn't exist",
            code: `const value = obj?.property || 'default';\nconsole.log(value);`
          }
        ];
        fixedCode = `// Original problematic code\n// console.log(user.name);\n\n// Fixed code with optional chaining\nconsole.log(user?.name || 'User name not available');\n\n// Alternative with explicit check\nif (user && user.name) {\n  console.log(user.name);\n} else {\n  console.log('User name not available');\n}`;
      } else if (lowerInput.includes('syntaxerror')) {
        errorType = 'SyntaxError';
        explanation = 'There is a syntax error in your JavaScript code - missing brackets, semicolons, or incorrect syntax.';
        solutions = [
          {
            title: "Check brackets and parentheses",
            description: "Ensure all opening brackets have corresponding closing brackets",
            code: `// Check for matching brackets\nif (condition) {\n  // code here\n} // <- closing bracket`
          },
          {
            title: "Verify semicolons",
            description: "Add missing semicolons at the end of statements",
            code: `let variable = 'value'; // <- semicolon\nconsole.log(variable); // <- semicolon`
          }
        ];
        fixedCode = `// Check your code for:\n// 1. Missing closing brackets }\n// 2. Missing semicolons ;\n// 3. Unclosed strings ""\n// 4. Missing commas in objects or arrays`;
      }
    }
    
    // Python errors
    else if (detectedLanguage === 'Python') {
      if (lowerInput.includes('nameerror')) {
        errorType = 'NameError';
        explanation = 'This error occurs when trying to use a variable or function that has not been defined.';
        solutions = [
          {
            title: "Define the variable",
            description: "Make sure the variable is defined before using it",
            code: `# Define the variable first\nvariable_name = "some value"\nprint(variable_name)`
          },
          {
            title: "Check spelling",
            description: "Verify the variable name is spelled correctly",
            code: `# Correct spelling\nmy_variable = 10\nprint(my_variable)  # not my_varibale`
          }
        ];
        fixedCode = `# Original problematic code\n# print(undefined_variable)\n\n# Fixed code\nvariable_name = "Hello, World!"\nprint(variable_name)`;
      } else if (lowerInput.includes('indentationerror')) {
        errorType = 'IndentationError';
        explanation = 'Python requires consistent indentation. This error occurs when indentation is inconsistent or missing.';
        solutions = [
          {
            title: "Fix indentation",
            description: "Use consistent indentation (4 spaces or tabs)",
            code: `if True:\n    print("Properly indented")\n    if True:\n        print("Nested indentation")`
          }
        ];
        fixedCode = `# Original problematic code\n# if True:\nprint("This should be indented")\n\n# Fixed code\nif True:\n    print("Properly indented")`;
      }
    }
    
    // Java errors
    else if (detectedLanguage === 'Java') {
      if (lowerInput.includes('nullpointerexception')) {
        errorType = 'NullPointerException';
        explanation = 'This error occurs when trying to use a reference that points to no location in memory (null).';
        solutions = [
          {
            title: "Add null check",
            description: "Check if the object is null before using it",
            code: `if (object != null) {\n    object.method();\n}`
          },
          {
            title: "Initialize the object",
            description: "Make sure the object is properly initialized",
            code: `String str = new String("Hello");\nSystem.out.println(str.length());`
          }
        ];
        fixedCode = `// Original problematic code\n// String str = null;\n// System.out.println(str.length());\n\n// Fixed code\nString str = "Hello World";\nif (str != null) {\n    System.out.println(str.length());\n}`;
      }
    }

    // Default case for unknown errors
    if (solutions.length === 0) {
      errorType = 'Code Analysis Required';
      explanation = `This appears to be a ${detectedLanguage} error. Please provide more context or the specific error message for better analysis.`;
      solutions = [
        {
          title: "Check documentation",
          description: `Review the ${detectedLanguage} documentation for the specific function or method`,
          code: `// Check the official ${detectedLanguage} documentation\n// for the specific error message`
        },
        {
          title: "Debug step by step",
          description: "Add debug statements to isolate the issue",
          code: detectedLanguage === 'Python' ? 
            `# Add debug prints\nprint("Debug: variable =", variable)\ntry:\n    # your code here\nexcept Exception as e:\n    print("Error:", e)` :
            `// Add debug statements\nconsole.log("Debug: variable =", variable);\ntry {\n    // your code here\n} catch (error) {\n    console.error("Error:", error);\n}`
        },
        {
          title: "Verify syntax",
          description: "Check for common syntax errors like missing brackets or semicolons",
          code: `// Common syntax issues:\n// - Missing closing brackets\n// - Typos in variable names\n// - Missing imports or dependencies`
        }
      ];
      fixedCode = `// To provide accurate solutions, please share:\n// 1. The complete error message\n// 2. The problematic code snippet\n// 3. What you were trying to achieve\n\n// General debugging approach:\nconsole.log("Add debug statements to trace the issue");`;
    }

    return {
      errorType,
      language: detectedLanguage,
      explanation,
      solutions,
      fixedCode
    };
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