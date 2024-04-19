import React from 'react'
import PropTypes from 'prop-types';
import './Button.css'

export default function Button({ onClick, children, variant, prefixIcon, suffixIcon , prop , disabled}) {
    return (
        <button className={`button ${variant} ${prop}`} onClick={onClick} disabled={disabled}> 
            {prefixIcon && prefixIcon} {/* Render prefix icon if provided */}
            {variant === 'smallButton' && (
                <div className="label">
                    {children}
                </div>
            )}
            {variant === 'mediumButton' && (
                <div className="label5">
                    {children}
                </div>
            )}
            {variant === 'mediumOutline' && (
                <div className="label5">
                    {children}
                </div>
            )}
            {variant === 'yellowButton' && (
                <div className="label5">
                    {children}
                </div>
            )}
            {variant === 'largeButton' && (
                <div className="label4">
                    {children}
                </div>
            )}
            {suffixIcon && suffixIcon } {/* Render suffix icon if provided */}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['smallButton', 'mediumButton', 'largeButton', 'mediumOutline']),
    prefixIcon: PropTypes.element,
    suffixIcon: PropTypes.element,
};

Button.defaultProps = {
    variant: 'smallButton',
};
