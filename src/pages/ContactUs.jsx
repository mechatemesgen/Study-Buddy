import React from 'react';
import { Input } from "../components/ui/input";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-light-primary dark:bg-dark-primary flex items-center justify-center">
            <div className="bg-light-secondary dark:bg-dark-secondary p-8 rounded-lg shadow-md w-full max-w-md border border-light-border dark:border-dark-border">
                <h1 className="text-2xl font-bold text-light-heading dark:text-dark-heading mb-6 text-center">Contact Us</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-dark-text">
                            Name
                        </label>
                        <Input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-transparent text-light-text dark:text-dark-text"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-dark-text">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-transparent text-light-text dark:text-dark-text"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-dark-text">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="mt-1 block w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-transparent text-light-text dark:text-dark-text"
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;