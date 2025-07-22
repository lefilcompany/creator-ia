import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BrandCard } from "@/components/dashboard/BrandCard";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

// Interface 'Brand' atualizada para corresponder 100% ao schema do banco (snake_case)
interface Brand {
  id: number;
  name: string;
  value_proposition: string;
  current_objective: string;
  created_at: string;
}

// Interface 'UserData' atualizada. 
// 'id' é uma string (UUID do Supabase Auth) e 'team_id' pode ser nulo.
interface UserData {
  id: string;
  user_name: string;
  email: string;
  team_id: number | null; // Corrigido para permitir nulo, conforme o schema
  role_permission: string | null;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      
      // Busca os dados na tabela 'public.users' usando o ID de autenticação (UUID).
      // Isso funciona por causa do trigger que criamos no banco.
      const { data: userDataResult, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id) // A coluna 'id' em 'users' agora é o UUID do 'auth.users'
        .single();

      if (userError || !userDataResult) {
        toast({
          title: "Erro",
          description: "Dados do usuário não encontrados. Por favor, faça login novamente.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }

      // Verifica se o usuário já pertence a uma equipe.
      if (!userDataResult.team_id) {
        toast({
          title: "Configuração pendente",
          description: "Você precisa criar ou entrar em uma equipe para continuar.",
          variant: "destructive",
        });
        // Idealmente, aqui você abriria o modal de onboarding ou redirecionaria para a página de onboarding.
        // Por enquanto, redirecionamos para /auth.
        navigate("/auth");
        return;
      }

      setUserData(userDataResult);

      // Carrega as marcas da equipe do usuário.
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*')
        .eq('team_id', userDataResult.team_id)
        .eq('is_deleted', 0); // Filtra para não mostrar marcas deletadas

      if (brandsError) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar as marcas da sua equipe.",
          variant: "destructive",
        });
      } else {
        setBrands(brandsData || []);
      }

      setIsLoading(false);
    };

    getSession();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    // Este estado é alcançado brevemente antes do redirecionamento, caso haja erro.
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        
        <div className="flex-1">
          <DashboardHeader 
            userName={userData.user_name}
            onLogout={handleLogout}
          />
          
          <main className="p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m8 5l4-4 4 4" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      Olá, {userData.user_name.split(' ')[0]}
                    </h1>
                    <p className="text-muted-foreground">
                      Bem vindo ao Creator, seu espaço criativo e inteligente
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {brands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
                
                {brands.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Nenhuma marca criada ainda
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Crie sua primeira marca para começar a gerar conteúdos incríveis com IA.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;