import { useNodes } from "../hooks/useNodes";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Typography } from "../ui/Typography";
import { Block } from "@/ui";
import { useEffect, type JSX } from "react";

function drawConnections(
  ctx: CanvasRenderingContext2D,
  layoutNodes: ReturnType<typeof useNodes>["layoutNodes"],
  layoutConnections: any[],
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
            if (progress === 1 && connection.active) {
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

export function Nodemap(): JSX.Element {
  const {
    containerRef,
    canvasRef,
    dimensions,
    layoutNodes,
    groupAnimations,
    activeConnectionFlags,
    activeNodes,
    CONNECTION_DATA,
  } = useNodes();

  useEffect(() => {
    if (!canvasRef.current || layoutNodes.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const connectionsToDraw = CONNECTION_DATA.map((conn, idx) => ({
      ...conn,
      active: activeConnectionFlags[idx],
    })) as any[];
    drawConnections(ctx, layoutNodes, connectionsToDraw, dimensions.width, dimensions.height, groupAnimations);
  }, [layoutNodes, dimensions, activeConnectionFlags, groupAnimations, CONNECTION_DATA, canvasRef]);

  return (
    <Card border header="Skills Network" css={{ padding: 0, overflow: 'hidden', position: 'relative', height: 'auto' }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: 400,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {layoutNodes.map((node) => {
          const isActive = activeNodes[node.id];
          const currentLabel = `✺ ${node.label}`;
          let tagBg = isActive && node.id !== 'core' ? node.color : undefined;
          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                opacity: node.type === 'tertiary' ? 0.8 : 1,
                transition: 'opacity 0.5s',
              }}
            >
              <Tag
                bold={node.type === 'primary'}
                small={node.type === 'tertiary'}
                css={tagBg ? { background: tagBg } : undefined}
              >
                <Typography as="span" css={{ fontWeight: 500, fontSize: node.type === 'primary' ? 18 : 14 }}>
                  {currentLabel}
                </Typography>
              </Tag>
            </div>
          );
        })}
      </div>
    </Card>
  );
} 