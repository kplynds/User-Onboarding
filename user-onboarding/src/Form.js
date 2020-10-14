import React from 'react';


function Form (props) {
    const {values, disabled, change, submit, errors} = props

    const onSubmit = (evt) => {
        evt.preventDefault()
        submit()
    }

    const onChange = (evt) => {
        const {name, value, type, checked} = evt.target
        const valueToUse = type === "checkbox" ? checked : value;
        change (name, valueToUse)
    }

    return (
        <form className="form container" onSubmit={onSubmit}>
            <div className="errors">
                <div>{errors.username}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.tos}</div>
            </div>

            <div className="inputs">
                <h4>Information</h4>

                <label>
                    Username
                    <input 
                        value={values.username}
                        name='username'
                        type='text'
                        onChange={onChange}
                    />
                </label>

                <label>
                    Email
                    <input 
                        value={values.email}
                        name='email'
                        type='text'
                        onChange={onChange}
                    />
                </label>

                <label>
                    Password
                    <input 
                        value={values.password}
                        name='password'
                        type='text'
                        onChange={onChange}
                    />
                </label>

                <label>
                    Terms of Service
                    <input 
                        value={values.tos}
                        name='tos'
                        type='checkbox'
                        onChange={onChange}
                    />
                </label>
            </div>

            <div className="button">
                <button disabled={disabled}>Submit</button>     
            </div>    
        </form>
    )
}



export default Form;