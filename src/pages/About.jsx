import { motion } from "framer-motion";
import {
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaRocket,
  FaHeart,
  FaGlobe,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaLightbulb
} from "react-icons/fa";

export default function About() {
  const stats = [
    { number: "50K+", label: "Tasks Completed", icon: <FaCheckCircle className="text-green-500" /> },
    { number: "10K+", label: "Active Helpers", icon: <FaUsers className="text-blue-500" /> },
    { number: "4.8", label: "Average Rating", icon: <FaStar className="text-yellow-500" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <FaAward className="text-purple-500" /> }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Trust & Safety",
      description: "We prioritize the safety of our community with verified identities and secure transactions."
    },
    {
      icon: <FaHandshake className="text-2xl" />,
      title: "Community First",
      description: "Building connections and helping neighbors create a stronger, more supportive community."
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Innovation",
      description: "Using technology to make everyday help more accessible and efficient for everyone."
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Empathy",
      description: "Understanding that everyone needs help sometimes, and making it easy to ask for and provide it."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/api/placeholder/150/150",
      bio: "Passionate about connecting people and building communities through technology."
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "/api/placeholder/150/150",
      bio: "Ensuring smooth operations and maintaining the highest standards of service."
    },
    {
      name: "Amit Patel",
      role: "Chief Technology Officer",
      image: "/api/placeholder/150/150",
      bio: "Leading the development of innovative solutions for everyday problems."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">DoHelp</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make everyday help more accessible, connecting people in need with
            trusted helpers in their community. Every task completed strengthens our neighborhoods.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                DoHelp was born from a simple observation: in our fast-paced world, people often
                need help with everyday tasks but don't know where to turn. Whether it's fixing a leaky
                faucet, helping with groceries, or needing assistance with technology, these small
                tasks can create big challenges.
              </p>
              <p>
                We started as a small group of friends helping our neighbors, and quickly realized
                that this model could scale. By leveraging technology, we could connect people who
                need help with those who have the skills and time to provide it, all within their
                local community.
              </p>
              <p>
                Today, DoHelp serves thousands of users across major Indian cities, fostering
                trust, building connections, and making communities stronger, one task at a time.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center">
                <FaGlobe className="text-white text-6xl" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
                <FaHeart className="text-white text-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
            To create a world where help is always just a tap away. We believe that by connecting
            people and leveraging local communities, we can solve everyday problems more efficiently
            and build stronger, more connected neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl bg-white text-blue-600 hover:bg-gray-100 font-semibold transition-colors">
              Join Our Community
            </button>
            <button className="px-8 py-3 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
