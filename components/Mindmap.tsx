import { type CSS } from "@stitches/react";
import { useEffect, useRef, useState } from "react";
import { type JSX } from "react";

import { styled } from "../stitches.config";

import { Box } from "./Box";
import { Tag } from "./Tag";
import { Text } from "./Text";

const staticTextColor = "rgb(31, 41, 55)";

// Define types for initial data and processed node data
interface InitialNodeData {
  color: string;
  // For connection lines
  group: 1 | 2 | 3 | 4;
  id: string;
  label: string; 
  relX: number;
  // Relative X position (0.0 to 1.0)
  relY: number; 
  type: "primary" | "secondary" | "tertiary"; // Relative Y position (0.0 to 1.0)
}

interface Node { 
  active?: boolean;
  color: string;
  group: 1 | 2 | 3 | 4;
  // Processed node with absolute coordinates
  id: string;
  label: string;
  type: "primary" | "secondary" | "tertiary";
  x: number;
  y: number; // This might be dynamically added or managed by activeNodes state
}

interface Connection { 
  active?: boolean;
  dashed?: boolean;
  group: 1 | 2 | 3 | 4;
  // Remains the same
  source: string;
  target: string; // Added dynamically
}

// Static definitions for nodes and connections
const INITIAL_NODE_DATA: InitialNodeData[] = [
  { id: "core", label: "Full-Stack", relX: 0.5, relY: 0.5, type: "primary", color: "rgb(221, 155, 155)", group: 1 },
  { id: "frontend", label: "Frontend", relX: 0.25, relY: 0.3, type: "secondary", color: "rgb(221, 155, 155)", group: 1 },
  { id: "backend", label: "Backend", relX: 0.75, relY: 0.3, type: "secondary", color: "rgb(165, 197, 197)", group: 2 },
  { id: "design", label: "Design", relX: 0.35, relY: 0.7, type: "secondary", color: "rgb(198, 186, 221)", group: 3 },
  { id: "architecture", label: "Architecture", relX: 0.65, relY: 0.7, type: "secondary", color: "rgb(226, 184, 118)", group: 4 },
  { id: "react", label: "React", relX: 0.15, relY: 0.2, type: "tertiary", color: "rgb(221, 155, 155)", group: 1 },
  { id: "next", label: "Next.js", relX: 0.3, relY: 0.15, type: "tertiary", color: "rgb(221, 155, 155)", group: 1 },
  { id: "node", label: "Node.js", relX: 0.7, relY: 0.15, type: "tertiary", color: "rgb(165, 197, 197)", group: 2 },
  { id: "db", label: "Databases", relX: 0.85, relY: 0.25, type: "tertiary", color: "rgb(165, 197, 197)", group: 2 },
  { id: "ui", label: "UI/UX", relX: 0.25, relY: 0.85, type: "tertiary", color: "rgb(198, 186, 221)", group: 3 },
  { id: "systems", label: "Systems", relX: 0.75, relY: 0.85, type: "tertiary", color: "rgb(226, 184, 118)", group: 4 },
];

const CONNECTION_DATA: Omit<Connection, 'active'>[] = [ // Omit 'active' as it's dynamic
  { source: "core", target: "frontend", group: 1 },
  { source: "core", target: "backend", group: 2 },
  { source: "core", target: "design", group: 3 },
  { source: "core", target: "architecture", group: 4 },
  { source: "frontend", target: "react", dashed: true, group: 1 },
  { source: "frontend", target: "next", dashed: true, group: 1 },
  { source: "backend", target: "node", dashed: true, group: 2 },
  { source: "backend", target: "db", dashed: true, group: 2 },
  { source: "design", target: "ui", dashed: true, group: 3 },
  { source: "architecture", target: "systems", dashed: true, group: 4 },
];

interface MindmapProps {
  css?: CSS;
}

const MindmapContainer = styled("div", {
  width: "100%",
  height: "400px",
  position: "relative",
  overflow: "hidden",
  padding: "$3",
});

const Canvas = styled("canvas", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
});

const NodeElement = styled("div", {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  transition: "opacity 0.5s ease",
  
  variants: {
    type: {
      primary: {
        // Core central node
      },
      secondary: {
        // Direct connections
      },
      tertiary: {
        // Secondary connections
        opacity: 0.8,
      }
    }
  }
});

