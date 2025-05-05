'user client';

import { useEffect, useRef } from "react";

export default function useInfiniteScroll(callback: () => void, canLoad: boolean) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!canLoad || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    },[callback, canLoad]);

    return ref;
}