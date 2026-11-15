import { useCallback, useEffect, useState } from "react";

const DEBOUNCE_TIME = 300; //Time in ms

const mockSearchResults = [
    'React',
    'Native',
    'FSD',
    'Vite'
];

export function SearchListPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');             //Нужно эту логику вынести в хук
    const [searchResults, setSearchResults] = useState<Array<string>>([]);  //который буден находиться в features

    const updateSearchResults = useCallback(async () => {
        // const newSearchResults = await Api.getSearchResults(searchQuery);
        const newSearchResults = mockSearchResults;
        setSearchResults(newSearchResults);
    }, []);

    useEffect(() => {
        if(!searchQuery.length) {
            return () => {};
        }

        const timeoutId = setTimeout(updateSearchResults, DEBOUNCE_TIME);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchQuery, updateSearchResults])

    return (
        <view>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
            <view>
                {searchResults.map((item: string, index) => <view key={index}>{item}</view>)}
            </view>
        </view>
    );
}