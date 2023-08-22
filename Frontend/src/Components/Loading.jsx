import PropTypes from 'prop-types';

Loading.propTypes = {
    title: PropTypes.array
}

export default function Loading({ title }) {
    return (
        <div className="loading-container">
            <div className="loading">
                <img src="https://res.cloudinary.com/ufostart-development/image/upload/v1689982703/ECOMMERCE/mckaustcnmrms3nxvhzx.gif" alt="Loading" />
                <label>{title}</label>
            </div>
        </div>
    )
}