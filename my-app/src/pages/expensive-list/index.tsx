import React, { useCallback } from "react";
import { useState } from "react";

const RERENDER_ATOM_COST = 50000;
const ITEMS_COUNT = 500;

interface ExpensiveItemProps {
    id: number;
    onItemClick: (id: number) => void;
}

const ExpensiveItem = React.memo(({id, onItemClick}: ExpensiveItemProps) => {
    let sum: number = 0;

    for(let i = 0; i < RERENDER_ATOM_COST; i++) {
        sum += Math.sqrt(i);
    };

    return (<div onClick={() => {onItemClick(id)}}>
        {Math.round(sum)}
    </div>)
})

export function ExpensiveListPage() {
    const [currentItemId, setCurrentItemId] = useState<number>(0);
    
    const onItemClick = useCallback((id: number) => {
        setCurrentItemId(id);
    }, [])

    const items = Array.from({length: ITEMS_COUNT}, (_, index) => index);

    return (
        <div>
            <div>{currentItemId}</div>
            <div>
                {items.map((id) => <ExpensiveItem id={id} onItemClick={onItemClick}/>)}
            </div>
        </div>
    );
}