import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaStar,
  FaUsers,
  FaRocket,
  FaHeart,
  FaBalanceScale,
  FaLightbulb,
  FaTrophy,
  FaCoffee,
  FaLaptop,
  FaHandshake
} from "react-icons/fa";

export default function Career() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const jobCategories = [
    { id: "all", label: "All Positions", count: 12 },
    { id: "engineering", label: "Engineering", count: 5 },
    { id: "design", label: "Design", count: 3 },
    { id: "marketing", label: "Marketing", count: 2 },
    { id: "operations", label: "Operations", count: 2 }
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      category: "engineering",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "3-5 years",
      posted: "2 days ago",
      description: "We're looking for a passionate React developer to join our growing team and help build the next generation of our platform.",
      requirements: ["React", "JavaScript", "Node.js", "MongoDB"],
      urgent: true
    },
    {
      id: 2,
      title: "UX/UI Designer",
      category: "design",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "2-4 years",
      posted: "1 week ago",
      description: "Design beautiful and intuitive user experiences for our mobile and web applications.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      urgent: false
    },
    {
      id: 3,
      title: "DevOps Engineer",
      category: "engineering",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹15-20 LPA",
      experience: "4-6 years",
      posted: "3 days ago",
      description: "Build and maintain our cloud infrastructure, ensuring high availability and scalability.",
      requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      urgent: true
    },
    {
      id: 4,
      title: "Content Marketing Manager",
      category: "marketing",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-14 LPA",
      experience: "3-5 years",
      posted: "5 days ago",
      description: "Create compelling content strategies to engage our community and drive growth.",
      requirements: ["Content Strategy", "SEO", "Social Media", "Analytics"],
      urgent: false
    },
    {
      id: 5,
      title: "Customer Success Manager",
      category: "operations",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "2-4 years",
      posted: "1 week ago",
      description: "Ensure our users have amazing experiences and help them succeed with our platform.",
      requirements: ["Customer Service", "Communication", "Problem Solving", "CRM"],
      urgent: false
    }
  ];

  const benefits = [
    {
      icon: <FaRupeeSign className="text-2xl" />,
      title: "Competitive Salary",
      description: "Attractive compensation packages with performance bonuses"
    },
    {
      icon: <FaBalanceScale className="text-2xl" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options"
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Growth Opportunities",
      description: "Clear career progression and learning opportunities"
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Health Benefits",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <FaCoffee className="text-2xl" />,
      title: "Great Culture",
      description: "Collaborative environment with team outings and events"
    },
    {
      icon: <FaLaptop className="text-2xl" />,
      title: "Latest Tech",
      description: "Work with cutting-edge technologies and tools"
    }
  ];

  const culture = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Collaborative",
      description: "We believe in the power of teamwork and open communication"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Innovative",
      description: "Constantly pushing boundaries and exploring new ideas"
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      title: "Results-Driven",
      description: "Focused on achieving goals and delivering impact"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Trustworthy",
      description: "Building trust through transparency and integrity"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            Join Our <span className="text-blue-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Be part of a mission to revolutionize how communities help each other.
            We're looking for passionate individuals ready to make a difference.
          </p>
        </motion.div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culture.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Open Positions</h2>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {jobCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      {job.urgent && (
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBriefcase />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock />
                        {job.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRupeeSign />
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
                      Apply Now
                      <FaArrowRight />
                    </button>
                    <div className="text-sm text-gray-500 text-center">
                      Posted {job.posted}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
            Join a team that's passionate about building technology that helps communities thrive.
            We can't wait to meet you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl bg-white text-blue-600 hover:bg-gray-100 font-semibold transition-colors">
              View All Openings
            </button>
            <button className="px-8 py-3 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors">
              Send Us Your Resume
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
