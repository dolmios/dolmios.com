import type { JSX } from "react";

import { desc } from "drizzle-orm";
import { Stack, Text } from "stoop-ui";

import { Projects } from "@/app/projects/components/Projects";
import { db } from "@/db";
import { projects } from "@/db/schema";

export default async function ProjectsPage(): Promise<JSX.Element> {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.year));

  return (
    <Stack direction="column" gap="large">
      <Stack>
        <Text>Projects</Text>
      </Stack>
      <Projects projects={allProjects} />
    </Stack>
  );
}
