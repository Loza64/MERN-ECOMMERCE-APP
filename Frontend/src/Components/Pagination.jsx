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
                        {Prev ? (<button className='prev-buttom' onClick={() => { setPage(PrevItem) }}>Prev</button>) : null}
                        <label>{Page} - {Pages}</label>
                        {Next ? (<button className='next-buttom' onClick={() => { setPage(NextItem) }}>Next</button>) : null}
                    </div>
                ) : null
            }
        </div>
    )
}