import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Progress } from 'reactstrap';
import {roundTo} from "round-to";

const ProgressToast = ({ progress }) => (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999, fontSize: '1.2rem' }}>
        <Card>
            <CardHeader style={{ fontSize: '1.5rem' }}>We're working on it...<br/>
                {roundTo(progress,2)}%
            </CardHeader>

            <Progress value={progress} style={{ height: '2rem' }}>{`${roundTo(progress,2)}%`}</Progress>
        </Card>
    </div>
);

export const useProgressToast = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (progress > 0 && progress <100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [progress]);

    return { setProgress, ProgressToastComponent: isVisible ? <ProgressToast progress={progress} /> : null };
};