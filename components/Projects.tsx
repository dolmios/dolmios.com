import { Card, Tag, Typography, Block } from "@/ui";
import gradient from "../public/gradient.svg";
import { projects } from "@/data/projects";

export function Projects({ css }: { css?: React.CSSProperties }) {
  return (
    <Card header="Selected Projects" border css={{ padding: 0, overflow: "hidden", position: "relative", height: "auto", ...css }}>
      <Block
        direction="row"
        gap={4}
        css={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "var(--space-3)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project, index) => (
          <Card
            key={index}
            css={{
              width: `${project.variant === "portrait" ? 300 : 420}px !important`,
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
            image={{ url: gradient, alt: project.title, height: 250 }}
          >

              <Typography as="h3" css={{ fontSize: "18px", fontWeight: 500, marginBottom: "var(--space-2)" }}>
                {project.title}
              </Typography>
              <Typography
                as="p"
                css={{
                  opacity: 0.7,
                  lineHeight: 1.5,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
              >
                {project.description}
              </Typography>
              <Block direction="row" gap={2} top={2}>
                {project.tags.map((tag, i) => (
                  <Tag key={i} small>
                    {tag}
                  </Tag>
                ))}
              </Block>

          </Card>
        ))}
      </Block>
    </Card>
  );
} 