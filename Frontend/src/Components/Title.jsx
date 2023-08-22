import PropTypes from 'prop-types';

Title.propTypes = {
    Title: PropTypes.array,
    SubTitle: PropTypes.array
}

export default function Title({ Title, SubTitle }) {
    return (
        <div>
            <h2 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{Title}</label> {SubTitle}</h2>
        </div>
    )
}