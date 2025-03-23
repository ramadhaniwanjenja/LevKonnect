import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';
import { Link } from 'react-router-dom';

interface ProfileData {
  userType: 'client' | 'engineer';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profilePicture?: string;
  // Engineer specific fields
  skills?: string[];
  hourlyRate?: number;
  experience?: number;
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
  }[];
  portfolio?: {
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  // Client specific fields
  company?: string;
  website?: string;
  industryType?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  // For demo purposes, we'll assume we're viewing our own profile
  // In a real app, you'd determine if this is the user's own profile or someone else's
  const isOwnProfile = true;
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [newSkill, setNewSkill] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch profile data
    setTimeout(() => {
      // This would be replaced with an actual API call
      const mockProfileData: ProfileData = {
        userType: 'engineer', // or 'client'
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+255 765 432 100',
        location: 'Dar es Salaam, Tanzania',
        bio: 'Experienced solar engineer with over 8 years specializing in off-grid systems for rural communities. Passionate about bringing sustainable energy solutions to underserved areas.',
        profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
        skills: ['Solar Panel Installation', 'PV System Design', 'Electrical Wiring', 'Battery Storage Systems', 'Renewable Energy Consultation'],
        hourlyRate: 25,
        experience: 8,
        education: [
          {
            degree: 'Bachelor of Engineering, Electrical Engineering',
            institution: 'University of Dar es Salaam',
            year: '2015'
          },
          {
            degree: 'Diploma in Renewable Energy Technology',
            institution: 'Technical College of Tanzania',
            year: '2013'
          }
        ],
        certifications: [
          {
            name: 'Certified Solar PV Installer',
            issuer: 'Renewable Energy Association of Tanzania',
            year: '2017'
          },
          {
            name: 'Advanced Off-Grid System Design',
            issuer: 'International Solar Energy Institute',
            year: '2018'
          }
        ],
        portfolio: [
          {
            title: 'Rural Health Clinic Electrification',
            description: 'Designed and installed a 10kW solar system with battery backup for a rural health clinic, providing 24/7 power for critical medical equipment.',
            imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          },
          {
            title: 'Community School Solar Project',
            description: 'Installed a 5kW solar system for a community school, enabling computer classes and evening study sessions.',
            imageUrl: 'https://images.unsplash.com/photo-1497440001374-f324300d4206?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          }
        ]
      };
      
      setProfileData(mockProfileData);
      setFormData(mockProfileData);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleEducationChange = (index: number, field: string, value: string) => {
    if (!formData || !formData.education) return;
    
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };
  
  const handleCertificationChange = (index: number, field: string, value: string) => {
    if (!formData || !formData.certifications) return;
    
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      certifications: updatedCertifications
    });
  };
  
  const handlePortfolioChange = (index: number, field: string, value: string) => {
    if (!formData || !formData.portfolio) return;
    
    const updatedPortfolio = [...formData.portfolio];
    updatedPortfolio[index] = {
      ...updatedPortfolio[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      portfolio: updatedPortfolio
    });
  };
  
  const addEducation = () => {
    if (!formData) return;
    
    const updatedEducation = formData.education ? [...formData.education] : [];
    updatedEducation.push({
      degree: '',
      institution: '',
      year: ''
    });
    
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };
  
  const removeEducation = (index: number) => {
    if (!formData || !formData.education) return;
    
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };
  
  const addCertification = () => {
    if (!formData) return;
    
    const updatedCertifications = formData.certifications ? [...formData.certifications] : [];
    updatedCertifications.push({
      name: '',
      issuer: '',
      year: ''
    });
    
    setFormData({
      ...formData,
      certifications: updatedCertifications
    });
  };
  
  const removeCertification = (index: number) => {
    if (!formData || !formData.certifications) return;
    
    const updatedCertifications = [...formData.certifications];
    updatedCertifications.splice(index, 1);
    
    setFormData({
      ...formData,
      certifications: updatedCertifications
    });
  };
  
  const addPortfolioItem = () => {
    if (!formData) return;
    
    const updatedPortfolio = formData.portfolio ? [...formData.portfolio] : [];
    updatedPortfolio.push({
      title: '',
      description: ''
    });
    
    setFormData({
      ...formData,
      portfolio: updatedPortfolio
    });
  };
  
  const removePortfolioItem = (index: number) => {
    if (!formData || !formData.portfolio) return;
    
    const updatedPortfolio = [...formData.portfolio];
    updatedPortfolio.splice(index, 1);
    
    setFormData({
      ...formData,
      portfolio: updatedPortfolio
    });
  };
  
  const addSkill = () => {
    if (!formData || !newSkill.trim()) return;
    
    const updatedSkills = formData.skills ? [...formData.skills] : [];
    
    // Check if skill already exists
    if (!updatedSkills.includes(newSkill.trim())) {
      updatedSkills.push(newSkill.trim());
      
      setFormData({
        ...formData,
        skills: updatedSkills
      });
    }
    
    setNewSkill('');
  };
  
  const removeSkill = (skill: string) => {
    if (!formData || !formData.skills) return;
    
    const updatedSkills = formData.skills.filter(s => s !== skill);
    
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };
  
  const validateForm = () => {
    if (!formData) return false;
    
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Engineer specific validation
    if (formData.userType === 'engineer') {
      if (!formData.hourlyRate || formData.hourlyRate <= 0) {
        newErrors.hourlyRate = 'Hourly rate must be greater than 0';
      }
      
      if (!formData.experience || formData.experience < 0) {
        newErrors.experience = 'Experience must be a positive number';
      }
      
      if (!formData.skills || formData.skills.length === 0) {
        newErrors.skills = 'At least one skill is required';
      }
    }
    
    // Client specific validation
    if (formData.userType === 'client' && formData.company !== undefined) {
      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setProfileData(formData);
      setIsEditing(false);
      setIsSaving(false);
      
      // Show success notification (you could add a toast notification here)
    }, 1500);
  };
  
  const renderOverviewTab = () => {
    if (!profileData) return null;
    
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About Me</h3>
          <p className="text-gray-700 whitespace-pre-line">{profileData.bio}</p>
        </div>
        
        {profileData.userType === 'engineer' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills?.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Education</h3>
                <div className="space-y-4">
                  {profileData.education?.map((edu, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                      <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
                <div className="space-y-4">
                  {profileData.certifications?.map((cert, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                      <h4 className="font-medium text-gray-800">{cert.name}</h4>
                      <p className="text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        
        {profileData.userType === 'client' && profileData.company && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Company Name</h4>
                <p className="text-gray-800">{profileData.company}</p>
              </div>
              {profileData.website && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Website</h4>
                  <p className="text-gray-800">
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profileData.website}
                    </a>
                  </p>
                </div>
              )}
              {profileData.industryType && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Industry</h4>
                  <p className="text-gray-800">{profileData.industryType}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const renderPortfolioTab = () => {
    if (!profileData || !profileData.portfolio) {
      return (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">No portfolio items yet.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileData.portfolio.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
            {item.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderEditProfileForm = () => {
    if (!formData) return null;
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>
            
            {formData.userType === 'client' && (
              <>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry Type
                  </label>
                  <input
                    type="text"
                    id="industryType"
                    name="industryType"
                    value={formData.industryType || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              </>
            )}
            
            {formData.userType === 'engineer' && (
              <>
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                    Hourly Rate (USD) *
                  </label>
                  <input
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={formData.hourlyRate || ''}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.hourlyRate && <p className="mt-1 text-sm text-red-500">{errors.hourlyRate}</p>}
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience || ''}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About Me</h3>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Tell others about yourself, your expertise, and what you're passionate about..."
          ></textarea>
        </div>
        
        {formData.userType === 'engineer' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills *</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills?.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-green-800 hover:text-green-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              {errors.skills && <p className="mb-2 text-sm text-red-500">{errors.skills}</p>}
              
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-l"
                  placeholder="Add a skill (e.g., Solar Panel Installation)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 bg-green-600 text-white rounded-r hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Education
                </button>
              </div>
              
              {formData.education?.map((edu, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800">Education #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Degree/Certificate
                      </label>
                      <input
                        type="text"
                        id={`degree-${index}`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        id={`year-${index}`}
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {(!formData.education || formData.education.length === 0) && (
                <p className="text-gray-500 text-center py-2">No education entries yet.</p>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Certification
                </button>
              </div>

              {formData.certifications?.map((cert, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800">Certification #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`cert-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Certification Name
                      </label>
                      <input
                        type="text"
                        id={`cert-name-${index}`}
                        value={cert.name}
                        onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label htmlFor={`cert-issuer-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Issuer
                      </label>
                      <input
                        type="text"
                        id={`cert-issuer-${index}`}
                        value={cert.issuer}
                        onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label htmlFor={`cert-year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        id={`cert-year-${index}`}
                        value={cert.year}
                        onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {(!formData.certifications || formData.certifications.length === 0) && (
                <p className="text-gray-500 text-center py-2">No certifications added yet.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Portfolio</h3>
                <button
                  type="button"
                  onClick={addPortfolioItem}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Portfolio Item
                </button>
              </div>

              {formData.portfolio?.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800">Portfolio Item #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removePortfolioItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`portfolio-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id={`portfolio-title-${index}`}
                        value={item.title}
                        onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label htmlFor={`portfolio-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id={`portfolio-description-${index}`}
                        value={item.description}
                        onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label htmlFor={`portfolio-image-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL (optional)
                      </label>
                      <input
                        type="text"
                        id={`portfolio-image-${index}`}
                        value={item.imageUrl || ''}
                        onChange={(e) => handlePortfolioChange(index, 'imageUrl', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {(!formData.portfolio || formData.portfolio.length === 0) && (
                <p className="text-gray-500 text-center py-2">No portfolio items added yet.</p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-10">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex flex-col pt-10">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
            <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Go to Dashboard
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-10">
      <Navbar />

      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType={profileData.userType} />

        <main className="flex-grow p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              )}
            </div>

            {isEditing ? (
              renderEditProfileForm()
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-800">{profileData.firstName} {profileData.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-800">{profileData.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-800">{profileData.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-800">{profileData.location}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
                    <p className="text-gray-700 whitespace-pre-line">{profileData.bio}</p>
                  </div>
                </div>

                {profileData.userType === 'engineer' && (
                  <>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
                        <div className="space-y-4">
                          {profileData.education?.map((edu, index) => (
                            <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                              <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                              <p className="text-gray-600">{edu.institution}</p>
                              <p className="text-sm text-gray-500">{edu.year}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h2>
                        <div className="space-y-4">
                          {profileData.certifications?.map((cert, index) => (
                            <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                              <h4 className="font-medium text-gray-800">{cert.name}</h4>
                              <p className="text-gray-600">{cert.issuer}</p>
                              <p className="text-sm text-gray-500">{cert.year}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">Portfolio</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profileData.portfolio?.map((item, index) => (
                          <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                            {item.imageUrl && (
                              <div className="h-48 overflow-hidden">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                            )}
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                              <p className="text-gray-700">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {profileData.userType === 'client' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <p className="text-gray-800">{profileData.company}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <p className="text-gray-800">
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {profileData.website}
                          </a>
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Industry Type</label>
                        <p className="text-gray-800">{profileData.industryType}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
