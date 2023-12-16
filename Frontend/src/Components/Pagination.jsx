import PropTypes from 'prop-types'

Pagination.propTypes = {
    Pages: PropTypes.number.isRequired,
    Page: PropTypes.number.isRequired,
    Prev: PropTypes.bool.isRequired,
    Next: PropTypes.bool.isRequired,
    PrevItem: PropTypes.number.isRequired,
    NextItem: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
}

export default function Pagination({ Page, Pages, Prev, Next, PrevItem, NextItem, setPage }) {
    return (
        <div className='pagination-container'>
            {
                Pages > 1 ? (
                    <div className='pagination-flex'>
                        <button className={` ${Prev ? "prev-buttom" : "disable"}`} onClick={() => { if (Prev) setPage(PrevItem) }}>Prev</button>
                        <label>{Page} - {Pages}</label>
                        <button className={` ${Next ? "next-buttom" : "disable"}`} onClick={() => { if (Next) setPage(NextItem) }}>Next</button>
                    </div>
                ) : null
            }
        </div>
    )
}