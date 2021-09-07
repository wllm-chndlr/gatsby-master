import { useEffect, useState } from 'react';

function useLatestData() {
    // hot slices
    const [hotSlices, setHotSlices] = useState();

    // slicemasters
    const [slicemasters, setSlicemasters] = useState();

    useEffect(function() {
        // when the component loads, fetch the data

    }, []);

}