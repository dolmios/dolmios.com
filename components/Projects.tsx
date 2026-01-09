"use client";

import { type JSX, useState } from "react";
import { Button, Stack, Text } from "stoop-ui";

import type { Project } from "@/db/schema";

function ProjectCard({
  isActive,
  onToggle,
  project,
}: {
  isActive: boolean;
  onToggle: () => void;
  project: Project;
}): JSX.Element {
  return (
    <Stack css={{ position: "relative" }}>
      <Stack
        css={{
          alignItems: "center",
          backgroundColor: "$hover",
          borderRadius: "$small",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "1fr",
          height: "350px",
          justifyContent: "center",
          padding: "$medium",
        }}
        direction="column"
        gap="small"
        onClick={onToggle}>
        <Stack
          css={{
            gridColumn: "1",
            gridRow: "1",
            opacity: isActive ? 0 : 1,
            pointerEvents: isActive ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
          direction="column"
          gap="small">
          <Text
            css={{
              color: "$danger",
              margin: 0,
              textAlign: "center",
            }}
            variant="strong">
            {project.title}
          </Text>
          <Text
            css={{
              textAlign: "center",
              textTransform: "uppercase",
            }}
            variant="small">
            {project.projectType} ({project.year})
          </Text>
        </Stack>
        <Stack
          css={{
            gridColumn: "1",
            gridRow: "1",
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
          direction="column"
          gap="small">

          <Text
            css={{
              textAlign: "center",
            }}
            variant="small">
            {project.description}
          </Text>
        </Stack>
      </Stack>
      {project.url && (
        <Button
          as="a"
          css={{
            position: "absolute",
            right: "$small",
            top: "$small",
            zIndex: 10,
          }}
          href={project.url}
          rel="noopener noreferrer"
          size="small"
          target="_blank"
          onClick={(e): void => e.stopPropagation()}>
          {"\u2197"}
        </Button>
      )}
    </Stack>
  );
}

export function Projects({ projects }: { projects: Project[] }): JSX.Element {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const handleProjectClick = (projectId: string): void => {
    setActiveProjectId((current) => (current === projectId ? null : projectId));
  };

  return (
    <Stack
      css={{
        desktop: {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
        display: "grid",
        gap: "$medium",
        gridTemplateColumns: "repeat(2, 1fr)",
        mobile: {
          gridTemplateColumns: "1fr",
        },
      }}>
      {projects.map((project: Project) => (
        <ProjectCard
          key={project.id}
          isActive={activeProjectId === project.id}
          project={project}
          onToggle={() => handleProjectClick(project.id)}
        />
      ))}
    </Stack>
  );
}
