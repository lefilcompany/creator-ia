import { Home, Users, Calendar, FileText, Settings } from "lucide-react";
import { CreatorLogo } from "@/components/ui/creator-logo";

export const AppSidebar = () => {
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Users, label: "Marcas" },
    { icon: Users, label: "Personas" },
    { icon: FileText, label: "Temas" },
    { icon: Calendar, label: "Histórico" },
  ];

  return (
    <div className="w-64 bg-[#1A1C28] border-r border-border min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <CreatorLogo size="sm" />
          <span className="text-xl font-bold text-white">CREATOR</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-6">
          {/* Bloco de Ações com IA */}
          <div className="space-y-3">
            <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Ações com IA</h3>
            <button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-violet-600 transition-all shadow-lg">
              Criar conteúdo
            </button>
            <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
              Criar calendário
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg">
              Revisar conteúdo
            </button>
          </div>

          {/* Bloco de Equipe */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-3">Equipe</h3>
            <div className="text-white/80 text-sm">
              <p>Sua equipe atual</p>
              <p className="text-primary font-medium">Creator Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};