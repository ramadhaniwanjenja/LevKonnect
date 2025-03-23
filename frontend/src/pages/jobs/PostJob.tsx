import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

const PostJob = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface FormData {
    title: string;
    category: string;
    description: string;
    budget: string;
    location: string;
    duration: string;
    requiredSkills: string[];
    deadline: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    budget: '',
    location: '',
    duration: '',
    requiredSkills: [],
    deadline: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    'Solar Installation',
    'Energy Efficiency',
    'Wind Energy',
    'Biogas',
    'Micro-hydro',
    'Energy Storage',
    'Power Distribution',
    'Energy Audit',
    'Energy Consulting',
    'Maintenance & Repair'
  ];

  const skillOptions = [
    'PV System Design',
    'Electrical Engineering',
    'Solar Panel Installation',
    'Energy Assessment',
    'Renewable Energy',
    'Project Management',
    'Wind Turbine Installation',
    'Battery Storage Systems',
    'Microgrids',
    'Energy Efficiency',
    'CAD Design',
    'Electrical Wiring',
    'Inverter Installation',
    'Energy Modeling',
    'Power Electronics'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = formData.requiredSkills.includes(skill)
      ? formData.requiredSkills.filter(s => s !== skill)
      : [...formData.requiredSkills, skill];
    setFormData({ ...formData, requiredSkills: updatedSkills });
    if (errors.requiredSkills && updatedSkills.length > 0) setErrors({ ...errors, requiredSkills: '' });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) newErrors.budget = 'Budget must be a positive number';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    else if (isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) newErrors.duration = 'Duration must be a positive number';
    if (formData.requiredSkills.length === 0) newErrors.requiredSkills = 'At least one skill is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    else {
      const today = new Date();
      const deadlineDate = new Date(formData.deadline);
      if (deadlineDate < today) newErrors.deadline = 'Deadline must be a future date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Debug
    if (!token) {
      console.error('No token found!');
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      budget: formData.budget,
      location: formData.location,
      duration: formData.duration,
      requiredSkills: formData.requiredSkills,
      deadline: formData.deadline,
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/api/jobs/auth/jobs', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Job posted:', response.data);
      navigate('/job-posted-success');
    } catch (error) {
      console.error('Error posting job:', error.response ? error.response.data : error.message);
      setErrors({ ...errors, submit: 'Failed to post job. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="client" />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>
            <p className="text-gray-600">Fill in the details to find the right professional for your project.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g., Solar Panel Installation for Rural School"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Describe the project in detail..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (USD) *</label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    placeholder="e.g., 1000"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget}</p>}
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (days) *</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    placeholder="e.g., 30"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Project Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g., Dar es Salaam, Tanzania"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">Bid Deadline *</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.deadline ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.deadline && <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleSkillToggle(skill)}
                      className={`cursor-pointer p-2 rounded-full border ${
                        formData.requiredSkills.includes(skill)
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                {errors.requiredSkills && <p className="mt-2 text-sm text-red-500">{errors.requiredSkills}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions (Optional)</label>
                <textarea
                  id="additionalInstructions"
                  name="additionalInstructions"
                  rows={3}
                  placeholder="Any special requirements or details for potential bidders..."
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
              {errors.submit && <div className="mt-4 text-center"><p className="text-sm text-red-500">{errors.submit}</p></div>}
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;