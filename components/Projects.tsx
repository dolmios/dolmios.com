"use client";

import useSWR from "swr";
import { Card, Text, Stack, Modal, Button } from "stoop";
import Image from "next/image";
import type { Project } from "@/supabase";

export function Projects() {
  const { data, error, isLoading } = useSWR<Project[]>("/api/projects");

  if (isLoading) return <Text>Loading projects…</Text>;
  if (error) return <Text>Failed to load projects</Text>;

  const projects = Array.isArray(data) ? data : [];

  return (
    <Stack>
      <Stack
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        direction="row"
        gap="medium"
      >
        {projects.map((project) => (
          <Stack
            key={project.id}
            css={{
              width: "33%",
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            <Card
              padding="minimal"
              css={{
                padding: 0,
                border: 0,
              }}
            >
              <Stack
                css={{
                  height: "20rem",
                  width: "100%",
                  position: "relative",
                  img: {
                    objectFit: "cover",
                    objectPosition: "center",
                    height: "100%",
                    width: "100%",
                  },
                }}
              >
                {project.cover_image && (
                  <Image src={project.cover_image} alt={project.name} fill />
                )}
              </Stack>
              <Stack css={{ padding: "$medium" }}>
                <Text as="h5">{project.name}</Text>
                {<Text as="small" className="summary">{project.summary}</Text>}
              </Stack>
              <Modal trigger={<Button>View Project</Button>} title={project.name} >
                <Stack>
              <Text as="p" css={{
                whiteSpace: "pre-wrap",
              }}>{project.description}</Text>
              </Stack>
              </Modal>
            </Card>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}