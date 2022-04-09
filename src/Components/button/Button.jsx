import './button.css'

const Button = ({ className, children, ...rest }) => {
    return (
        <button className={`${className} button`} {...rest}>
            {children}
        </button>
    )
}

export default Button