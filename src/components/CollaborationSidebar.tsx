import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Plus, 
  Search,
  Clock,
  Shield,
  Eye
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const CollaborationSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const collaborators = [
    { name: "Dr. Sarah Chen", role: "Lead Researcher", status: "online", initials: "SC" },
    { name: "Prof. Michael Johnson", role: "Data Scientist", status: "online", initials: "MJ" },
    { name: "Dr. Emily Rodriguez", role: "Cryptographer", status: "offline", initials: "ER" },
  ];

  const recentDocuments = [
    { title: "Privacy Analysis Report", modified: "2 hours ago", encrypted: true },
    { title: "Statistical Methods", modified: "1 day ago", encrypted: true },
    { title: "Research Protocol v3", modified: "3 days ago", encrypted: false },
  ];

  const recentActivity = [
    { user: "Dr. Chen", action: "commented on", target: "Section 3", time: "10 min ago" },
    { user: "Prof. Johnson", action: "updated", target: "Data Analysis", time: "1 hour ago" },
    { user: "Dr. Rodriguez", action: "reviewed", target: "Encryption Methods", time: "2 hours ago" },
  ];

  return (
    <div className="w-80 bg-card border-r border-border p-4 space-y-6 overflow-y-auto">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Active Collaborators */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-research-blue" />
            Active Collaborators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {collaborators.map((collaborator, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-research-blue text-white">
                  {collaborator.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{collaborator.name}</p>
                <p className="text-xs text-muted-foreground">{collaborator.role}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                collaborator.status === 'online' ? 'bg-research-green' : 'bg-muted'
              }`} />
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
            <Plus className="h-4 w-4" />
            Invite Researcher
          </Button>
        </CardContent>
      </Card>

      {/* Recent Documents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-research-green" />
            Recent Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentDocuments.map((doc, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{doc.title}</p>
                  {doc.encrypted && (
                    <Shield className="h-3 w-3 text-secure-purple flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{doc.modified}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-accent" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="text-xs space-y-1">
              <div className="flex items-center gap-1">
                <span className="font-medium">{activity.user}</span>
                <span className="text-muted-foreground">{activity.action}</span>
                <span className="font-medium">{activity.target}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {activity.time}
              </div>
              {index < recentActivity.length - 1 && <Separator className="mt-2" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};