import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-gray-100 p-8 pt-20 text-black">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-mh-blue mb-6">Privacy Policy</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                    <p className="text-gray-700">
                        At MarhbaBik, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
                    <p className="text-gray-700">
                        We collect information you provide directly to us, such as when you create an account, make a reservation, or contact us. This may include personal details such as your name, email address, and payment information.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
                    <p className="text-gray-700">
                        We use your information to provide, maintain, and improve our services, process transactions, and communicate with you. We may also use it to personalize your experience and send you updates about our platform.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Sharing Your Information</h2>
                    <p className="text-gray-700">
                        We do not sell or rent your personal information to third parties. We may share it with service providers who assist us in operating our platform, conducting business, or providing services to you, but only to the extent necessary.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
                    <p className="text-gray-700">
                        We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
                    <p className="text-gray-700">
                        You have the right to access, correct, or delete your personal information. You can also request that we restrict the processing of your data or object to its processing. Please contact us if you wish to exercise these rights.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                    <p className="text-gray-700">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                    <p className="text-gray-700">
                        If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at <span className='text-mh-blue'>marhbabik.contact@gmail.com</span>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
