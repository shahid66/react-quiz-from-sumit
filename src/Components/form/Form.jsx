
import './form.css'

const Form = ({ children, className, ...rest }) => {
    return (
        <form className={`${className} form`} {...rest} >
            {children}
        </form>
    )
}

export default Form