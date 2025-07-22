import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  value_proposition: string;
  current_objective: string;
  created_at: string;
}

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
  // Get first letter of brand name for avatar
  const brandLetter = brand.name.charAt(0).toUpperCase();
  
  return (
    <Card className="border border-primary/20 hover:border-primary/40 transition-colors">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{brandLetter}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">{brand.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {brand.value_proposition}
            </p>
          </div>

          <div className="space-y-2">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Criação de cont... <span className="ml-auto">5 ⚡</span>
            </Button>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
              Calendário <span className="ml-auto">5 ⚡</span>
            </Button>
            <Button className="w-full bg-accent hover:bg-accent/90 text-white">
              Revisões de cont... <span className="ml-auto">5 ⚡</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};