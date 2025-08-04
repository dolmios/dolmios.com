"use client";

import { useEffect, useRef, useState } from "react";

export interface NodeData {
  id: string;
  label: string;
  x: number; // 0-1 relative position
  y: number; // 0-1 relative position
  children?: NodeData[];
}

export interface NodemapProps {
  data: NodeData;
}

export function useNodes(data: NodeData) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 400 });
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [flashingNodes, setFlashingNodes] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  // Calculate container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth || 800;
        setContainerSize({ width, height: 400 });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Flatten the tree structure into positioned nodes
  useEffect(() => {
    if (!data) return;
    
    const flatNodes: NodeData[] = [];
    
    // Add root node
    flatNodes.push({
      ...data,
      x: data.x * containerSize.width,
      y: data.y * containerSize.height,
    });
    
    // Add children
    if (data.children) {
      data.children.forEach(child => {
        flatNodes.push({
          ...child,
          x: child.x * containerSize.width,
          y: child.y * containerSize.height,
        });
        
        // Add grandchildren
        if (child.children) {
          child.children.forEach(grandchild => {
            flatNodes.push({
              ...grandchild,
              x: grandchild.x * containerSize.width,
              y: grandchild.y * containerSize.height,
            });
          });
        }
      });
    }
    
    setNodes(flatNodes);
  }, [data, containerSize]);

  // Animation
  useEffect(() => {
    let start: number | null = null;
    let animationFrame: number;
    const duration = 10000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Draw connections and update active nodes
  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const newActiveNodes = new Set<string>([data.id]);
    const newFlashingNodes = new Set<string>();
    
    // Draw connections from root to children
    if (data.children) {
      const root = nodes.find(n => n.id === data.id);
      if (root) {
        data.children.forEach((child, index) => {
          const childNode = nodes.find(n => n.id === child.id);
          if (childNode) {
            // First wave: root to children (0-0.5 progress)
            const connectionProgress = Math.max(0, Math.min(1, progress * 2));
            drawConnection(ctx, root, childNode, connectionProgress);
            
            // Flash orange briefly when pulse hits children, then fade back
            if (connectionProgress >= 0.7 && connectionProgress <= 1.0) {
              newFlashingNodes.add(child.id);
            }
            
            // Second wave: children to grandchildren (0.5-1.0 progress)
            if (child.children && progress > 0.5) {
              child.children.forEach((grandchild) => {
                const grandchildNode = nodes.find(n => n.id === grandchild.id);
                if (grandchildNode) {
                  const gcProgress = Math.max(0, Math.min(1, (progress - 0.5) * 2)); // 0.5 to 1.0 -> 0 to 1
                  drawConnection(ctx, childNode, grandchildNode, gcProgress);
                  
                  // Flash orange briefly when pulse hits grandchildren, then fade back
                  if (gcProgress >= 0.7 && gcProgress <= 1.0) {
                    newFlashingNodes.add(grandchild.id);
                  }
                }
              });
            }
          }
        });
      }
    }
    
    setActiveNodes(newActiveNodes);
    setFlashingNodes(newFlashingNodes);
  }, [nodes, progress, data]);

  return {
    containerRef,
    canvasRef,
    containerSize,
    nodes,
    activeNodes,
    flashingNodes,
  };
}

function drawConnection(
  ctx: CanvasRenderingContext2D,
  from: NodeData,
  to: NodeData,
  progress: number
) {
  // Draw white base line
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw orange pulse
  if (progress > 0) {
    const currentX = from.x + (to.x - from.x) * progress;
    const currentY = from.y + (to.y - from.y) * progress;
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = 'rgb(255, 140, 0)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
} 