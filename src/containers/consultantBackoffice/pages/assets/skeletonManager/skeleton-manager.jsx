import React from "react";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoaderManager(props) {
    return (
        <SkeletonTheme highlightColor="#C6D4E1">
            <tr>
                <td className="firstTD"><Skeleton height={"100%"}/></td>
                <td><Skeleton height={"100%"}/></td>
                <td><Skeleton height={"100%"}/></td>
                <td><Skeleton height={"100%"}/></td>
                <td><Skeleton height={"100%"}/></td>
                <td><Skeleton height={"100%"}/></td>
                <td><Skeleton height={"100%"}/></td>
            </tr>
        </SkeletonTheme>
    )
}
