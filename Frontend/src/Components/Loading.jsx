import LoadingAnimation from 'react-spinners/BarLoader'
import PropType from 'prop-types'

Loading.propTypes = {
    color: PropType.string
}

export default function Loading({ color }) {
    return (
        <>
            <div className="loading-container">
                <LoadingAnimation
                    color={color ? color : 'greenyellow'}
                    width={'100%'}
                    height={'3px'}
                />
            </div>
        </>

    )
}