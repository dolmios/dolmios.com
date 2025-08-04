import { Card, Text } from "stoop";

const improvedServices = [
  "Full-Stack Engineering",
  "Frontend Development (React, Next.js)",
  "Backend Development (Node.js, PostgreSQL, Redis)",
  "Cloud & Architecture (Cloud, Distributed Systems, DevOps)",
  "API Integrations",
  "UI/UX Design",
  "Technical Strategy",
];

export function Services() {
  return (
        <Card header={
          <Text as="small">
            Services
          </Text>
        } variant="default">
      {improvedServices.map((service) => (
        <Text key={service} style={{ margin: "var(--space-1) 0" }}>
          {service}
        </Text>
      ))}
    </Card>
  );
} 