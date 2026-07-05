import { useEffect, useState } from 'react';

export const useCountUp = (target, isActive, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive || target <= 0) return;

        let cancelled = false;
        const start = performance.now();
        let frameId;

        const animate = (now) => {
            if (cancelled) return;
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => {
            cancelled = true;
            cancelAnimationFrame(frameId);
        };
    }, [target, isActive, duration]);

    return count;
};
