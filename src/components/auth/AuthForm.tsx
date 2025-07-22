import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

interface AuthFormProps {
  onSwitchToLogin: () => void;
}

export const AuthForm = ({ onSwitchToLogin }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cityUser: "",
    stateUser: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  // --- CORREÇÃO 1: O estado é alterado para esperar um NÚMERO, não uma string.
  const [newUserId, setNewUserId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (formData.password !== formData.confirmPassword) {
      toast({ 
        title: "Erro", 
        description: "As senhas não coincidem.", 
        variant: "destructive" 
      });
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      toast({ 
        title: "Erro", 
        description: "A senha deve ter pelo menos 6 caracteres.", 
        variant: "destructive" 
      });
      setIsLoading(false);
      return;
    }

    try {
      // Passo 1: Cadastrar o usuário no Supabase Auth.
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            userName: formData.userName,
            cityUser: formData.cityUser,
            stateUser: formData.stateUser
          }
        }
      });

      if (error) {
        toast({ 
          title: "Erro no cadastro", 
          description: error.message, 
          variant: "destructive" 
        });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // --- CORREÇÃO 2: BUSCAR O ID NUMÉRICO NA TABELA `public.users` ---
        // Usamos o `data.user.id` (UUID string) para encontrar o registro correspondente.
        const { data: publicUser, error: publicUserError } = await supabase
            .from('users')
            .select('id')
            .eq('auth_id', data.user.id) // A coluna `auth_id` guarda o UUID
            .single();

        if (publicUserError || !publicUser) {
            toast({ 
                title: "Erro pós-cadastro", 
                description: "Não foi possível encontrar seu perfil para iniciar a configuração.", 
                variant: "destructive" 
            });
            setIsLoading(false);
            return;
        }
        
        toast({ 
          title: "Cadastro realizado!", 
          description: "Vamos configurar sua equipe." 
        });
        
        // --- CORREÇÃO 3: Passamos o `publicUser.id` (que é um NÚMERO) para o estado.
        setNewUserId(publicUser.id);
        setShowOnboarding(true);
      }

    } catch (err) {
      toast({ 
        title: "Erro inesperado", 
        description: "Não foi possível concluir o cadastro.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="col-span-2 space-y-2">
            <Label htmlFor="userName" className="text-secondary font-medium">
              Nome completo
            </Label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <Input
                id="userName"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className="pl-10 border-secondary/20 focus:border-secondary"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-secondary font-medium">
              Telefone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="pl-10 border-secondary/20 focus:border-secondary"
                required
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="cityUser" className="text-secondary font-medium">
              Cidade
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="cityUser"
                type="text"
                placeholder="Cidade"
                value={formData.cityUser}
                onChange={(e) => handleInputChange("cityUser", e.target.value)}
                className="pl-10 border-secondary/20 focus:border-secondary"
                required
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-secondary font-medium">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 border-secondary/20 focus:border-secondary"
              required
            />
          </div>
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="stateUser" className="text-secondary font-medium">
            Estado
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              id="stateUser"
              type="text"
              placeholder="Ex: São Paulo"
              value={formData.stateUser}
              onChange={(e) => handleInputChange("stateUser", e.target.value)}
              className="pl-10 border-secondary/20 focus:border-secondary"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-secondary font-medium">
              Crie uma senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Insira a sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 border-secondary/20 focus:border-secondary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-secondary font-medium">
              Confirmar senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirma sua senha"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="pl-10 pr-10 border-secondary/20 focus:border-secondary"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg"
          disabled={isLoading}
        >
          {isLoading ? "CADASTRANDO..." : "CADASTRAR"}
        </Button>

        {/* Google Signup */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignup}
          className="w-full border-2 border-border hover:bg-muted/50 py-6"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Conecte-se com o Google
        </Button>

        {/* Switch to Login */}
        <div className="text-center">
          <span className="text-muted-foreground">Já possui uma conta? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium"
          >
            Log In
          </button>
        </div>
      </form>

      {/* Onboarding Modal */}
      {showOnboarding && newUserId !== null && (
        <OnboardingModal
          userId={newUserId}
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      )}
    </>
  );
};