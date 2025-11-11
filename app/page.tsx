"use client";

import { useState, type JSX } from "react";
import useSWR from "swr";

import type { Project } from "@/supabase";

import { Song } from "@/components/Song";
import { Button, Card, Input, Modal, Section, Stack, Tabs, Text, Textarea } from "@/ui";

function ContactModal(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Modal
      title="Get in touch"
      trigger={
        <Button
          css={{
            alignItems: "center",
            display: "flex",
            fontSize: "1rem",
            gap: "$small",
          }}
          variant="minimal"
        >
          <span>👁</span>
          <span>How can I help?</span>
        </Button>
      }
    >
      <Stack direction="column" gap="large">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textarea
          placeholder="Your message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => {
            // Send functionality to be added later
            console.log({ email, message, name });
          }}
        >
          Send
        </Button>
      </Stack>
    </Modal>
  );
}

function AboutView(): JSX.Element {
  return (
    <Stack direction="column" gap="larger">
      <Text as="p" css={{ fontSize: "clamp(1.125rem, 1.3vw, 1.25rem)", lineHeight: "1.7" }}>
        Full-Stack Developer based in New York. I build things and lead teams that build things.
        Currently working in the proptech space as engineering lead at Consolia, co-founder at Cosmo,
        and working on AirIndex in my spare time.
      </Text>
      <Text as="p" css={{ fontSize: "clamp(1.125rem, 1.3vw, 1.25rem)", lineHeight: "1.7" }}>
        I'm drawn to projects where technology serves a clear purpose—whether that's architecting
        web applications from the ground up or scaling existing systems to handle real growth.
      </Text>
    </Stack>
  );
}

function ProjectsView({
  projects,
}: {
  projects?: Project[];
}): JSX.Element {
  const projectList = Array.isArray(projects) ? projects : [];

  if (projectList.length === 0) {
    return (
      <Text css={{ opacity: 0.7, textAlign: "center" }}>No projects found</Text>
    );
  }

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <Stack direction="column" gap="large">
      {projectList.map((project) => (
        <Card
          key={project.id}
          css={{
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              transform: "translateY(-2px)",
            },
            alignItems: "flex-start",
            cursor: project.url ? "pointer" : "default",
            display: "flex",
            flexDirection: "row",
            gap: "$large",
            justifyContent: "space-between",
            padding: "0",
          }}
          onClick={() => {
            if (project.url) window.open(project.url, "_blank");
          }}
        >
          <Stack direction="column" gap="small" css={{ flex: 1 }}>
            <Text
              css={{
                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {project.name}
            </Text>
            {(project.summary || project.description) && (
              <Text
                css={{
                  color: "$text",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: 0,
                  opacity: 0.7,
                }}
              >
                {project.summary || project.description}
              </Text>
            )}
            {project.date && (
              <Text
                css={{
                  color: "$text",
                  fontSize: "0.875rem",
                  margin: 0,
                  opacity: 0.5,
                }}
              >
                {formatDate(project.date)}
              </Text>
            )}
          </Stack>
          {project.url && (
            <Button
              as="a"
              href={project.url}
              rel="noopener noreferrer"
              size="small"
              target="_blank"
              variant="minimal"
              css={{ flexShrink: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              View
            </Button>
          )}
        </Card>
      ))}
    </Stack>
  );
}

export default function Home(): JSX.Element {
  const [activeTab, setActiveTab] = useState("projects");
  const { data: projects } = useSWR<Project[]>("/api/projects");

  return (
    <Section
      as="main"
      css={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "1200px",
        minHeight: "100vh",
        padding: "$huge $large",
        width: "100%",
      }}
    >
      {/* Large Logo */}
      <Stack
        css={{
          marginBottom: "$huge",
        }}
        direction="column"
      >
        <Text
          as="h1"
          css={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            fontWeight: "700",
            letterSpacing: "-0.03em",
            lineHeight: "0.95",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Jackson Dolman
        </Text>
      </Stack>

      {/* Navigation Row: Projects/About tabs + GitHub */}
      <Stack
        align="flex-end"
        css={{
          marginBottom: "$huge",
        }}
        direction="row"
        justify="between"
      >
        {/* Left side: Projects/About tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          css={{ flex: 1, maxWidth: "400px" }}
        >
          <Tabs.List>
            <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
            <Tabs.Trigger value="about">About</Tabs.Trigger>
          </Tabs.List>
        </Tabs>

        {/* Right side: GitHub button */}
        <a
          href="https://github.com/dolmios"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Button variant="minimal">GitHub</Button>
        </a>
      </Stack>

      {/* Tab Content */}
      <Stack
        css={{
          marginBottom: "$massive",
        }}
        direction="column"
      >
        {activeTab === "projects" && <ProjectsView projects={projects} />}
        {activeTab === "about" && <AboutView />}
      </Stack>

      {/* How can I help button - Centered */}
      <Stack
        css={{
          alignItems: "center",
          marginBottom: "$massive",
        }}
      >
        <ContactModal />
      </Stack>

      {/* Footer */}
      <Stack
        as="footer"
        css={{
          marginTop: "auto",
          paddingTop: "$massive",
        }}
        direction="column"
      >
        <Stack
          css={{
            alignItems: "center",
            textAlign: "center",
          }}
          direction="column"
          gap="larger"
        >
          {/* Song component */}
          <Stack css={{ width: "100%" }}>
            <Song />
          </Stack>

          {/* "Submit a project" text */}
          <Text
            as="p"
            css={{
              fontSize: "1rem",
              fontWeight: "400",
              margin: 0,
            }}
          >
            Submit a project
          </Text>

          {/* Contact links - underlined, uppercase */}
          <Stack
            css={{
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            direction="row"
            gap="medium"
          >
            <a
              href="https://instagram.com/dolmios"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
              target="_blank"
            >
              <Text
                css={{
                  "&:hover": {
                    opacity: 0.7,
                  },
                  fontSize: "1rem",
                  fontWeight: "400",
                  textTransform: "uppercase",
                  transition: "$default",
                }}
              >
                Instagram
              </Text>
            </a>
            <Text
              as="span"
              css={{
                fontSize: "1rem",
                fontWeight: "400",
                textTransform: "uppercase",
              }}
            >
              or
            </Text>
            <a
              href="mailto:hello@dolmios.com"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              <Text
                css={{
                  "&:hover": {
                    opacity: 0.7,
                  },
                  fontSize: "1rem",
                  fontWeight: "400",
                  textTransform: "uppercase",
                  transition: "$default",
                }}
              >
                Email
              </Text>
            </a>
          </Stack>

          {/* Copyright */}
          <Text
            as="small"
            css={{
              fontSize: "0.875rem",
              opacity: 0.5,
            }}
          >
            © Jackson Dolman 2025
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
}
