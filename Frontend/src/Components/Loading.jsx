import LoadingAnimation from 'react-spinners/BarLoader'
import Top from './Top'

export default function Loading() {
    return (
        <div className="loading-container">
            <Top />
            <LoadingAnimation
                color='blue'
                width={'20%'}
                height={'6px'}
            />
        </div>
    )
}