// Smooth easing function
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Circuit path animation
function drawConnections(
  ctx: CanvasRenderingContext2D,
  layoutNodes: Node[], // Changed to use processed nodes
  layoutConnections: Connection[], // Changed to use connections with active state
  width: number,
  height: number,
  animationProgress: { [key: number]: number }
): void {
  ctx.clearRect(0, 0, width, height);

  layoutConnections.forEach((connection) => {
    const source = layoutNodes.find(node => node.id === connection.source);
    const target = layoutNodes.find(node => node.id === connection.target);

    if (source && target) {
      // ... (rest of the base line drawing logic remains the same, using source.x, source.y, target.x, target.y) ...
      ctx.beginPath();
      
      if (connection.dashed) {
        ctx.setLineDash([5, 5]);
      } else {
        ctx.setLineDash([]);
      }
      
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      
      const defaultColor = "rgba(255, 255, 255, 0.12)";

      ctx.strokeStyle = defaultColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });

  layoutConnections.forEach((connection) => { // Iterate again for animated lines
    const source = layoutNodes.find(node => node.id === connection.source);
    const target = layoutNodes.find(node => node.id === connection.target);

    if (source && target) {
      // ... (rest of the animated power line drawing logic remains, using source.x, source.y, target.x, target.y and target.color) ...
      const sourceX = source.x;
      const sourceY = source.y;
      const targetX = target.x;
      const targetY = target.y;
      
      const rawProgress = animationProgress[connection.group] || 0;
      const easedProgress = easeInOutCubic(rawProgress);
      
      if (easedProgress > 0) {
        let progress = 0;
        
        if (source.id === "core") {
          progress = Math.min(easedProgress * 2, 1);
        } else {
          progress = Math.max(0, Math.min((easedProgress - 0.5) * 2, 1));
        }
        
        if (progress > 0) {
          const currentX = sourceX + (targetX - sourceX) * progress;
          const currentY = sourceY + (targetY - sourceY) * progress;
          
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(sourceX, sourceY);
          ctx.lineTo(currentX, currentY);
          
          if (target) {
            if (progress === 1 && connection.active) {
              ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
            } else {
              const colorParts = target.color.match(/\d+/g);

              if (colorParts && colorParts.length >= 3) {
                const [r, g, b] = colorParts;

                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
              } else {
                // Fallback if color string is not as expected, though INITIAL_NODE_DATA.color should be reliable
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"; 
              }
            }
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
    }
  });
}

export function Mindmap({ css }: MindmapProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  
  // State for processed nodes with absolute positions
  const [layoutNodes, setLayoutNodes] = useState<Node[]>([]);

  const [animationStarted, setAnimationStarted] = useState(false);
  const [groupAnimations, setGroupAnimations] = useState<{ [key: number]: number }>({
    1: 0, 2: 0, 3: 0, 4: 0
  });
  // activeConnections state: maps original CONNECTION_DATA index to boolean active state
  const [activeConnectionFlags, setActiveConnectionFlags] = useState<boolean[]>([]);
  const [activeNodes, setActiveNodes] = useState<{ [key: string]: boolean }>({});
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Removed direct definition of nodes and connections array from here

  const activateNode = (nodeId: string) => {
    setActiveNodes(prev => ({ ...prev, [nodeId]: true }));
  };

  const activateConnection = (connectionIndex: number) => { // Takes index in CONNECTION_DATA
    setActiveConnectionFlags(prev => {
      const updated = [...prev];

      updated[connectionIndex] = true;

      return updated;
    });
  };

  useEffect(() => {
    // Initialize active connections array based on CONNECTION_DATA length
    setActiveConnectionFlags(new Array(CONNECTION_DATA.length).fill(false));

    const updateLayout = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();

        setDimensions({ width, height });

        // Calculate absolute positions for nodes
        const newLayoutNodes = INITIAL_NODE_DATA.map(initialNode => ({
          ...initialNode,
          x: initialNode.relX * width,
          y: initialNode.relY * height,
        }));

        setLayoutNodes(newLayoutNodes);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    const timer = setTimeout(() => {
      setAnimationStarted(true);
      startTimeRef.current = Date.now();
      activateNode("core");
    }, 300);

    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array: runs once on mount for setup

  useEffect(() => {
    if (!animationStarted || layoutNodes.length === 0) return;
    const totalDuration = 5000;
    const animateRenderedConnections = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;
      const linearProgress = Math.min(elapsedTime / totalDuration, 1);
      const easedLinearProgress = easeInOutCubic(linearProgress); // Calculate eased progress for activation logic

      // groupAnimations still uses linearProgress, as drawConnections applies easing internally
      const newGroupAnimations = { 1: linearProgress, 2: linearProgress, 3: linearProgress, 4: linearProgress };

      setGroupAnimations(newGroupAnimations);

      CONNECTION_DATA.forEach((connectionData, idx) => {
        const sourceNode = layoutNodes.find(n => n.id === connectionData.source);
        let segmentProgressForActivation = 0;

        if (sourceNode) {
          // Use EASED linear progress for calculating activation segment progress
          if (sourceNode.id === "core") {
            segmentProgressForActivation = Math.min(easedLinearProgress * 2, 1);
          } else {
            segmentProgressForActivation = Math.max(0, Math.min((easedLinearProgress - 0.5) * 2, 1));
          }
        }

        // Activate when the (eased) line segment drawing is complete and target isn't already active
        if (segmentProgressForActivation >= 0.99 && !activeNodes[connectionData.target]) {
          activateConnection(idx); 
          activateNode(connectionData.target);
        }
      });

      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const connectionsToDraw = CONNECTION_DATA.map((conn, idx) => ({
            ...conn,
            active: activeConnectionFlags[idx]
          }));

          drawConnections(ctx, layoutNodes, connectionsToDraw, dimensions.width, dimensions.height, newGroupAnimations);
        }
      }

      if (linearProgress < 1.02) {
        animationFrameRef.current = requestAnimationFrame(animateRenderedConnections);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateRenderedConnections);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationStarted, layoutNodes, dimensions.width, dimensions.height, activeConnectionFlags, activeNodes]);

  useEffect(() => {
    // Draw connections whenever critical states change (dimensions, active flags, animation progress, or nodes themselves)
    const canvas = canvasRef.current;

    if (canvas && layoutNodes.length > 0) { // Ensure layoutNodes is populated
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        
        const connectionsToDraw = CONNECTION_DATA.map((conn, idx) => ({
          ...conn,
          active: activeConnectionFlags[idx]
        }));
        
        drawConnections(ctx, layoutNodes, connectionsToDraw, dimensions.width, dimensions.height, groupAnimations);
      }
    }
  }, [layoutNodes, dimensions, activeConnectionFlags, groupAnimations]); // Dependencies for re-drawing static state

  return (
    <Box border css={{ ...css, padding: 0 }}>
      <Text 
        as="h2"
        css={{ 
          fontSize: "14px", 
          fontWeight: "normal", 
          textTransform: "uppercase", 
          margin: 0,
          padding: "$2 $3",
          borderBottom: "1px solid $border"
        }}>
        Skills Network
      </Text>
      
      <MindmapContainer ref={containerRef}>
        <Canvas ref={canvasRef} />
        
        {layoutNodes.map((node) => {
          const isActive = activeNodes[node.id];
          const currentLabel = `✺ ${node.label}`;

          // Base styles that are always applied
          const tagCssProps: CSS = {
            border: "1px solid transparent",
            display: "inline-flex",
            alignItems: "center",
            gap: "$1",
            color: staticTextColor,
            // background will be conditionally added below
          };

          // Apply type-specific padding and boxShadow
          if (node.type === "primary") {
            tagCssProps.padding = "$2 $3";
            tagCssProps.boxShadow = "$1";
          } else if (node.type === "secondary") {
            tagCssProps.padding = "$1 $2";
          } else { // tertiary
            tagCssProps.padding = "$0 $1";
          }

          // Conditionally set background ONLY for active (non-core) nodes
          if (isActive && node.id !== 'core') {
            tagCssProps.background = node.color; 
          }
          // For inactive nodes and the core node, `tagCssProps.background` remains undefined,
          // allowing the default background from the <Tag> component to take effect.

          return (
            <NodeElement 
              key={node.id} 
              style={{ 
                left: `${node.x}px`, 
                top: `${node.y}px`,
              }}
              type={node.type}
            >
              <Tag 
                bold={node.type === "primary"}
                css={tagCssProps}
                small={node.type === "tertiary"}
              >
                {currentLabel}
              </Tag>
            </NodeElement>
          );
        })}
      </MindmapContainer>
    </Box>
  );
} 