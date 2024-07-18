import PropTypes from 'prop-types';

Message.propTypes = {
    title: PropTypes.array
}

export default function Message({ title }) {
    return (
        <div className="list-empty" >
            <br />
            <br />
            <br />
            <label className="message">{title}</label>
        </div>
    )
}