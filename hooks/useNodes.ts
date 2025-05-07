import { useEffect, useRef, useState } from "react";

export interface Node {
  active?: boolean;
  color: string;
  group: 1 | 2 | 3 | 4;
  id: string;
  label: string;
  type: "primary" | "secondary" | "tertiary";
  x: number;
  y: number;
}

export interface Connection {
  active?: boolean;
  dashed?: boolean;
  group: 1 | 2 | 3 | 4;
  source: string;
  target: string;
}

const INITIAL_NODE_DATA = [
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

const CONNECTION_DATA = [
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

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawConnections(
  ctx: CanvasRenderingContext2D,
  layoutNodes: Node[],
  layoutConnections: Connection[],
  width: number,
  height: number,
  animationProgress: { [key: number]: number }
) {
  ctx.clearRect(0, 0, width, height);
  layoutConnections.forEach((connection) => {
    const source = layoutNodes.find(node => node.id === connection.source);
    const target = layoutNodes.find(node => node.id === connection.target);
    if (source && target) {
      ctx.beginPath();
      if (connection.dashed) {
        ctx.setLineDash([5, 5]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
  layoutConnections.forEach((connection) => {
    const source = layoutNodes.find(node => node.id === connection.source);
    const target = layoutNodes.find(node => node.id === connection.target);
    if (source && target) {
      const sourceX = source.x;
      const sourceY = source.y;
      const targetX = target.x;
      const targetY = target.y;
      const rawProgress = animationProgress[connection.group] || 0;
      const easedProgress = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
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
            if (progress === 1 && (connection as any).active) {
              ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
            } else {
              const colorParts = target.color.match(/\d+/g);
              if (colorParts && colorParts.length >= 3) {
                const [r, g, b] = colorParts;
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
              } else {
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

export function useNodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [layoutNodes, setLayoutNodes] = useState<Node[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [groupAnimations, setGroupAnimations] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [activeConnectionFlags, setActiveConnectionFlags] = useState<boolean[]>([]);
  const [activeNodes, setActiveNodes] = useState<{ [key: string]: boolean }>({});
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const activateNode = (nodeId: string) => {
    setActiveNodes(prev => ({ ...prev, [nodeId]: true }));
  };
  const activateConnection = (connectionIndex: number) => {
    setActiveConnectionFlags(prev => {
      const updated = [...prev];
      updated[connectionIndex] = true;
      return updated;
    });
  };

  useEffect(() => {
    setActiveConnectionFlags(new Array(CONNECTION_DATA.length).fill(false));
    const updateLayout = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        const newLayoutNodes = INITIAL_NODE_DATA.map(initialNode => ({
          ...initialNode,
          x: initialNode.relX * width,
          y: initialNode.relY * height,
          group: initialNode.group as 1 | 2 | 3 | 4,
          type: initialNode.type as 'primary' | 'secondary' | 'tertiary',
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
  }, []);

  useEffect(() => {
    if (!animationStarted || layoutNodes.length === 0) return;
    const totalDuration = 5000;
    const animateRenderedConnections = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;
      const linearProgress = Math.min(elapsedTime / totalDuration, 1);
      const newGroupAnimations = { 1: linearProgress, 2: linearProgress, 3: linearProgress, 4: linearProgress };
      setGroupAnimations(newGroupAnimations);
      CONNECTION_DATA.forEach((connectionData, idx) => {
        const sourceNode = layoutNodes.find(n => n.id === connectionData.source);
        let segmentProgressForActivation = 0;
        if (sourceNode) {
          if (sourceNode.id === "core") {
            segmentProgressForActivation = Math.min(easeInOutCubic(linearProgress) * 2, 1);
          } else {
            segmentProgressForActivation = Math.max(0, Math.min((easeInOutCubic(linearProgress) - 0.5) * 2, 1));
          }
        }
        if (segmentProgressForActivation >= 0.99 && !activeNodes[connectionData.target]) {
          activateConnection(idx);
          activateNode(connectionData.target);
        }
      });
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
  }, [animationStarted, layoutNodes, activeConnectionFlags, activeNodes]);

  // Canvas drawing effect
  useEffect(() => {
    if (!canvasRef.current || layoutNodes.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const connectionsToDraw = CONNECTION_DATA.map((conn, idx) => ({
      ...conn,
      active: activeConnectionFlags[idx],
    })) as any[];
    drawConnections(ctx, layoutNodes, connectionsToDraw, dimensions.width, dimensions.height, groupAnimations);
  }, [layoutNodes, dimensions, activeConnectionFlags, groupAnimations, canvasRef]);

  return {
    containerRef,
    canvasRef,
    dimensions,
    layoutNodes,
    groupAnimations,
    activeConnectionFlags,
    activeNodes,
    CONNECTION_DATA,
    INITIAL_NODE_DATA,
  };
} 