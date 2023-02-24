import s from './Paginator.module.css'
import classNames from "classnames";


export const Paginator = ({current, total, size, onPageChange}) => {
    const totalPages = Math.ceil(total / size);
    const cnt = 3;

    let pagesPrev = [];
    let pagesNext = [];
    for (let i = current - 1, j = 1; i >= 1 && j <= cnt; i--, j++) pagesPrev.push(i)
    for (let i = current + 1, j = 1; i <= totalPages && j <= cnt; i++, j++) pagesNext.push(i)

    const pages = pagesPrev.reverse().concat(current, pagesNext)

    return (
        <>
            {pages.map(page => {
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={classNames({[s.selected]: page === current}, s.buttonPage)}
                    >
                        {page}
                    </button>
                )
            })}
        </>
    )
}