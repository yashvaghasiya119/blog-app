"use client"
import React, { useState } from 'react'
import { BiPhoneCall } from 'react-icons/bi'
import { FaGoogle, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdMailOutline } from 'react-icons/md'

import Button from '@/src/components/Button'
import Subscribe from '../about/Subscribe'
import Link from 'next/link'

import { createClient } from "@supabase/supabase-js"
import { ErrorToast, SuccessToast } from '@/utils /toast'
import { ToastContainer } from 'react-toastify'
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

// Use NEXT_PUBLIC_ prefix for client-side environment variables

export const MoblieValidation = () => {

    type FormData = {
        name: string;
        telephone: string;
        email: string;
        subject: string;
        message: string;
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // PhoneInput value
    const [value, setValue] = useState<string | undefined>('');
    const [countryCode, setCountryCode] = useState('');
    const [nationalNumber, setNationalNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        telephone: '',
        email: '',
        subject: '',
        message: '',
    });

    // Handle regular input changes (name, email, subject, message)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle phone input separately because PhoneInput gives value directly
    const handlePhoneChange = (phone: string | undefined) => {
        setValue(phone || '');

        if (phone) {
            const phoneNumber = parsePhoneNumberFromString(phone);
            if (phoneNumber && phoneNumber.isValid()) {
                setCountryCode(`+${phoneNumber.countryCallingCode}`);
                setNationalNumber(phoneNumber.nationalNumber);
                setIsValid(true);

                // Update telephone field in formData with only digits (national number)
                setFormData(prevData => ({
                    ...prevData,
                    telephone: phoneNumber.nationalNumber,
                }));
            } else {
                setCountryCode('');
                setNationalNumber('');
                setIsValid(false);

                // Also clear telephone field if invalid
                setFormData(prevData => ({
                    ...prevData,
                    telephone: '',
                }));
            }
        } else {
            setCountryCode('');
            setNationalNumber('');
            setIsValid(false);

            setFormData(prevData => ({
                ...prevData,
                telephone: '',
            }));
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.telephone.trim()) {
            newErrors.telephone = "Telephone is required";
        } else if (!/^\d{7,15}$/.test(formData.telephone)) {
            newErrors.telephone = "Enter a valid phone number (7–15 digits)";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        setSubmitted(true);
      
        if (!isValid) {
          ErrorToast("Please enter a valid phone number");
          return;
        }
      
        // Construct data to submit
        const submitData = {
          ...formData,
          telephone: `${countryCode} ${nationalNumber}`, // Format as you want
        };
      
        if (!validate()) {
          return;
        }
      
        setIsSubmitting(true);
        setSubmitError(null);
      
        try {
          const { data, error } = await supabase.from('Contact_Table').insert(submitData).single();
      
          if (error) {
            setSubmitError(error.message);
            console.error('Supabase insert error:', error);
          } else {
            setFormData({
              name: '',
              telephone: '',
              email: '',
              subject: '',
              message: '',
            });
            setValue('');
            setCountryCode('');
            setNationalNumber('');
            setIsValid(true);
            setSubmitted(false);
      
            SuccessToast("Data sent successfully");
            console.log('Supabase insert data:', data);
          }
        } catch (err) {
          setSubmitError('An unexpected error occurred');
          console.error('Unexpected error:', err);
        } finally {
          setIsSubmitting(false);
        }
      };
      
    return (
        <section>
            <div className='max-w-[1400px] pt-28 pb-16 md:pb-36 mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center'>
                <div className="bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,0.09)] rounded p-4 md:p-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
                            <label className="font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full mt-2 border border-gray-300 px-4 py-2 rounded placeholder:text-[#999] focus:outline-none focus:ring focus:border-[#3078fb]"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2 ml-2">{errors.name}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={value}
                                    onChange={handlePhoneChange}
                                    className={`w-full mt-2 border rounded placeholder:text-[#999] focus:outline-none focus:ring focus:border-[#3078fb] px-4 py-2 ${submitted && !isValid ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {!isValid && submitted && (
                                    <p className="text-red-500 text-sm mt-1">Invalid phone number.</p>
                                )}
                            </div>
                            <div>
                                <label className="font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full mt-2 border border-gray-300 px-4 py-2 rounded placeholder:text-[#999] focus:outline-none focus:ring focus:border-[#3078fb]"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-2 ml-2">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Your Subject"
                                className="w-full mt-2 border border-gray-300 px-4 py-2 rounded placeholder:text-[#999] focus:outline-none focus:ring focus:border-[#3078fb]"
                            />
                            {errors.subject && <p className="text-red-500 text-sm mt-2 ml-2">{errors.subject}</p>}
                        </div>
                        <div>
                            <label className="font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows={6}
                                className="w-full mt-2 border border-gray-300 px-4 py-2 rounded placeholder:text-[#999] focus:outline-none focus:ring focus:border-[#3078fb]"
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-2 ml-2">{errors.message}</p>}
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT MESSAGE'}
                        </Button>
                    </form>
                </div>
                <div>
                    <div>
                        <h4 className="text-base md:text-lg text-primary font-medium uppercase">Contact Us</h4>
                        <h2 className="text-2xl sm:text-[34px] font-medium leading-tight max-w-lg capitalize text-primaryText my-2"> Let&apos;s Get In Touch</h2>
                        <p className="!text-[#5d6471] text-sm sm:text-[15px]">
                            {`Got a project in mind or a challenge to solve? Share your details — our embedded experts will get back to you within 24 hours. `}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !my-5">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9672021225238!2d72.86509362429975!3d21.233149130223257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fde33b05dcf%3A0x1d331b2a1edb7fbc!2sCyber%20City!5e0!3m2!1sen!2sin!4v1750681452261!5m2!1sen!2sin" width="100%"
                            height="210"
                            loading="lazy"></iframe>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.5486502562144!2d72.53816832617801!3d23.11361272911007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82db3e5d2fab%3A0xcee716cdd8325a18!2seByteLogic!5e0!3m2!1sen!2sin!4v1754375465545!5m2!1sen!2sin" width="100%"
                            height="210"
                            loading="lazy"></iframe>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <HiOutlineLocationMarker className='!w-10 !h-10 mt-0.5 text-primary' />
                            <div>
                                <h4 className='text-primaryText font-semibold text-base md:text-lg'>Surat Office</h4>
                                <span className='text-[#5d6471] text-sm md:text-[15px]'>913, Silver Trade Center, near VIP Circle, Mota Varachha, Surat, Gujarat 394101</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <HiOutlineLocationMarker className='!w-10 !h-10 mt-0.5 text-primary' />
                            <div>
                                <h4 className='text-primaryText font-semibold text-base md:text-lg'>Ahmedabad Office</h4>
                                <span className='text-[#5d6471] text-sm md:text-[15px]'>1114, Ganesh Glory, Jagatpur Rd,
                                    S.G. Highway, Gota,
                                    Ahmedabad - 382481</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <BiPhoneCall className='!w-5 !h-5 mt-0.5 text-primary' />
                            <div>
                                <h4 className='text-primaryText font-semibold text-base md:text-lg'>Calling Support</h4>
                                <a href="tel:+919033223700" className='text-[#5d6471] text-sm md:text-[15px]'>+91 90332 23700</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MdMailOutline className='!w-5 !h-5 mt-0.5 text-primary' />
                            <div>
                                <h4 className='text-primaryText font-semibold text-base md:text-lg'>Email Information</h4>
                                <a href="mailto:Contact@ebytelogic.com" className='text-[#5d6471] text-sm md:text-[15px]'>Contact@ebytelogic.com</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr className="mb-6 mt-8 border-gray-300" />
                        <p className="font-semibold mb-3 text-primaryText">Follow Us On Social Media</p>
                        <div className="flex gap-4 text-white">
                            <Button className='!rounded-full !w-11 !h-11 flex items-center justify-center !p-0'>
                                <Link href={'https://www.google.com/search?q=ebytelogic&oq=ebytelogic&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg0IABBFGCcYOxiABBiKBTIGCAEQRRg8MgYIAhBFGDwyCggDEAAYgAQYogQyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDQ2OTVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8'}><FaGoogle className='!w-5 !h-5' /></Link>
                            </Button>
                            <Button className='!rounded-full !w-11 !h-11 flex items-center justify-center !p-0'>
                                <Link href={'https://in.linkedin.com/company/ebytelogic'}><FaLinkedinIn className='!w-5 !h-5' /></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:-mb-[120px]">
                <Subscribe className='z-20' />
            </div>
            <ToastContainer className="!z-[999999]" />
        </section>
    )
}

