import { Header } from "@/components/Header";
import { DocumentEditor } from "@/components/DocumentEditor";
import { CollaborationSidebar } from "@/components/CollaborationSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <CollaborationSidebar />
        <div className="flex-1 p-6">
          <DocumentEditor />
        </div>
      </div>
    </div>
  );
};

export default Index;
