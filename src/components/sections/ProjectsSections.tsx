
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ImageIcon } from "lucide-react";

import type { PublicProject } from "@/types/public-project";

type Props = {
  projects: PublicProject[];
};

export default function ProjectsSection({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(projects.map((project) => project.category))
      ),
    ],
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter(
            (project) => project.category === activeCategory
          ),
    [projects, activeCategory]
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#F7F7F5] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#8EC543]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col justify-between gap-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[#F3B24E]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#305A77]">
                Selected Work
              </span>
            </div>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.035em] text-[#305A77] sm:text-5xl md:text-6xl">
              Spaces we've
              <br />
              <span className="font-semibold">
                brought to life.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              A selection of projects reflecting our approach to
              architecture, functionality, craftsmanship and
              thoughtful design.
            </p>
          </div>

          {projects.length > 0 && (
            <div className="flex max-w-full flex-wrap items-center gap-2 border-b border-gray-300 pb-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive
                        ? "text-[#305A77]"
                        : "text-gray-500 hover:text-[#305A77]"
                    }`}
                  >
                    {category}

                    {isActive && (
                      <motion.span
                        layoutId="activeProjectCategory"
                        className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-[#F3B24E]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center border border-[#305A77]/10 bg-white px-6 text-center">
            <ImageIcon
              size={40}
              strokeWidth={1.2}
              className="text-[#305A77]/40"
            />

            <h3 className="mt-6 text-2xl font-medium text-[#305A77]">
              Our portfolio is taking shape.
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
              We are preparing a selection of our architectural
              projects. Please check back soon.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index, 5) * 0.08,
                  }}
                  className="group min-w-0"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block"
                    aria-label={`View ${project.title}`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-[#305A77]">
                      <div className="relative aspect-[4/3] w-full">
                        {project.imageUrl ? (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#305A77] to-[#193A52] text-white/50">
                            <ImageIcon
                              size={44}
                              strokeWidth={1}
                            />
                            <span className="mt-4 text-[10px] uppercase tracking-[0.25em]">
                              Endiz Architecture
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-[#305A77]/0 transition-all duration-500 group-hover:bg-[#305A77]/65" />

                        {/* Project Number */}
                        <div className="absolute left-5 top-5">
                          <span className="text-sm font-medium tracking-[0.15em] text-white drop-shadow-lg">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Category */}
                        <div className="absolute right-5 top-5">
                          <span className="bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#305A77]">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover Content */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-5 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="flex items-end justify-between gap-5">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-[#F3B24E]">
                                View Project
                              </p>

                              <h3 className="mt-2 text-xl font-medium text-white">
                                {project.title}
                              </h3>
                            </div>

                            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/50 text-white transition-all duration-300 group-hover:border-[#F3B24E] group-hover:bg-[#F3B24E] group-hover:text-[#305A77]">
                              <ArrowUpRight size={20} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="flex items-start justify-between gap-6 border-b border-gray-300 py-5">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight text-[#305A77] transition-colors group-hover:text-[#C58A35]">
                          {project.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {project.location}
                        </p>
                      </div>

                      <span className="shrink-0 pt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
                        {project.category}
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}


        {projects.length > 0 && (
  <div className="mt-14 flex justify-center">
    <Link
      href="/projects"
      className="group inline-flex items-center gap-4 border border-[#305A77] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#305A77] transition-colors hover:bg-[#305A77] hover:text-white"
    >
      View All Projects
      <ArrowUpRight
        size={18}
        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  </div>
)}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-gray-300 pt-8 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm text-gray-500">
              Interested in working with us?
            </p>

            <p className="mt-1 text-lg font-medium text-[#305A77]">
              Let&apos;s create something remarkable.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 bg-[#305A77] px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#F3B24E] hover:text-[#305A77]"
          >
            Start a Project

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-24 bg-[#F3B24E]" />
      <div className="absolute bottom-0 left-24 h-[3px] w-12 bg-[#8EC543]" />
    </section>
  );
}
