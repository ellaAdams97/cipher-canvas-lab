import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code,
  Save,
  Share,
  Lock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const DocumentEditor = () => {
  const [title, setTitle] = useState("Untitled Research Document");
  const [content, setContent] = useState(`# Research Findings

## Introduction
This document contains confidential research data encrypted using Fully Homomorphic Encryption (FHE). All computations and collaborations happen on encrypted data, ensuring complete privacy.

## Methodology
- Data collection protocols
- Statistical analysis methods
- Privacy-preserving techniques

## Results
[Encrypted data analysis results would appear here]

## Conclusions
The research demonstrates the effectiveness of FHE in maintaining data confidentiality while enabling collaborative research.

---
*This document is secured with FHE encryption*`);

  const formatButtons = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Numbered List" },
    { icon: Quote, label: "Quote" },
    { icon: Code, label: "Code" },
  ];

  return (
    <div className="flex-1 bg-notebook-paper border border-notebook-line rounded-lg shadow-lg overflow-hidden">
      {/* Document Header */}
      <div className="bg-secondary/50 border-b border-notebook-line p-4">
        <div className="flex items-center justify-between mb-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none p-0 focus-visible:ring-0"
          />
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-secure-purple border-secure-purple/30">
              <Lock className="h-3 w-3" />
              FHE Encrypted
            </Badge>
            <Button variant="outline" size="sm" className="gap-1">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="gap-1 bg-research-blue hover:bg-research-blue/90">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
        
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1">
          {formatButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-research-blue/10"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
          <Separator orientation="vertical" className="h-6 mx-2" />
          <Button variant="ghost" size="sm" className="text-xs px-2">
            Normal Text
          </Button>
        </div>
      </div>
      
      {/* Editor Content */}
      <div className="p-6">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[600px] bg-transparent border-none resize-none focus-visible:ring-0 text-base leading-relaxed p-0"
          placeholder="Start writing your encrypted research..."
        />
      </div>
    </div>
  );
};