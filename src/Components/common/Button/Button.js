
import React from 'react'
import PropTypes from 'prop-types';
import './Button.css'
import Link from 'next/link';

export default function Button({ onClick, children, variant, prefixIcon, suffixIcon, prop, disabled, link }) {
    return (
        link ?
            <Link href={link}>
                <button className={`button ${variant} ${prop}`} onClick={onClick} disabled={disabled}>
                    {prefixIcon && prefixIcon} {/* Render prefix icon if provided */}
                    {variant === 'smallButton' && (
                        <div className="label">
                            {children}
                        </div>
                    )}
                    {variant === 'mediumButton' && (
                        <div className="label2">
                            {children}
                        </div>
                    )}
                    {variant === 'round' && (
                        <div className="label">
                            {children}
                        </div>
                    )}
                    {variant === 'round-outline' && (
                        <div className="label">
                            {children}
                        </div>
                    )}
                    {variant === 'mediumOutline' && (
                        <div className="label2">
                            {children}
                        </div>
                    )}
                    {variant === 'yellowButton' && (
                        <div className="label2">
                            {children}
                        </div>
                    )}
                    {variant === 'largeButton' && (
                        <div className="label2">
                            {children}
                        </div>
                    )}
                    {suffixIcon && suffixIcon} {/* Render suffix icon if provided */}
                </button>
            </Link>
            :
            <button className={`button ${variant} ${prop}`} onClick={onClick} disabled={disabled}>
                {prefixIcon && prefixIcon} {/* Render prefix icon if provided */}
                {variant === 'smallButton' && (
                    <div className="label">
                        {children}
                    </div>
                )}
                {variant === 'mediumButton' && (
                    <div className="label2">
                        {children}
                    </div>
                )}
                {variant === 'round' && (
                    <div className="label">
                        {children}
                    </div>
                )}
                {variant === 'round-outline' && (
                    <div className="label">
                        {children}
                    </div>
                )}
                {variant === 'mediumOutline' && (
                    <div className="label2">
                        {children}
                    </div>
                )}
                {variant === 'yellowButton' && (
                    <div className="label2">
                        {children}
                    </div>
                )}
                {variant === 'largeButton' && (
                    <div className="label2">
                        {children}
                    </div>
                )}
                {suffixIcon && suffixIcon} {/* Render suffix icon if provided */}
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
