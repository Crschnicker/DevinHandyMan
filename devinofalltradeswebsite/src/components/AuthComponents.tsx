"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginRegisterForm() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuth();
  const router = useRouter();

  // Login form state
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });

  // Register form state
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { email, password } = loginFormData;
      
      if (!email || !password) {
        throw new Error("Please fill in all required fields");
      }

      const success = await login(email, password);
      
      if (success) {
        router.push("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { name, email, phone, password, confirmPassword } = registerFormData;
      
      if (!name || !email || !password) {
        throw new Error("Please fill in all required fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      const success = await register(name, email, password, phone);
      
      if (success) {
        router.push("/dashboard");
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Form */}
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit}>
            <CardHeader>
              <CardTitle>Account Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        {/* Register Form */}
        <TabsContent value="register">
          <form onSubmit={handleRegisterSubmit}>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Sign up for a new account to book services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  name="name"
                  placeholder="John Doe"
                  value={registerFormData.name}
                  onChange={handleRegisterChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerFormData.email}
                  onChange={handleRegisterChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Phone (optional)</Label>
                <Input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  placeholder="(941) 555-1234"
                  value={registerFormData.phone}
                  onChange={handleRegisterChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  value={registerFormData.password}
                  onChange={handleRegisterChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={registerFormData.confirmPassword}
                  onChange={handleRegisterChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export function AuthRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onRegister
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Required</CardTitle>
          <CardDescription>
            Please log in or create an account to book services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Creating an account allows you to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>View and manage your appointments</li>
            <li>See your service history</li>
            <li>Schedule services more quickly</li>
            <li>Request changes to appointments</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            className="gold-button w-full sm:w-auto" 
            onClick={onLogin}
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={onRegister}
          >
            Create Account
          </Button>
          <Button 
            variant="ghost" 
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}