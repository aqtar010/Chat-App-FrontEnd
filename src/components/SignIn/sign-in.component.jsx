import './sign-in.styles.scss'

const SignIn=()=>{
    return <>
    
    <div className='sign-in-container'>
        <input placeholder='Email' type='email'/>
        <input placeholder='Password' type='password'/>
        <button>Sign In</button>
    </div>
    </>
}

export default SignIn
