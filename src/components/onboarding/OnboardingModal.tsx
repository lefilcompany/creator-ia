import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreatorLogo } from "@/components/ui/creator-logo";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// --- MUDANÇA 1: O ID do usuário agora é um NÚMERO ---
interface OnboardingModalProps {
  userId: number; // Alterado de 'string' para 'number'
  isOpen: boolean;
  onClose: () => void;
}

type OnboardingStep = "choice" | "createTeam" | "joinTeam" | "createBrand" | "createPersona" | "complete";

export const OnboardingModal = ({ userId, isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState<OnboardingStep>("choice");
  const [teamData, setTeamData] = useState({ name: "", accessCode: "" });
  const [joinCode, setJoinCode] = useState("");
  const [brandData, setBrandData] = useState({
    name: "",
    valueProposition: "",
    currentObjective: ""
  });
  const [personaData, setPersonaData] = useState({
    name: "",
    age: "",
    location: "",
    mainObjective: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [createdTeamId, setCreatedTeamId] = useState<number | null>(null);
  const [createdBrandId, setCreatedBrandId] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const showErrorToast = (description = "Ocorreu um erro inesperado. Tente novamente.") => {
    toast({
      title: "Erro",
      description,
      variant: "destructive",
    });
  };

  const handleCreateTeam = async () => {
    if (!teamData.name.trim() || !teamData.accessCode.trim()) {
      return toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome e o código da equipe.",
        variant: "destructive",
      });
    }

    setIsLoading(true);
    try {
      // --- MUDANÇA 2: Usando os nomes corretos dos parâmetros da função RPC ---
      const { data: team, error } = await supabase.rpc('create_team_and_assign_admin', {
        p_name_team: teamData.name.trim(),
        p_access_code: teamData.accessCode.trim(),
      });

      if (error) {
        console.error("Supabase RPC Error:", error);
        if (error.code === '23505') {
          showErrorToast("Este código de acesso já está em uso. Tente outro.");
        } else {
          // A mensagem de erro da própria função é mais informativa
          showErrorToast(error.message || "Não foi possível criar a equipe.");
        }
        return;
      }

      const newTeam = Array.isArray(team) ? team[0] : team;

      if (!newTeam || !newTeam.id) {
        showErrorToast("A equipe foi criada, mas não foi possível obter os dados. Por favor, atualize a página.");
        return;
      }
      
      setCreatedTeamId(newTeam.id);
      setStep("createBrand");
      toast({
        title: "Equipe criada com sucesso!",
        description: "Agora vamos configurar sua primeira marca.",
      });

    } catch (error) {
      console.error("Catch Error:", error);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!joinCode.trim()) {
      return toast({ title: "Erro", description: "Digite o código da equipe.", variant: "destructive" });
    }

    setIsLoading(true);
    try {
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('id')
        .eq('access_code', joinCode.trim())
        .single();

      if (teamError || !team) {
        return showErrorToast("Código de equipe não encontrado.");
      }

      // --- MUDANÇA 3: Garantindo que os nomes das colunas estão corretos ---
      const { error: solicitationError } = await supabase
        .from('solicitations')
        .insert({
          user_id: userId, // userId agora é um número, correto para o novo schema
          team_id: team.id,
          status: 0,
        });

      if (solicitationError) {
        if (solicitationError.code === '23505') {
            return showErrorToast("Você já enviou uma solicitação para esta equipe.");
        }
        console.error("Join Team Error:", solicitationError);
        return showErrorToast("Erro ao enviar solicitação.");
      }

      toast({
        title: "Solicitação enviada!",
        description: "Aguarde a aprovação do administrador da equipe.",
      });

      onClose();
      navigate("/waiting-approval");

    } catch (error) {
      console.error("Catch Error:", error);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBrand = async () => {
    if (!brandData.name || !brandData.valueProposition || !brandData.currentObjective) {
      return toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
    }

    setIsLoading(true);
    try {
      // --- MUDANÇA 3: Garantindo que os nomes das colunas estão corretos (snake_case) ---
      const { data: brand, error: brandError } = await supabase
        .from('brands')
        .insert({
          name: brandData.name,
          team_id: createdTeamId!,
          user_id: userId, // userId agora é um número, correto para o novo schema
          value_proposition: brandData.valueProposition,
          current_objective: brandData.currentObjective,
          // O Prisma espera que todos os campos NOT NULL sejam preenchidos.
          // Ajuste conforme a necessidade real dos seus campos obrigatórios.
          brand_pillars: 'Pilares a definir',
          brand_mission: 'Missão a definir',
          brand_inspiration: 'Inspiração a definir',
          numeric_target: 'Alvo a definir',
          restrictions: 'Nenhuma',
          brand_hashtags: '#suamarca',
          reference_contents: 'Nenhum',
          important_dates: 'Nenhuma',
          relevant_content: 'Nenhum',
          brand_crisis: 'Nenhum',
          influencers_action: 0,
          brand_manual: 0,
        })
        .select()
        .single();

      if (brandError) {
        console.error("Create Brand Error:", brandError);
        return showErrorToast("Erro ao criar a marca. Verifique se todos os campos estão corretos.");
      }

      setCreatedBrandId(brand.id);
      setStep("createPersona");
      toast({
        title: "Marca criada!",
        description: "Agora vamos criar sua primeira persona.",
      });

    } catch (error) {
      console.error("Catch Error:", error);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePersona = async () => {
    // ... (Esta função não precisou de grandes alterações)
    // Apenas garantindo os nomes corretos das colunas
    if (!personaData.name || !personaData.age || !personaData.location || !personaData.mainObjective) {
      return toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
    }

    setIsLoading(true);
    try {
        const ageAsNumber = parseInt(personaData.age, 10);
        if (isNaN(ageAsNumber)) {
            return showErrorToast("A idade deve ser um número válido.");
        }

      const { error: personaError } = await supabase
        .from('personas')
        .insert({
          brand_id: createdBrandId!,
          team_id: createdTeamId!,
          name: personaData.name,
          age: ageAsNumber,
          location: personaData.location,
          main_objective: personaData.mainObjective,
          // Preenchendo outros campos obrigatórios do schema Prisma
          gender: 'Não definido',
          position_degree: 'Não definido',
          beliefs: 'Não definido',
          content_habit: 'Não definido',
          challenge: 'Não definido',
          favorite_voice: 'Não definido',
          buy_journey: 'Não definido',
          interest_trigger: 'Não definido',
        });

      if (personaError) {
        console.error("Create Persona Error:", personaError);
        return showErrorToast("Erro ao criar a persona.");
      }

      setStep("complete");
      toast({ title: "Persona criada!", description: "Configuração concluída com sucesso!" });

    } catch (error) {
      console.error("Catch Error:", error);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFinish = () => {
    onClose();
    window.location.href = "/dashboard";
  };
  
  const renderStep = () => {
    // A função renderStep continua a mesma, sem necessidade de alterações.
    // Cole aqui a sua função renderStep completa.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 text-center">
          <div className="flex justify-center mb-4"><CreatorLogo size="md" /></div>
          <DialogTitle className="sr-only">Creator Onboarding</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-0">{renderStep()}</div>
      </DialogContent>
    </Dialog>
  );
};