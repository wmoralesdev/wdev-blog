import React, { FC } from 'react';
import { toast } from 'react-hot-toast';
import {
    SiFacebook, SiInstagram, SiLinkedin, SiTwitter, SiGithub,
} from 'react-icons/si';

// interface ContactForm {
//     name: string;
//     message: string;
// }

// const { register, handleSubmit } = useForm<ContactForm>({
//     defaultValues: {
//         name: '', message: '',
//     },
// });
const Footer: FC = () => {
    const onSubmit = () => {
        toast.error('This functionality is yet to be completed, sorry! 😥');
    };

    return (
        <footer className="w-full mt-auto flex flex-wrap justify-between items-start py-4 pt-10 mb-4">
            <div className="w-full flex flex-col items-center gap-y-3 border-t border-light pt-4 mb-4
                md:w-1/3 md:mb-0 md:items-start"
            >
                <h1 className="gradient padding mb-2 text-2xl"><span>Where to find me</span></h1>
                <a href="https://www.facebook.com/WalterMorales26" className="inline-flex gap-2 items-center text-lg cust-transition hover:text-primary md:text-xl">
                    <SiFacebook />
                    {' '}
                    Facebook
                </a>
                <a href="https://www.instagram.com/wmoralesdev/" className="inline-flex gap-2 items-center text-lg cust-transition hover:text-primary md:text-xl">
                    <SiInstagram />
                    {' '}
                    Instagram
                </a>
                <a href="https://www.linkedin.com/in/wmoralesdev/" className="inline-flex gap-2 items-center text-lg cust-transition hover:text-primary md:text-xl">
                    <SiLinkedin />
                    {' '}
                    LinkedIn
                </a>
                <a href="https://twitter.com/wmoralesdev" className="inline-flex gap-2 items-center text-lg cust-transition hover:text-primary md:text-xl">
                    <SiTwitter />
                    {' '}
                    Twitter
                </a>
                <a href="https://github.com/wmoralesdev" className="inline-flex gap-2 items-center text-lg cust-transition hover:text-primary md:text-xl">
                    <SiGithub />
                    {' '}
                    Github
                </a>
            </div>
            <div className="w-full flex flex-col items-center border-t border-light pt-4
                md:w-2/3 md:items-end"
            >
                <h1 className="gradient padding mb-2 text-2xl"><span>You can also leave me a message</span></h1>
                <div className="w-full flex flex-col md:w-4/5">
                    <div className="w-full">
                        <h2 className="text-lg font-medium md:text-xl">Name</h2>
                        <input className="input w-full bg-light" />
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-medium md:text-xl">Message</h2>
                        <textarea className="input w-full bg-light" />
                    </div>
                    <button type="button" onClick={onSubmit} className="btn ml-auto md:w-full md:inline-flex md:items-center md:justify-center">Send</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
