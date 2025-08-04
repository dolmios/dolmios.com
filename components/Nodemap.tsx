"use client";

import { type JSX } from "react";

import { useNodes } from "../hooks/useNodes";
import { Card, Badge } from "stoop"; 

const skillsData = {
  id: "fullstack",
  label: "Full-Stack",
  x: 0.5,
  y: 0.5,
  children: [
    {
      id: "frontend",
      label: "Frontend",
      x: 0.25,
      y: 0.3,
      children: [
        { id: "react", label: "React", x: 0.15, y: 0.2 },
        { id: "nextjs", label: "Next.js", x: 0.35, y: 0.15 },
      ]
    },
    {
      id: "backend",
      label: "Backend", 
      x: 0.75,
      y: 0.3,
      children: [
        { id: "nodejs", label: "Node.js", x: 0.7, y: 0.15 },
        { id: "postgresql", label: "PostgreSQL", x: 0.85, y: 0.25 },
        { id: "apis", label: "APIs", x: 0.8, y: 0.18 },
      ]
    },
    {
      id: "design",
      label: "Design",
      x: 0.35,
      y: 0.7,
      children: [
        { id: "uiux", label: "UI/UX", x: 0.25, y: 0.85 },
      ]
    },
    {
      id: "architecture",
      label: "Cloud & Architecture",
      x: 0.65,
      y: 0.7,
      children: [
        { id: "cloud", label: "Cloud", x: 0.7, y: 0.8 },
        { id: "systems", label: "Distributed Systems", x: 0.75, y: 0.85 },
        { id: "devops", label: "DevOps", x: 0.68, y: 0.9 },
      ]
    },
  ]
};

export function Nodemap(): JSX.Element {
  const {
    containerRef,
    canvasRef,
    containerSize,
    nodes,
    flashingNodes,
  } = useNodes(skillsData);

  return (
    <Card 
      variant="default"
      css={{ 
        padding: 0, 
        overflow: 'hidden', 
        position: 'relative', 
        height: 'auto' 
      }}
    >
          <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '400px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          width={containerSize.width}
          height={containerSize.height}
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 1,
            width: '100%',
            height: '100%',
           }}
        />
        
        {nodes.map((node) => {
          const isRoot = node.id === skillsData.id;
          
          // Check if this is a sub-node (grandchild)
          const isSubNode = skillsData.children?.some(child => 
            child.children?.some(grandchild => grandchild.id === node.id)
          ) || false;
          
          // Root stays white, children flash orange, sub-nodes flash orange then back to white
          let theme: "white" | "orange" = "white";
          let opacity = 1;
          
          if (isRoot) {
            theme = "white";
          } else {
            const isFlashing = flashingNodes.has(node.id);
            theme = isFlashing ? "orange" : "white";
            
            if (isSubNode) {
              opacity = isFlashing ? 1 : 0.8;
              if (!isFlashing) {
                  opacity = 0.8;
              }
            }
          }

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                opacity,
                transition: 'opacity 0.3s ease',
              }}
            >
              <Badge
              >
                {node.label}
              </Badge>
            </div>
          );
        })}
        </div>
    </Card>
  );
} 