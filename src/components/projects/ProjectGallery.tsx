
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  X,
} from "lucide-react";

type GalleryImage = {
  id: string;
  imageUrl: string;
  caption: string | null;
  altText: string | null;
};

type Props = {
  images: GalleryImage[];
  title?: string;
};

export default function ProjectGallery({
  images,
  title = "Project Gallery",
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    null
  );

  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  if (images.length === 0) return null;

  const activeImage =
    activeIndex !== null ? images[activeIndex] : null;

  function nextImage() {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + 1) % images.length
    );
  }

  function previousImage() {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + images.length) % images.length
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C58A35]">
            Visual Documentation
          </p>

          <h2 className="mt-3 text-3xl font-light tracking-tight text-[#305A77] sm:text-4xl">
            {title}
          </h2>
        </div>

        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
          {images.length} Photographs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open photograph ${index + 1}`}
            className={`group relative overflow-hidden bg-[#E9EEF1] text-left ${
              index === 0 && images.length > 2
                ? "col-span-2 row-span-2"
                : ""
            }`}
          >
            <div className="relative aspect-[4/3] h-full w-full">
              <Image
                src={image.imageUrl}
                alt={image.altText || image.caption || title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#193A52]/0 transition-colors duration-300 group-hover:bg-[#193A52]/35" />

              <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-white/95 text-[#305A77] opacity-0 transition-opacity group-hover:opacity-100">
                <Expand size={17} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photograph viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-[#071825]/95"
        >
          <div className="flex items-center justify-between px-5 py-5 text-white sm:px-10">
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              {String((activeIndex ?? 0) + 1).padStart(2, "0")}
              {" / "}
              {String(images.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center border border-white/20 hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 py-5 sm:px-24">
            <div className="relative h-full w-full">
              <Image
                src={activeImage.imageUrl}
                alt={
                  activeImage.altText ||
                  activeImage.caption ||
                  "Project photograph"
                }
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous photograph"
                  className="absolute left-2 flex h-11 w-11 items-center justify-center border border-white/20 text-white hover:bg-white/10 sm:left-8"
                >
                  <ArrowLeft size={19} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next photograph"
                  className="absolute right-2 flex h-11 w-11 items-center justify-center border border-white/20 text-white hover:bg-white/10 sm:right-8"
                >
                  <ArrowRight size={19} />
                </button>
              </>
            )}
          </div>

          <div className="px-6 py-6 text-center sm:px-12">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-white/75">
              {activeImage.caption || title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
