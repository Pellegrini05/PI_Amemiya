import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-amemiya.png";
import { Car, TrendingUp, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <img src={logo} alt="AMEMIYA" className="h-20 object-contain mx-auto" />
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sistema de Gestão de Frota
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Controle completo de manutenção preventiva, abastecimento e rastreamento 
            para a frota da AMEMIYA - Usinagem de Precisão
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/login")}>
              Acessar Sistema
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center space-y-4 p-6 rounded-lg bg-card border shadow-sm">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Gestão de Veículos</h3>
            <p className="text-muted-foreground">
              Acompanhe toda a frota com informações detalhadas de cada veículo
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card border shadow-sm">
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Controle de Gastos</h3>
            <p className="text-muted-foreground">
              Registre e monitore todos os gastos com manutenção e abastecimento
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card border shadow-sm">
            <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Acesso Seguro</h3>
            <p className="text-muted-foreground">
              Sistema com autenticação e permissões diferenciadas por usuário
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
