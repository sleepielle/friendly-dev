import { useState } from "react";
// Import the generated route types for TypeScript support
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
// Import the Projects type definition for type safety
import type { Projects } from "~/types";
import Pagination from "~/components/Pagination";

/**
 * Loader function - runs on the server before the component renders
 * This function fetches project data from the API and makes it available to the component
 *
 * @param request - The incoming request object (provided by React Router)
 * @returns Promise containing the projects data
 */
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  // Fetch projects data from the local API endpoint
  const res = await fetch("http://localhost:8000/projects");
  // Parse the JSON response into JavaScript data
  const data = await res.json();

  // Return the projects data in the format expected by the component
  return { projects: data };
}

/**
 * ProjectsPage Component
 * Displays a list of projects fetched by the loader
 *
 * @param loaderData - Data returned from the loader function
 */
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  // Extract projects from the loader data with proper TypeScript typing
  const { projects } = loaderData as { projects: Projects[] };

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  //Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  //Get current page's projects, index of first page and last page
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* TODO: Add project cards/grid here to display the projects data */}
    </section>
  );
};

// Export the component as the default export
export default ProjectsPage;
