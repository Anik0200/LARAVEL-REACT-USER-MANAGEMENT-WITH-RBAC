import React from 'react';

const Pagination = ({ data, setPage }) => {
    const fetchNextPrevTasks = (link) => {
        if (!link.url) return;
        const url = new URL(link.url);
        const page = url.searchParams.get('page');
        setPage(Number(page));
    };

    return (
        data?.links && data.links.length > 3 && (
            <nav>
                <ul className="pagination justify-content-center">
                    {data.links.map((link, index) => (
                        <li
                            key={index}
                            className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => fetchNextPrevTasks(link)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                disabled={!link.url}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        )
    );
};

export default Pagination;

