import './NumberInput.css'

const NumberInput = ({ value, label, id, placeholder, onChange }) => {
    return (
        <div className="card">
            <div className="chevron"></div>
            <svg style={{ visibility: 'hidden', position: 'relative' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="round">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={window.innerWidth / 200} result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <div className="overlay-container">
                <p>{ label }</p>
                <input type="number" min="1" className="number-input"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
            />
            </div>
        </div>
    );
}
 
export default NumberInput;