import { useState } from "react";

interface Job {
    id: number;
    name: string;
    company: string;
    rank: string;
    salary: number;
};

export function JobListPage() {
    const [jobs, setJobs] = useState<Array<Job>>([]);

    const appendNewJob = () => {
        setJobs((prev) => [...prev, {id: Math.random(), name: '', company: '', rank: '', salary: 0}]);
    };

    const removeJob = (id: number) => {
        setJobs((prev) => prev.filter((item) => id !== item.id));
    };

    const moveJob = (index: number, direction: number) => {
        setJobs((prev) => {
            const newJobIndex = Math.min(prev.length - 1, Math.max(0, index + direction));
            
            const next = [...prev];
            [next[index], next[newJobIndex]] = [next[newJobIndex], next[index]];

            return next;
        })
    };

    return (
    <div className="flex-col">
        <div>Jobs:</div>
        <div>
            {jobs.map((item, index) => (
                <div key={item.id}>
                    <div className="flex-row">
                        <button onClick={() => {removeJob(item.id)}}>Remove</button>
                        <button onClick={() => {moveJob(index, -1)}}>Up</button>
                        <button onClick={() => {moveJob(index, 1)}}>Down</button>
                    </div>
                    <input value={item.name}/>
                    <input value={item.company}/>
                    <input value={item.rank}/>
                    <input value={item.salary}/>
                </div>
                ))}
        </div>
        <button onClick={appendNewJob}>Add</button>
    </div>
    );
}