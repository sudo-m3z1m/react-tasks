import { useEffect, useRef, useState } from "react";

const TIMER_TICK = 10;

export function TimerPage() {
    const [time, setTime] = useState<number>(0);
    const [isTimerPaused, setIsTimerPaused] = useState<boolean>(true);
    const [laps, setLaps] = useState<Array<number>>([]);

    //Два отдельных рефа вместо одного, потому что так меньше действий по отлавливанию ошибок
    const timeRef = useRef<number>(0); // Для отслеживания времени старта
    const timerIdRef = useRef<number | undefined>(undefined); // Для отслеживания id интервала

    useEffect(() => {
        return () => {
            if(!timerIdRef.current) return;
            return clearInterval(timerIdRef.current);
        }
    }, []);

    const startTimer = () => {
        timeRef.current = Date.now() - time;
        timerIdRef.current = setInterval(() => {
            setTime(Date.now() - timeRef.current);
        }, TIMER_TICK);

        setIsTimerPaused(false);
    };

    const pauseTimer = () => {
        if(!timerIdRef.current) {
            return;
        }
        clearInterval(timerIdRef.current);
        timerIdRef.current = undefined;

        setIsTimerPaused(true);
    };

    const saveLap = () => {
        setLaps((prev) => [...prev, time]);
    }

    const clearTimer = () => {
        timeRef.current = Date.now();
        setTime(0);
    };

    const resetTimer = () => {
        clearTimer();
        setLaps([]);
    }

    return (
        <div className="flex-col">
            <div>{time}</div>
            <div className="flex-row">
                <button onClick={() => {
                    if(isTimerPaused) {
                        return startTimer();
                    }
                    pauseTimer();
                }}>
                    {isTimerPaused ? 'Start' : 'Stop'}
                </button>
                <button onClick={saveLap}>Save current lap</button>
                <button onClick={clearTimer}>Clear current time</button>
                <button onClick={resetTimer}>Reset timer</button>
            </div>
            <div className="flex-col">
                {laps.map((item, index) => <div key={index}>
                    {item.toString()}
                </div>)}
            </div>
        </div>
    );
};