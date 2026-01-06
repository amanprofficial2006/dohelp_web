import { useState } from "react";
import {
  FaCookieBite,
  FaShieldAlt,
  FaCog,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileContract,
  FaQuestionCircle,
  FaArrowRight
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Cookies() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: <FaCookieBite /> },
    { id: "what-are-cookies", label: "What Are Cookies", icon: <FaQuestionCircle /> },
    { id: "how-we-use", label: "How We Use", icon: <FaCog /> },
    { id: "types-of-cookies", label: "Types of Cookies", icon: <FaFileContract /> },
    { id: "managing-cookies", label: "Managing Cookies", icon: <FaShieldAlt /> },
    { id: "third-party", label: "Third Party", icon: <FaExclamationTriangle /> },
    { id: "contact", label: "Contact", icon: <FaCheckCircle /> }
  ];

  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Required for the website to function properly. These cannot be disabled.",
      examples: ["Authentication", "Security", "Session management"]
    },
    {
      type: "Performance Cookies",
      description: "Help us understand how visitors interact with our website.",
      examples: ["Analytics", "Error reporting", "Load times"]
    },
    {
      type: "Functional Cookies",
      description: "Enable enhanced functionality and personalization.",
      examples: ["Language preferences", "Location settings", "User preferences"]
    },
    {
      type: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaign effectiveness.",
      examples: ["Advertising", "Social media", "Retargeting"]
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <FaCookieBite className="text-orange-600 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie <span className="text-orange-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about how we use cookies to improve your experience on DoHelp platform.
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
                  ? "bg-orange-600 text-white shadow-md"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Policy Overview</h2>
              <p className="text-gray-600 mb-6">
                This Cookie Policy explains how DoHelp ("we", "us", or "our") uses cookies and similar technologies
                when you visit our website or use our mobile application. By using our platform, you consent to the use of cookies in accordance with this policy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 text-orange-600">
                    <FaCookieBite />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What Are Cookies?</h3>
                  <p className="text-gray-600">Small text files stored on your device that help us provide a better user experience.</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 text-orange-600">
                    <FaShieldAlt />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Privacy Matters</h3>
                  <p className="text-gray-600">We respect your privacy and only use cookies for legitimate purposes.</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notice</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-600 mt-1 flex-shrink-0" />
                    Cookies help us improve our services and user experience
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-600 mt-1 flex-shrink-0" />
                    You can control cookie settings through your browser
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-600 mt-1 flex-shrink-0" />
                    Essential cookies cannot be disabled as they are necessary for the site to function
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-600 mt-1 flex-shrink-0" />
                    We may update this policy with reasonable notice
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === "what-are-cookies" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Definition</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                    They allow the website to remember your actions and preferences over time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How Cookies Work</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies work by assigning a unique identification number to your device. This ID number is then used to track your browsing activity on our website.
                    Cookies do not contain personal information themselves, but they can be used to link to personal information we store about you.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Similar Technologies</h3>
                  <p className="text-gray-600 mb-4">
                    In addition to cookies, we may use similar technologies such as web beacons, pixels, and local storage.
                    These technologies serve similar purposes to cookies and are covered by this Cookie Policy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "how-we-use" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Cookies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication & Security</h3>
                  <p className="text-gray-600 mb-4">
                    We use cookies to keep you logged in to your account and to protect your account from unauthorized access.
                    These cookies help us verify your identity and maintain secure sessions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics & Performance</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies help us understand how our website is being used, which pages are most popular, and how users navigate through our site.
                    This information helps us improve our website's performance and user experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personalization</h3>
                  <p className="text-gray-600 mb-4">
                    We use cookies to remember your preferences, such as language settings, location preferences, and display options.
                    This allows us to provide a more personalized experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Marketing & Advertising</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies may be used to deliver relevant advertisements and to measure the effectiveness of our marketing campaigns.
                    We may also use cookies to show you ads for our services on other websites.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "types-of-cookies" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>

              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{cookie.type}</h3>
                    <p className="text-gray-600 mb-4">{cookie.description}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                      <ul className="space-y-1 text-gray-600">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FaArrowRight className="text-orange-600 text-sm" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "managing-cookies" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-600 mb-4">
                    Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 'Options' or 'Preferences' menu of your browser.
                    You can set your browser to block or alert you about cookies, but please note that some parts of our website may not work properly without cookies.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Consent Banner</h3>
                  <p className="text-gray-600 mb-4">
                    When you first visit our website, you will see a cookie consent banner that allows you to accept or reject non-essential cookies.
                    You can change your preferences at any time by clicking on the cookie settings link in our website footer.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Opting Out</h3>
                  <p className="text-gray-600 mb-4">
                    You can opt out of interest-based advertising by visiting the opt-out pages of our advertising partners or by using tools provided by your browser or device.
                    Please note that opting out does not mean you will stop seeing ads; you will just see less relevant ads.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mobile Devices</h3>
                  <p className="text-gray-600 mb-4">
                    On mobile devices, you can manage cookies through your device's settings or through the settings in your mobile browser.
                    Some mobile apps may also have their own cookie management features.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "third-party" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Third-Party Services</h3>
                  <p className="text-gray-600 mb-4">
                    We may use third-party services that place cookies on your device. These services include analytics providers, advertising networks, and social media platforms.
                    These third parties have their own privacy policies and cookie policies, which we encourage you to review.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                  <p className="text-gray-600 mb-4">
                    We use Google Analytics and similar services to help us understand how our website is used. These services may collect information about your use of our website,
                    including your IP address, browser type, and pages visited. This information is used to improve our website and services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Social Media Cookies</h3>
                  <p className="text-gray-600 mb-4">
                    If you interact with social media features on our website, such as Facebook Like buttons or Twitter share buttons, these social media companies may set cookies on your device.
                    These cookies allow the social media companies to track your interactions with their services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Advertising Cookies</h3>
                  <p className="text-gray-600 mb-4">
                    We may work with advertising networks that use cookies to deliver relevant advertisements to you. These cookies may track your browsing activity across different websites
                    to build a profile of your interests and show you ads that are more likely to be relevant to you.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Policy Questions</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Email: privacy@dohelp.com</li>
                    <li>• Phone: 1-800-DOHELP (1-800-364-357)</li>
                    <li>• Mail: DoHelp Inc., 123 Help Street, Support City, SC 12345, United States</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Updates to This Policy</h3>
                  <p className="text-gray-600 mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                    We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
                  <p className="text-gray-600 mb-4">
                    Depending on your location, you may have certain rights regarding the processing of your personal data through cookies.
                    These rights may include the right to access, rectify, erase, or restrict the processing of your data.
                    Please contact us if you wish to exercise any of these rights.
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
