import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CreatorLogo } from "@/components/ui/creator-logo";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is logged in, check if they have team access
        const { data: userData } = await supabase
          .from('users')
          .select('team_id')
          .eq('id', session.user.id)
          .single();

        if (userData?.team_id) {
          navigate("/dashboard");
        } else {
          navigate("/auth");
        }
      } else {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <CreatorLogo size="lg" />
        <div className="animate-pulse">
          <p className="text-muted-foreground">Carregando Creator...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
