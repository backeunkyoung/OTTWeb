import { useMemo } from "react";

function useColumns() {
    const columns = useMemo(() => [
        { Header : "MOVIE_PID", accessor : "movie_pid"},
        { Header : "TITLE", accessor : "title"},
        { Header : "DIREACTOR", accessor : "director"},
        { Header : "FIELD", accessor : "field"},
        { Header : "ATTRIBUTE", accessor : "attribute"},
    ], []);

    return columns;
}

export default useColumns;