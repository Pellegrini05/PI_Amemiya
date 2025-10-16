import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, DollarSign, Gauge } from "lucide-react";

interface MaintenanceRecord {
  id: string;
  type: string;
  description: string;
  amount: number;
  odometer: number | null;
  created_at: string;
  vehicles: {
    name: string;
    license_plate: string;
  };
  profiles: {
    full_name: string;
  };
}

const MaintenanceHistory = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("maintenance_records")
        .select(`
          *,
          vehicles (name, license_plate),
          profiles (full_name)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecords(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar histórico");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Nenhum registro de manutenção encontrado.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {record.vehicles.name} - {record.vehicles.license_plate}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Registrado por {record.profiles.full_name}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {record.type}
              </Badge>
            </div>

            {record.description && (
              <p className="text-sm mb-4 text-muted-foreground">{record.description}</p>
            )}

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Valor</p>
                  <p className="font-semibold">
                    R$ {record.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              {record.odometer && (
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Km</p>
                    <p className="font-semibold">{record.odometer.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="font-semibold">
                    {new Date(record.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MaintenanceHistory;
