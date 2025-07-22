import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { CreatorLogo } from "@/components/ui/creator-logo";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen" style={{ background: 'var(--creator-gradient)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-screen">
          {/* Left Side - Preview/Illustration */}
          <div className="flex-1 max-w-md lg:max-w-lg">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <CreatorLogo size="sm" />
                  <span className="text-white text-xl font-bold">CREATOR</span>
                </div>
                
                <div className="bg-white/20 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Histórico de Ações</h3>
                  <div className="space-y-3">
                    {[
                      { color: "bg-secondary", label: "Criar calendário" },
                      { color: "bg-primary", label: "Criação de cont..." },
                      { color: "bg-accent", label: "Revisões de cont..." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-white/80 text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === 2 ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-white text-lg font-medium">
                Aqui, suas ideias ganham forma com a força da inteligência artificial.
              </p>
              <p className="text-white/80 mt-2">
                Crie, planeje e transforme conteúdos com autonomia e estratégia.
              </p>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="flex-1 max-w-md">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <CreatorLogo size="md" />
                <h1 className="text-2xl font-bold text-foreground mt-4">
                  {mode === "login" ? "Login" : "Cadastro"}
                </h1>
              </div>

              {mode === "login" ? (
                <LoginForm onSwitchToRegister={() => setMode("register")} />
              ) : (
                <AuthForm onSwitchToLogin={() => setMode("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;