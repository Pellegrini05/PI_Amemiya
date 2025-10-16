import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Truck } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  license_plate: string;
  type: string;
  model: string;
  year: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const Icon = vehicle.type === "caminhonete" ? Truck : Car;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{vehicle.name}</CardTitle>
          </div>
          <Badge variant="secondary" className="capitalize">
            {vehicle.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Placa:</span>
          <span className="font-mono font-semibold">{vehicle.license_plate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Modelo:</span>
          <span className="font-medium">{vehicle.model}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Ano:</span>
          <span className="font-medium">{vehicle.year}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
