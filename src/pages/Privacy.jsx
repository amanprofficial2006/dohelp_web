import { useState } from "react";
import {
  FaShieldAlt,
  FaLock,
  FaEye,
  FaDatabase,
  FaCookieBite,
  FaUserShield,
  FaGavel,
  FaQuestionCircle,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: <FaShieldAlt /> },
    { id: "collection", label: "Data Collection", icon: <FaDatabase /> },
    { id: "usage", label: "Data Usage", icon: <FaEye /> },
    { id: "sharing", label: "Data Sharing", icon: <FaUserShield /> },
    { id: "cookies", label: "Cookies", icon: <FaCookieBite /> },
    { id: "rights", label: "Your Rights", icon: <FaGavel /> },
    { id: "contact", label: "Contact Us", icon: <FaQuestionCircle /> }
  ];

  const privacyPrinciples = [
    {
      icon: <FaLock />,
      title: "Data Security",
      description: "We implement robust security measures to protect your personal information."
    },
    {
      icon: <FaEye />,
      title: "Transparency",
      description: "We clearly explain what data we collect and how we use it."
    },
    {
      icon: <FaUserShield />,
      title: "User Control",
      description: "You have control over your data and can request access or deletion."
    },
    {
      icon: <FaCheckCircle />,
      title: "Compliance",
      description: "We comply with all applicable data protection laws and regulations."
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <FaShieldAlt className="text-blue-600 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                  ? "bg-blue-600 text-white shadow-md"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy Overview</h2>
              <p className="text-gray-600 mb-6">
                At DoHelp, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {privacyPrinciples.map((principle, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 text-blue-600">
                      {principle.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                    <p className="text-gray-600">{principle.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                    We only collect information necessary for providing our services
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                    Your data is encrypted and stored securely
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                    We never sell your personal information to third parties
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                    You can request deletion of your data at any time
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === "collection" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Name, email address, and phone number</li>
                    <li>• Profile information and preferences</li>
                    <li>• Government-issued ID for verification</li>
                    <li>• Payment information (processed securely by third parties)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Device information and IP address</li>
                    <li>• Browser type and version</li>
                    <li>• Pages visited and time spent on our platform</li>
                    <li>• Location data (with your permission)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Messages between users on our platform</li>
                    <li>• Support tickets and feedback</li>
                    <li>• Survey responses</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "usage" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Provision</h3>
                  <p className="text-gray-600 mb-3">We use your information to:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Create and manage your account</li>
                    <li>• Connect you with helpers and task posters</li>
                    <li>• Process payments and maintain transaction records</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Improvement</h3>
                  <p className="text-gray-600 mb-3">We analyze usage patterns to:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Improve our services and user experience</li>
                    <li>• Develop new features and functionality</li>
                    <li>• Ensure platform security and prevent fraud</li>
                    <li>• Generate anonymized analytics and reports</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Compliance</h3>
                  <p className="text-gray-600 mb-3">We may use your information to:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Comply with legal obligations</li>
                    <li>• Enforce our Terms of Service</li>
                    <li>• Protect against fraud and illegal activities</li>
                    <li>• Respond to legal requests from authorities</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "sharing" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Sharing and Disclosure</h2>

              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">We DO NOT sell your personal information</h3>
                  <p className="text-gray-700">
                    We are committed to protecting your privacy and do not sell, trade, or rent your personal information to third parties for marketing purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Limited Sharing</h3>
                  <p className="text-gray-600 mb-3">We may share your information only in the following circumstances:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>With your consent:</strong> When you explicitly agree to share information</li>
                    <li>• <strong>Service providers:</strong> Trusted partners who help us operate our platform (under strict confidentiality agreements)</li>
                    <li>• <strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                    <li>• <strong>Safety concerns:</strong> To prevent harm or illegal activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Anonymized Data</h3>
                  <p className="text-gray-600">
                    We may share aggregated, anonymized data that cannot be used to identify individual users for research, analytics, or business purposes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "cookies" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking Technologies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What Are Cookies?</h3>
                  <p className="text-gray-600">
                    Cookies are small text files stored on your device that help us provide a better user experience and analyze how our platform is used.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Types of Cookies We Use</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                      <p className="text-gray-600 text-sm">Required for basic platform functionality, login, and security.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                      <p className="text-gray-600 text-sm">Help us understand how users interact with our platform.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Functional Cookies</h4>
                      <p className="text-gray-600 text-sm">Remember your preferences and settings.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                      <p className="text-gray-600 text-sm">Used to deliver relevant advertisements (with your consent).</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Managing Cookies</h3>
                  <p className="text-gray-600 mb-3">You can control cookies through:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Your browser settings</li>
                    <li>• Our cookie preference center</li>
                    <li>• Privacy settings in your account</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "rights" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>

              <div className="space-y-6">
                <p className="text-gray-600">
                  Depending on your location, you may have certain rights regarding your personal information. We are committed to honoring these rights where applicable.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Access</h3>
                    <p className="text-gray-600 text-sm">Request a copy of the personal information we hold about you.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Correction</h3>
                    <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete information.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Deletion</h3>
                    <p className="text-gray-600 text-sm">Request deletion of your personal information (subject to legal requirements).</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Portability</h3>
                    <p className="text-gray-600 text-sm">Request transfer of your data in a structured format.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Restriction</h3>
                    <p className="text-gray-600 text-sm">Request limitation of how we process your information.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Objection</h3>
                    <p className="text-gray-600 text-sm">Object to certain types of data processing.</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
                  <p className="text-gray-700 mb-3">
                    To exercise any of these rights, please contact us using the information provided in the Contact Us section.
                    We will respond to your request within 30 days and may ask for verification of your identity.
                  </p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Privacy Team
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us About Privacy</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Inquiries</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Privacy Officer</p>
                        <p className="text-gray-600">privacy@dohelp.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaQuestionCircle className="text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">General Support</p>
                        <p className="text-gray-600">support@dohelp.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection Authority</h3>
                  <p className="text-gray-600 mb-4">
                    If you are not satisfied with our response to your privacy concerns, you have the right to lodge a complaint with your local data protection authority.
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>For users in India: Contact the Data Protection Board of India</p>
                    <p>For users in EU: Contact your local supervisory authority</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Changes to This Policy</h3>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                  Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-blue-100 rounded-xl inline-block mb-4">
              <FaShieldAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your privacy preferences</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Access Settings
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-green-100 rounded-xl inline-block mb-4">
              <FaDatabase className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data Requests</h3>
            <p className="text-gray-600 text-sm mb-4">Request access to your data</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Submit Request
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-purple-100 rounded-xl inline-block mb-4">
              <FaQuestionCircle className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Help & Support</h3>
            <p className="text-gray-600 text-sm mb-4">Get help with privacy questions</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Contact Support
              <FaArrowRight />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
