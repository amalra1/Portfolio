'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks which section id is currently most visible.
 * Pass a module-level constant array so the observer is not re-created.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] ?? '',
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
