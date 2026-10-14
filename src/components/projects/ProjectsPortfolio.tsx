
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
} from "lucide-react";

import type { PublicProject } from "@/types/public-project";

type Props = {
  projects: PublicProject[];
};

const statusLabels: Record<PublicProject["status"], string> = {
  UPCOMING: "Upcoming",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
};

export default function ProjectsPortfolio({ projects }: Props) {
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

  const spotlight = filteredProjects[0];
  const remainingProjects = filteredProjects.slice(1);

  return (
    <main className="overflow-hidden bg-[#F7F7F5]">
      {/* Page Introduction */}
      <section className="relative overflow-hidden bg-[#193A52] px-6 pb-24 pt-36 sm:px-8 lg:px-12 lg:pb-32 lg:pt-44">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-12 top-10 h-[350px] w-[350px] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#F3B24E]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F3B24E]">
                Our Portfolio
              </span>
            </div>

            <h1 className="text-5xl font-light leading-[1.1] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              Architecture
              <br />
              <span className="font-semibold">
                beyond the ordinary.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Explore a collection of residential, commercial,
              and other architectural projects shaped by
              thoughtful planning, purposeful design, and
              attention to detail.
            </p>

            <div className="mt-12 flex items-center gap-5">
              <span className="text-4xl font-light text-white">
                {String(projects.length).padStart(2, "0")}
              </span>

              <span className="h-9 w-px bg-white/25" />

              <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                Published
                <br />
                Projects
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-32 bg-[#F3B24E]" />
        <div className="absolute bottom-0 left-32 h-[3px] w-16 bg-[#8EC543]" />
      </section>

      {/* Portfolio */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-gray-300 pb-7 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C58A35]">
              Explore Our Work
            </p>

            <h2 className="mt-4 text-3xl font-light tracking-tight text-[#305A77] sm:text-4xl">
              The complete{" "}
              <span className="font-semibold">collection.</span>
            </h2>
          </div>

          <div className="flex max-w-full flex-wrap gap-2">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-[#305A77] bg-[#305A77] text-white"
                      : "border-gray-300 text-gray-500 hover:border-[#305A77] hover:text-[#305A77]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center border border-gray-200 bg-white px-6 text-center">
            <Building2
              size={42}
              strokeWidth={1.2}
              className="text-[#305A77]/40"
            />

            <h3 className="mt-6 text-2xl font-medium text-[#305A77]">
              No projects available yet.
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
              Our portfolio is being updated. Please check back
              soon for our latest architectural work.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {/* Spotlight */}
              {spotlight && (
                <Link
                  href={`/projects/${spotlight.slug}`}
                  className="group mb-16 grid overflow-hidden bg-[#193A52] lg:grid-cols-[1.25fr_0.75fr]"
                >
                  <div className="relative min-h-[340px] overflow-hidden sm:min-h-[460px]">
                    {spotlight.imageUrl ? (
                      <Image
                        src={spotlight.imageUrl}
                        alt={spotlight.title}
                        fill
                        unoptimized
                        priority
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#305A77] to-[#102B40]" />
                    )}

                    <div className="absolute left-6 top-6 bg-[#F3B24E] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#193A52]">
                      Project Spotlight
                    </div>
                  </div>

                  <div className="flex flex-col justify-between px-8 py-10 sm:px-12 sm:py-14">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F3B24E]">
                        {spotlight.category}
                      </p>

                      <h3 className="mt-7 text-3xl font-light leading-tight text-white sm:text-4xl">
                        {spotlight.title}
                      </h3>

                      <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
                        <MapPin size={16} />
                        {spotlight.location}
                      </p>

                      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/45">
                        {statusLabels[spotlight.status]}
                      </p>
                    </div>

                    <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-6">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                        Explore Project
                      </span>

                      <ArrowUpRight
                        size={23}
                        className="text-[#F3B24E] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </Link>
              )}

              {/* Remaining Projects */}
              {remainingProjects.length > 0 && (
                <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                  {remainingProjects.map((project, index) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(index, 4) * 0.06,
                      }}
                      className="group"
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#305A77]">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              unoptimized
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#305A77] to-[#193A52]">
                              <Building2
                                size={42}
                                className="text-white/30"
                              />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-[#193A52]/0 transition-colors duration-500 group-hover:bg-[#193A52]/40" />

                          <div className="absolute left-5 top-5 bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#305A77]">
                            {project.category}
                          </div>

                          <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center bg-[#F3B24E] text-[#193A52] opacity-0 transition-all group-hover:opacity-100">
                            <ArrowUpRight size={20} />
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-4 border-b border-gray-300 py-6">
                          <div>
                            <h3 className="text-lg font-semibold text-[#305A77] transition-colors group-hover:text-[#C58A35]">
                              {project.title}
                            </h3>

                            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                              <MapPin size={14} />
                              {project.location}
                            </p>
                          </div>

                          <span className="shrink-0 pt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
                            {statusLabels[project.status]}
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-white px-6 py-24 text-center sm:px-8 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C58A35]">
          Build With Endiz
        </p>

        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-light leading-tight text-[#305A77] sm:text-5xl">
          Every remarkable space
          <br />
          <span className="font-semibold">
            begins with a vision.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-500">
          Whether residential or commercial, we bring thoughtful
          architectural expertise to every project.
        </p>

        <Link
          href="/#contact"
          className="mt-10 inline-flex items-center gap-4 bg-[#305A77] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#F3B24E] hover:text-[#193A52]"
        >
          Discuss Your Project
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
