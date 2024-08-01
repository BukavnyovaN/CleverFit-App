import loaderAnimation from './loader.json';
import Lottie from "lottie-react";

import './loader.css';

export const Loader = () => (
    <div className='loader__wrapper'>
        <div className='loader__lottie'>
            <Lottie data-test-id='loader' animationData={loaderAnimation} loop={true} />
        </div>
    </div>
)
