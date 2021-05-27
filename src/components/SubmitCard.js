import './SubmitCard.css'

const SubmitCard = (props) => {
    return (
        <>
        <div className="submit-card">
            <div className="submit-chevron"></div>
            <svg style={{ visibility: 'hidden', position: 'relative' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="round">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={window.innerWidth / 200} result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <input type="submit" value={props.label} className="submit-input"/>
        </div>
        </>
    );
}

export default SubmitCard;