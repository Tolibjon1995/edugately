import React from "react";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./skeleton-style.css"

export default function SkeletonLoader(props) {
    return (
        <SkeletonTheme highlightColor="#C6D4E1">
                <h3><Skeleton height={"100%"}/></h3>
        </SkeletonTheme>
    )
}
