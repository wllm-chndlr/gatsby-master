import React from "react";
import useLatestData from "../utils/useLatestData";

function CurrentlySlicing() {
    return (
        <div><p>CurrentlySlicing</p></div>
    );
}

function HotSlices() {
    return (
        <div><p>HotSlices</p></div>
    );
}

export default function HomePage() {
    const result = useLatestData();

    console.log(result);

    return (
        <div className="center">
            <h1>The Best Pizza Downtown!</h1>
            <p>Open 11am to 11pm Every Single Day</p>
            <div>
                <CurrentlySlicing />
                <HotSlices />
            </div>
        </div>
    )
}
