import { useState } from "react";
import {
  FaGavel,
  FaUser,
  FaHandshake,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileContract,
  FaBalanceScale,
  FaQuestionCircle,
  FaArrowRight
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Terms() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: <FaGavel /> },
    { id: "acceptance", label: "Acceptance", icon: <FaCheckCircle /> },
    { id: "services", label: "Services", icon: <FaHandshake /> },
    { id: "user-conduct", label: "User Conduct", icon: <FaUser /> },
    { id: "payments", label: "Payments", icon: <FaBalanceScale /> },
    { id: "liability", label: "Liability", icon: <FaShieldAlt /> },
    { id: "termination", label: "Termination", icon: <FaExclamationTriangle /> },
    { id: "contact", label: "Contact", icon: <FaQuestionCircle /> }
  ];

  const keyTerms = [
    {
      icon: <FaUser />,
      title: "User Eligibility",
      description: "You must be 18+ and legally capable of entering contracts."
    },
    {
      icon: <FaHandshake />,
      title: "Service Agreement",
      description: "Clear terms for task posting, acceptance, and completion."
    },
    {
      icon: <FaShieldAlt />,
      title: "Safety First",
      description: "Commitment to user safety and platform security."
    },
    {
      icon: <FaBalanceScale />,
      title: "Fair Payments",
      description: "Transparent pricing and secure payment processing."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <FaGavel className="text-purple-600 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-purple-600">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of DoHelp platform. Please read them carefully before using our services.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 2024</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12 bg-white rounded-xl p-2 shadow-lg"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeSection === section.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {activeSection === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service Overview</h2>
              <p className="text-gray-600 mb-6">
                Welcome to DoHelp! These Terms of Service ("Terms") govern your access to and use of the DoHelp platform,
                including our website, mobile application, and related services. By using our platform, you agree to be bound by these Terms.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {keyTerms.map((term, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 text-purple-600">
                      {term.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{term.title}</h3>
                    <p className="text-gray-600">{term.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notice</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                    These terms apply to all users of our platform
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                    By using DoHelp, you accept these terms and our Privacy Policy
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                    We may update these terms with reasonable notice
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                    Continued use after changes means you accept the updates
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === "acceptance" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceptance of Terms</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Agreement to Terms</h3>
                  <p className="text-gray-600 mb-4">
                    By accessing or using the DoHelp platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    If you do not agree to these terms, you must not use our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Electronic Communications</h3>
                  <p className="text-gray-600 mb-4">
                    When you use our services or send emails to us, you are communicating with us electronically. You consent to receive communications from us electronically,
                    and you agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement
                    that such communications be in writing.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h3>
                  <p className="text-gray-600 mb-4">
                    You must be at least 18 years old and a resident of a country where our services are available to use DoHelp. By agreeing to these Terms,
                    you represent and warrant that you meet all of the foregoing eligibility requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "services" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Provided</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Overview</h3>
                  <p className="text-gray-600 mb-4">
                    DoHelp is a platform that connects individuals and businesses seeking help with tasks ("Task Posters") with individuals willing to provide assistance ("Helpers").
                    Our platform facilitates the posting, discovery, and completion of various tasks including but not limited to household chores, errands, repairs, and professional services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Task Posting and Matching</h3>
                  <p className="text-gray-600 mb-4">
                    Task Posters can create detailed task listings specifying requirements, location, budget, and timeline. Our platform uses location-based matching and skill verification
                    to connect Task Posters with qualified Helpers in their area.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication Tools</h3>
                  <p className="text-gray-600 mb-4">
                    We provide secure in-app messaging and communication tools to facilitate coordination between Task Posters and Helpers. All communications must remain professional
                    and related to the task at hand.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Processing</h3>
                  <p className="text-gray-600 mb-4">
                    DoHelp facilitates secure payment processing between Task Posters and Helpers. We may charge service fees for facilitating transactions and providing platform access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "user-conduct" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Conduct</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Acceptable Use</h3>
                  <p className="text-gray-600 mb-4">
                    You agree to use DoHelp only for lawful purposes and in accordance with these Terms. You are responsible for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Posting false, misleading, or fraudulent task listings</li>
                    <li>• Harassment, discrimination, or abusive behavior toward other users</li>
                    <li>• Engaging in illegal activities or violating applicable laws</li>
                    <li>• Sharing personal information of others without consent</li>
                    <li>• Attempting to circumvent platform fees or payment systems</li>
                    <li>• Using automated tools or bots to access the platform</li>
                    <li>• Impersonating other individuals or entities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Standards</h3>
                  <p className="text-gray-600 mb-4">
                    All task descriptions, communications, and user-generated content must be accurate, respectful, and appropriate. We reserve the right to remove content
                    that violates these standards or our community guidelines.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Consequences of Violation</h3>
                  <p className="text-gray-600 mb-4">
                    Violation of these conduct rules may result in account suspension, permanent termination, or legal action. We may also report serious violations to relevant authorities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "payments" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments and Fees</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Processing</h3>
                  <p className="text-gray-600 mb-4">
                    DoHelp uses secure third-party payment processors to handle all transactions. All payments are processed in accordance with PCI DSS standards and other applicable security requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Fees</h3>
                  <p className="text-gray-600 mb-4">
                    DoHelp charges a service fee for facilitating connections and providing platform services. The fee structure is as follows:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4 ml-4">
                    <li>• Tasks under $50: 10% service fee</li>
                    <li>• Tasks $50-$200: 8% service fee</li>
                    <li>• Tasks over $200: 5% service fee</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Terms</h3>
                  <p className="text-gray-600 mb-4">
                    Task Posters agree to pay the agreed-upon amount plus applicable service fees. Helpers receive payment minus platform fees after task completion and confirmation.
                    All payments are held in escrow until the task is marked as completed by both parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Refunds and Disputes</h3>
                  <p className="text-gray-600 mb-4">
                    Refunds may be issued at DoHelp's discretion in cases of service failure, cancellation, or other valid reasons. Payment disputes should be reported within 48 hours
                    of task completion through our dispute resolution process.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "liability" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Liability</h3>
                  <p className="text-gray-600 mb-4">
                    DoHelp acts solely as a platform connecting Task Posters and Helpers. We are not responsible for the quality, safety, legality, or completion of tasks performed through our platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">User Interactions</h3>
                  <p className="text-gray-600 mb-4">
                    You acknowledge that your interactions with other users are at your own risk. DoHelp does not guarantee the accuracy of user profiles, task descriptions, or the performance of services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Disclaimer of Warranties</h3>
                  <p className="text-gray-600 mb-4">
                    The platform is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitation of Damages</h3>
                  <p className="text-gray-600 mb-4">
                    In no event shall DoHelp be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Indemnification</h3>
                  <p className="text-gray-600 mb-4">
                    You agree to indemnify and hold DoHelp harmless from any claims, damages, or expenses arising from your use of the platform or violation of these Terms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "termination" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Termination</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Termination by User</h3>
                  <p className="text-gray-600 mb-4">
                    You may terminate your account at any time by contacting our support team or using the account deletion feature in your profile settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Termination by DoHelp</h3>
                  <p className="text-gray-600 mb-4">
                    We reserve the right to suspend or terminate your account immediately, without prior notice, for violation of these Terms or for any other reason we deem necessary to protect our platform and community.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Effect of Termination</h3>
                  <p className="text-gray-600 mb-4">
                    Upon termination, your right to use the platform ceases immediately. We may delete your account data after a reasonable period following termination, except as required to comply with legal obligations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Survival of Terms</h3>
                  <p className="text-gray-600 mb-4">
                    Sections related to liability, indemnification, and dispute resolution survive termination of these Terms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Support</h3>
                  <p className="text-gray-600 mb-4">
                    For questions about these Terms or our services, please contact our support team:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Email: support@dohelp.com</li>
                    <li>• Phone: 1-800-DOHELP (1-800-364-357)</li>
                    <li>• Live Chat: Available 24/7 on our website</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Address</h3>
                  <p className="text-gray-600 mb-4">
                    DoHelp Inc.<br />
                    123 Help Street<br />
                    Support City, SC 12345<br />
                    United States
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Time</h3>
                  <p className="text-gray-600 mb-4">
                    We strive to respond to all inquiries within 24 hours during business days. For urgent matters related to safety or security, please call our emergency line.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Feedback</h3>
                  <p className="text-gray-600 mb-4">
                    We welcome your feedback on our platform and services. Please use the contact information above to share your thoughts and suggestions for improvement.
                  </p>
                </div>
              </div>
            </div>
          )}

        </motion.div>

      </div>
    </div>
  );
}
