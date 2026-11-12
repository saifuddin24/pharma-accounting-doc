import { useEffect, useState } from 'react';

export function useActiveHeading(headings) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings.length) return undefined;
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  return activeId;
}
