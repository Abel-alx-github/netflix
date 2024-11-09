import { Link, useLocation, useNavigate } from 'react-router-dom';
import signupBg from '../assets/signup-bg.jpg';
import { useState } from 'react';
import { AuthUseUser } from '../context/AuthContext';

const Login= () => {
    const {logIn} = AuthUseUser();
    const navigate = useNavigate();
    const userEmail = useLocation().state?.userEmail;

    const [email, setEmail] = useState(userEmail ? userEmail : "");
    const [password, setPassword] = useState("");
    const [remberme, setRemberme] = useState(true);
    
    const handleEmailChange = (e) => {
        // e.preventDefault();
        const value = e.target.value;
        setEmail((prvE) => prvE=value);
        
    }

    const handleFormSumbit = async (e) => {
        e.preventDefault();
       try {
        await logIn(email, password);
        navigate("/");    
       }
       catch (error){
        alert("Oops! If you dont have account signup first")
        console.log(error, "error occured while login");
       }

    }


    return(
    <div className="w-full h-screen">
       <img src={signupBg} alt="signup-bg"
            className='hidden sm:block absolute w-full h-full object-cover '
       /> 
       <div className='fixed top-0 left-0 w-full h-screen bg-black/80 '/>
     
        <div className='fixed w-full px-4 py-24 z-20 '>
            <div className='max-w-[450px] h-[600px] mx-auto  bg-black/80 rounded-lg'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-nsans-bold'>Login</h1>
                
                    <form 
                    onSubmit={handleFormSumbit}
                    className='w-full flex flex-col' >
                        <input 
                              value={email}  
                              onChange={handleEmailChange}
                              type="email"
                               required
                               autoComplete='email'
                               placeholder='Email'
                                className=' p-3 my-2 bg-gray-700 rounded'
                        />
                         <input
                               value={password}
                               onChange={(e)=> setPassword(e.target.value)}
                               type="password"
                               required
                               autoComplete='current-password'
                               placeholder='Password'
                                className=' p-3 my-2 bg-gray-700 rounded'
                        />

                        <button className='bg-red-600 py-3 my-6 font-nsans-bold rounded'>Login</button>

                        <div className='flex justify-between items-center text-gray-600'>
                            <p>
                                <input type="checkbox" checked={remberme} onChange={() => setRemberme(!remberme)} className='mr-2' />
                                  Remeber me
                             </p>                           
                             <p>Need help?</p>
                        </div>
                        <p className='my-4'>
                            <span className='text-gray-600 mr-3'>New to Netflix? </span>
                            <Link to="/signup">Sign up</Link>
                         </p>

                    </form>
                </div>
            </div>
        </div>
    </div>        
    
)
}

export default Login;