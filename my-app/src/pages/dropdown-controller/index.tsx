import { useEffect, useRef, useState } from "react";

const mockListData = [
    'Item',
    'Default item',
    'Test item'
]

export function DropDownControllerPage() {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<number>(0);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const clickOutsideHandler = (e: MouseEvent) => {
        if(!dropdownRef.current?.contains(e.target as Node)) setIsListOpen(false);
    };

    const inputHandler = (e: KeyboardEvent) => {
        switch(e.key) {
            case 'Escape':
                setIsListOpen(false);
                break;
            case 'ArrowDown':
                setCurrentItem((prev) => (prev + 1) % mockListData.length);
                break;
            case 'ArrowUp':
                setCurrentItem((prev) => (prev - 1 + mockListData.length) % mockListData.length);
                break;
            default:
                console.log(e.key);
                break;
        }
    }

    useEffect(() => {
        if(!isListOpen) return;

        document.addEventListener("mousedown", clickOutsideHandler);
        document.addEventListener("keydown", inputHandler);

        return () => {
            document.removeEventListener('mousedown', clickOutsideHandler);
            document.removeEventListener('keydown', inputHandler);
        }
    }, [isListOpen]);

    return (
        <div ref={dropdownRef}>
            <button onClick={() => setIsListOpen(true)}>
                {`current item: ${currentItem}`}
            </button>
            {isListOpen && <ul>
               {mockListData.map((item, index) => 
               <div key={index}>
                    {item}
               </div>
            )}
            </ul>}
        </div>
    );
}