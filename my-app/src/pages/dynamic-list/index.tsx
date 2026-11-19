import { useEffect, useRef, useState } from "react";

export function DynamicListPage() {
    const [listItems, setListItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); //Нужно для предотвращения повторных отправлений запроса на обновление
    const markerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!markerRef.current) {
            return;
        }
        
        const observerOptions = {
            rootMargin: '0px 0px 400px 0px',
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if(!entries[0].isIntersecting || isLoading) {
                return;
            }
            setIsLoading(true);
            setListItems(['']);
            //loadMore();
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(markerRef.current);
        
        return () => observer.disconnect();
    }, [isLoading]);

    return (
        <div>
            <div>
                Objects dynamic list:
            </div>
            <div>
                {listItems.map((item) => <div key={item}>
                    {item}
                </div>)}
                <div ref={markerRef}></div>
            </div>
        </div>
    )
}