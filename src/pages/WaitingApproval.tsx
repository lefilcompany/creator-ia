import { CreatorLogo } from "@/components/ui/creator-logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WaitingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6">
        <CreatorLogo size="lg" />
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Solicitação Enviada!
          </h1>
          <p className="text-muted-foreground">
            Sua solicitação para entrar na equipe foi enviada. 
            Aguarde a aprovação do administrador da equipe.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Você receberá uma notificação quando sua solicitação for aprovada.
          </p>
        </div>

        <Button 
          onClick={() => navigate("/auth")}
          variant="outline"
          className="w-full"
        >
          Voltar ao Login
        </Button>
      </div>
    </div>
  );
};

export default WaitingApproval;