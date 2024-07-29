import React from "react";
import { FooterMB } from "../components/FooterMB";

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 text-black pt-20">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-mh-blue mb-6">
            Terms and Conditions
          </h1>

          <section className="mb-6">
            <p className="text-gray-700 text-center">
              Welcome to MarhbaBik! By using our platform, you agree to the
              following terms and conditions. Please read them carefully.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Use of the Platform</h2>
            <p className="text-gray-700">
              Our platform provides services to help you find accommodations,
              car rentals, and travel experiences in Algeria. You agree to use
              the platform in accordance with these terms and any applicable
              laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">User Accounts</h2>
            <p className="text-gray-700">
              You may need to create an account to use some of our services. You
              are responsible for maintaining the confidentiality of your
              account and password and for restricting access to your account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Content</h2>
            <p className="text-gray-700">
              You are responsible for any content you post on our platform. You
              agree not to post any content that is illegal, offensive, or
              infringes on the rights of others.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend your account and
              access to our services at our sole discretion, without notice and
              liability, for conduct that we believe violates these terms or is
              harmful to other users of the platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Liability</h2>
            <p className="text-gray-700">
              Our platform is provided on an "as is" and "as available" basis.
              We do not guarantee the accuracy, completeness, or usefulness of
              any information provided on the platform, and we are not
              responsible for any errors or omissions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these terms from time to time. We will notify you of
              any changes by posting the new terms on our platform. You are
              advised to review these terms periodically for any changes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms and Conditions, please
              contact us at support@marhbabik.com.
            </p>
          </section>
        </div>
      </div>
      <FooterMB />
    </>
  );
};

export default TermsAndConditions;
