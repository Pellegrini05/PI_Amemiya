import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  name: string;
  license_plate: string;
}

interface MaintenanceFormProps {
  vehicles: Vehicle[];
  userId: string;
  onSuccess: () => void;
}

const MaintenanceForm = ({ vehicles, userId, onSuccess }: MaintenanceFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_id: "",
    type: "abastecimento",
    description: "",
    amount: "",
    odometer: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("maintenance_records").insert({
        vehicle_id: formData.vehicle_id,
        user_id: userId,
        type: formData.type,
        description: formData.description,
        amount: parseFloat(formData.amount),
        odometer: formData.odometer ? parseInt(formData.odometer) : null,
      });

      if (error) throw error;

      setFormData({
        vehicle_id: "",
        type: "abastecimento",
        description: "",
        amount: "",
        odometer: "",
      });
      
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Erro ao registrar manutenção");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Manutenção/Abastecimento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Veículo *</Label>
              <select
                id="vehicle"
                value={formData.vehicle_id}
                onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Selecione um veículo</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} - {vehicle.license_plate}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="abastecimento">Abastecimento</option>
                <option value="manutencao">Manutenção</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="odometer">Quilometragem</Label>
              <Input
                id="odometer"
                type="number"
                placeholder="Ex: 15000"
                value={formData.odometer}
                onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva os detalhes da manutenção ou abastecimento..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Salvando..." : "Salvar Registro"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MaintenanceForm;
