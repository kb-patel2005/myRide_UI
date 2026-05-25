import React, { use, useState } from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveUser } from './Slices/userSlice';

export default function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = [];
    const inputsRef = useRef({});
    const [show, setShow] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOTP, setGeneratedOTP] = useState("");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        role: "",
        phone: ""
    });

    // const sendSMS = () => {
    //     let generatedOTP = Math.floor(100000 + Math.random() * 900000);
    //     setGeneratedOTP(generatedOTP);
    //     if (parseInt(data.phone) < 10000000000) {
    //         alert("Please enter a valid phone number");
    //         return;
    //     }
    //     setShow(true);
    //     window.location.href = `sms:+91${data.phone}?body=${generatedOTP}`;

    // }

    const handleChangle = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    // for (let i = 1; i <= 6; i++) {
    //     items.push(<input
    //         key={i}
    //         type="text"
    //         name={`otp${i}`}
    //         maxLength="1"
    //         ref={(el) => (inputsRef.current[`otp${i}`] = el)}
    //         onChange={
    //             (e) => {
    //                 setOtp(otp + e.target.value);
    //                 inputsRef.current[`otp${i + 1}`]?.focus();
    //             }
    //         }
    //         style={{
    //             width: "40px",
    //             height: "40px",
    //             textAlign: "center",
    //             fontSize: "20px",
    //             border: "1px solid black",
    //             borderRadius: "4px"
    //         }}
    //         required
    //     />);
    // }

    return (
        <div className='m-auto max-w-[1080px] p-3'>
            <form className='max-w-[600px] mx-auto my-6 p-6 mt-[7vh] bg-white bg-opacity-6 backdrop-blur-sm rounded-2xl border border-purple-600 shadow-purple-500 shadow-xl'
                onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await dispatch(saveUser(data));
                    if(res){navigate('/')}
                    else{alert('somthing went Wrong.....')}
                }
                }>
                <h2 className='text-4xl font-bold text-shadow-purple-400 text-purple-400 mb-5 text-center'>Signup Page</h2>
                {/* Signup form fields go here */}
                <div className='flex flex-col mb-2.5'>
                    <label className='text-slate-400'>your name:</label>
                    <input type="text"
                        onChange={handleChangle}
                        value={data.name}
                        name='name'
                        placeholder="Enter your Name"
                        className='rounded-lg border border-purple-300 bg-transparent border-opacity-20 focus:outline-none focus:shadow-2xl focus:shadow-purple-300 focus:ring-2 focus:ring-purple-300 p-1'
                        required />
                </div>
                <div className='flex flex-col mb-2.5'>
                    <label className='text-slate-400'>Email:</label>
                    <input type="email"
                        onChange={handleChangle}
                        value={data.email}
                        name='email'
                        placeholder="Enter your email"
                        className='rounded-lg border border-purple-300 bg-transparent border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-300 p-1'
                        required
                    />
                </div>
                <div className='flex flex-col mb-2.5'>
                    <label className='text-slate-400'>Password:</label>
                    <input type="password"
                        onChange={handleChangle}
                        value={data.password}
                        name='password'
                        placeholder="create new password"
                        className='rounded-lg border border-purple-300 bg-transparent border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-300 p-1'
                        required
                    />
                </div>
                <div className='flex flex-col mb-2.5'>
                    <label className='text-slate-400'>Gender</label>
                    
                    <div className='flex-row'>
                        <span className='mr-4'>
                            <input
                            onClick={()=>{setData({...data,gender:"male"})}}
                            type="radio" 
                            name='gender' 
                            value='male' 
                            required /> male
                        </span>
                        <span className='mr-4'>
                            <input 
                            onClick={()=>{setData({...data,gender:"female"})}} 
                            type="radio" 
                            name='gender' 
                            value='female' 
                            required /> female
                        </span>
                    </div>
                </div>
                <div className='flex flex-col mb-2.5'>
                    <label className='text-slate-400'>Role</label>
                    <div className='flex-row'>
                        <span className='mr-4'>
                            <input 
                            onClick={()=>{setData({...data,role:"rider"})}}
                            type="radio" 
                            name='role' 
                            value='rider' 
                            required /> Rider
                        </span>
                        <span className='mr-4'>
                            <input 
                            onClick={()=>{setData({...data,role:"passenger"})}}
                            type="radio" 
                            name='role' 
                            value='passenger' 
                            required /> Passenger
                        </span>
                    </div>

                </div>
                <div className='flex flex-col mb-2.5'>
                    <label className='text-slate-400'>Phone no.:</label>
                    <input type="number"
                        onChange={handleChangle}
                        value={data.phone}
                        name='phone'
                        placeholder="Enter phone number"
                        className='rounded-lg border border-purple-300 bg-transparent border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-300 p-1'
                        required
                    />
                </div>


                <button
                    type='submit'
                    className='w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition'
                >for verification</button>
            </form>


            {/* {show ? (
                <>
                    <form className='max-w-[600px] mx-auto my-6 p-6 bg-white bg-opacity-6 backdrop-blur-sm rounded-2xl border border-purple-600 shadow-purple-500 shadow-xl'
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (parseInt(otp) === generatedOTP) {
                                alert("Phone number verified successfully!");
                                navigate('/login');
                            } else {
                                alert("Invalid OTP! Please try again.");
                                navigate('/signup');
                            }
                        }}>
                        <h2 className='text-4xl font-bold text-shadow-purple-400 text-purple-400 mb-5 text-center'>Enter OTP</h2>
                        <div style={{ display: "flex", gap: "10px", height: "40px", marginBottom: "10px" }}>
                            {items}
                        </div>

                        <input
                            type='submit'
                            value='Register'
                            className='w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition'
                        />
                    </form>
                </>
            ) : null} */}

        </div>
    )
}
