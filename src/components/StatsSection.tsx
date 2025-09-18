import { TrendingUp, Users, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    label: "Active Citizens",
    value: "25,847",
    change: "+12.5%",
    color: "text-primary",
    bgGradient: "from-primary/10 to-primary/5",
  },
  {
    icon: TrendingUp,
    label: "Issues Reported",
    value: "5,234",
    change: "+8.2%",
    color: "text-accent",
    bgGradient: "from-accent/10 to-accent/5",
  },
  {
    icon: CheckCircle,
    label: "Issues Resolved",
    value: "3,891",
    change: "+15.7%",
    color: "text-success",
    bgGradient: "from-success/10 to-success/5",
  },
  {
    icon: Clock,
    label: "Avg. Resolution Time",
    value: "4.2 days",
    change: "-23.1%",
    color: "text-warning",
    bgGradient: "from-warning/10 to-warning/5",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Platform Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time statistics showing how CivicConnect is making a difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-glow hover:scale-105 border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center mb-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className={`${stat.color} font-medium`}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      this month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;