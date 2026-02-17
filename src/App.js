



import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const FlipCard = ({ digit, isAnimating, isShuffling }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);
  const [shuffleDigit, setShuffleDigit] = useState(digit);

  useEffect(() => {
    if (isShuffling) {
      const shuffleInterval = setInterval(() => {
        setShuffleDigit(Math.floor(Math.random() * 10).toString());
      }, 50);

      setTimeout(() => {
        clearInterval(shuffleInterval);
        setShuffleDigit(digit);
      }, 800);

      return () => clearInterval(shuffleInterval);
    }
  }, [isShuffling, digit]);

  useEffect(() => {
    if (digit !== currentDigit && !isShuffling) {
      setNextDigit(digit);
      setTimeout(() => {
        setCurrentDigit(digit);
      }, 150);
    }
  }, [digit, currentDigit, isShuffling]);

  const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

  return (
    <div className="relative flex-1 h-32 sm:h-36 md:h-40 lg:h-44 rounded-md overflow-hidden flex items-center justify-center mobile-flip-card" style={{ backgroundColor: '#A659FF' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-nunito transition-all duration-100 leading-none">
          {displayDigit}
        </span>
      </div>
      <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-1/2 flex items-end justify-center overflow-hidden" style={{ backgroundColor: '#A659FF' }}>
          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-nunito transform translate-y-1/2 leading-none">
            {displayDigit}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-start justify-center overflow-hidden" style={{ backgroundColor: '#A659FF' }}>
          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-nunito transform -translate-y-1/2 leading-none">
            {displayDigit}
          </span>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2 z-10" style={{ backgroundColor: '#8B4CD9' }}></div>
    </div>
  );
};

const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSwipeReady, setIsSwipeReady] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const swipeThreshold = 200;

  const handlePhoneChange = (phone, meta) => {
    setPhoneNumber(phone);
    const { isValid, country } = meta || {};
    console.log('Phone:', phone, 'IsValid:', isValid, 'Country:', country?.iso2, 'DialCode:', country?.dialCode);
    const digitsOnly = phone.replace(/\D/g, '');
    const countryCode = country?.dialCode || '';
    const nationalNumber = digitsOnly.slice(countryCode.length);
    const isPhoneValid = isValid !== undefined ? isValid : nationalNumber.length >= 8;
    setIsSwipeReady(isPhoneValid);
  };

  const handleMouseDown = (e) => {
    if (!isSwipeReady) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isSwipeReady) return;
    const currentX = e.clientX;
    const distance = Math.max(0, currentX - startX);
    setSwipeDistance(Math.min(distance, swipeThreshold));
  };

  const handleMouseUp = () => {
    if (!isDragging || !isSwipeReady) return;

    if (swipeDistance >= swipeThreshold) {
      onSubmit(phoneNumber);
    } else {
      setSwipeDistance(0);
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!isSwipeReady) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isSwipeReady) return;
    const currentX = e.touches[0].clientX;
    const distance = Math.max(0, currentX - startX);
    setSwipeDistance(Math.min(distance, swipeThreshold));
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isSwipeReady) return;

    if (swipeDistance >= swipeThreshold) {
      onSubmit(phoneNumber);
    } else {
      setSwipeDistance(0);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, swipeDistance, startX, isSwipeReady]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
        >
          ×
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
            <em>ENTER YOUR PHONE NUMBER<br />
              TO GET EXCLUSIVE IN APP<br />
              REWARDS</em>
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
            ENTER PHONE NUMBER
          </label>
          <PhoneInput
            defaultCountry="us"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="w-full font-nunito"
            inputProps={{
              className: "w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito",
              maxLength: 16
            }}
            countrySelectorStyleProps={{
              buttonClassName: "w-[60px] !h-[44px] px-2 py-1 bg-gray-200 rounded-l-lg text-black font-nunito border-none focus:outline-none flex items-center",
              dropdownStyleProps: {
                className: "react-international-phone-country-selector-dropdown"
              }
            }}
          />
        </div>

        <div className="relative">
          <div
            className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
              }`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
              style={{
                transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16">
              <div
                className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
                style={{
                  opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
                }}
              >
                <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
              </div>
            </div>

            <div
              className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
              style={{
                transform: `translateX(${swipeDistance}px)`
              }}
            >
              <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
            </div>
          </div>

          {!isSwipeReady && (
            <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
              Please enter a valid phone number to unlock rewards.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch('https://django.sesh.one/api/privacy-policy/');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 200 && data.data) {
          setPolicyData(data.data);
        } else {
          setError('Invalid API response format');
        }
      } catch (err) {
        setError('Failed to fetch privacy policy: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
        <p className="text-[#4A4A4A] text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
        <p className="text-[#4A4A4A] text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
        >
          ← Back to Home
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
          {policyData.title.charAt(0).toUpperCase() + policyData.title.slice(1)}
        </h1>
        <div
          className="prose prose-lg text-[#4A4A4A] font-nunito"
          dangerouslySetInnerHTML={{ __html: policyData.description }}
        />
      </div>
    </div>
  );
};

// Inline Contact Form Component (for embedding in the app)
const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    category: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://django.sesh.one/api/categories/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        console.log('Categories fetched:', data);
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Set default categories if API fails
        setCategories([
          { id: 1, name: 'Bug Fix' },
          { id: 2, name: 'User Data Request' },
          { id: 3, name: 'General Inquiry' }
        ]);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Form data:', formData);
    console.log('Available categories:', categories);

    // Find the category ID from the selected category name
    const selectedCategory = categories.find(cat => cat.name === formData.category);

    console.log('Selected category:', selectedCategory);

    if (!selectedCategory) {
      setError('Please select a valid category');
      return;
    }

    const payload = {
      email: formData.email,
      phone_number: formData.phoneNumber,
      category: selectedCategory.id,
      description: formData.description
    };

    console.log('Submitting payload:', payload);

    try {
      const response = await fetch('https://django.sesh.one/api/submissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        console.error('Response status:', response.status);
        console.error('Response statusText:', response.statusText);
        throw new Error(`Failed to submit form: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      console.error('Error message:', err.message);
      setError('Failed to submit form. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-[#4A4A4A] text-3xl sm:text-4xl md:text-5xl font-bold font-nunito italic text-center">
          YOUR REQUEST HAS BEEN SUBMITTED
        </p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="bg-red-100 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-700 text-lg font-nunito">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="EMAIL ADDRESS"
              className="w-full px-4 py-3 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito placeholder-black placeholder:font-bold border-none"
              style={{ backgroundColor: '#F9F9F9', border: 'none' }}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="PHONE NUMBER"
              className="w-full px-4 py-3 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito placeholder-black placeholder:font-bold border-none"
              style={{ backgroundColor: '#F9F9F9', border: 'none' }}
            />
          </div>
          <div>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg focus:outline-none font-nunito font-bold border-none"
              style={{ backgroundColor: '#F9F9F9', color: formData.category ? '#4A4A4A' : '#000000', border: 'none' }}
              required
            >
              <option value="" style={{ color: '#000000' }}>INQUIRY TYPE</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="2"
            placeholder="ENTER ANY MORE DETAILS ABOUT YOUR REQUEST"
            className="w-full px-4 py-3 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito placeholder-black placeholder:font-bold border-none"
            style={{ backgroundColor: '#F9F9F9', border: 'none' }}
            required
          />
        </div>
        <div className="flex justify-center" style={{ marginTop: '4px' }}>
          <button
            type="submit"
            className="bg-purple-500 text-white px-32 py-2 rounded-lg hover:bg-purple-600 transition-colors font-nunito font-bold italic"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
};

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    category: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://django.sesh.one/api/categories/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
        if (data.categories.length > 0) {
          setFormData(prev => ({ ...prev, category: data.categories[0].name }));
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again.');
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const selectedCategory = categories.find(cat => cat.name === formData.category);
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phoneNumber,
      category: selectedCategory ? selectedCategory.id : null,
      description: formData.description
    };

    try {
      const response = await fetch('https://django.sesh.one/api/submissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
            Contact Us
          </h1>
          <div className="bg-green-100 rounded-lg p-6 text-center">
            <p className="text-[#4A4A4A] text-lg font-nunito">
              Form successfully submitted!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
        >
          ← Back to Home
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
          Contact Us
        </h1>
        {error && (
          <div className="bg-red-100 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-700 text-lg font-nunito">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">

            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">

            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
              disabled={categories.length === 0}
            >
              {categories.length === 0 ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-nunito"
              disabled={categories.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [userCount, setUserCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [shufflingIndices, setShufflingIndices] = useState(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(() => {
    // Check if user has already submitted phone number
    const hasSubmittedPhone = localStorage.getItem('phoneNumberSubmitted');
    return !hasSubmittedPhone; // Show dialog only if not submitted before
  });
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data.leaderboard)) {
          const formattedData = data.leaderboard
            .filter(item => item.first_name && item.last_name)
            .map(item => ({
              name: `${item.first_name} ${item.last_name}`.trim(),
              score: item.points,
            }));
          setLeaderboardData(formattedData);
        } else {
          console.error('API response does not contain a leaderboard array:', data);
          setLeaderboardData([]);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
        setLeaderboardData([]);
      }
    };

    fetchLeaderboardData();
  }, []);

  const handlePhoneSubmit = async (phoneNumber) => {
    console.log('Phone number submitted:', phoneNumber);
    try {
      const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber, source: "website" }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      // Save to localStorage so dialog doesn't show again
      localStorage.setItem('phoneNumberSubmitted', 'true');
      localStorage.setItem('userPhoneNumber', phoneNumber);

      setShowPhoneDialog(false);
    } catch (error) {
      console.error('Error calling API:', error.message);

      // Save to localStorage even on error so dialog doesn't keep showing
      localStorage.setItem('phoneNumberSubmitted', 'true');

      setShowPhoneDialog(false);
    }
  };

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/current-count/');
        if (response.ok) {
          const data = await response.json();
          setUserCount(data.count || 0);
          setIsActive(data.is_active || false);
        }
      } catch (err) {
        console.error('Error fetching initial count:', err);
      }
    };

    fetchInitialCount();
  }, []);

  useEffect(() => {
    if (isActive && userCount >= 0) {
      const timeoutId = setTimeout(() => {
        const countStr = userCount.toString().padStart(7, '0');
        const allIndices = new Set();
        for (let i = 0; i < countStr.length; i++) {
          allIndices.add(i);
        }
        setShufflingIndices(allIndices);

        const incrementTimeout = setTimeout(async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/increment-count/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              const newCount = data.count;

              const prevCountStr = userCount.toString().padStart(7, '0');
              const newCountStr = newCount.toString().padStart(7, '0');
              const changedIndices = new Set();
              const maxLen = Math.max(prevCountStr.length, newCountStr.length);
              for (let i = 0; i < maxLen; i++) {
                const prevDigit = prevCountStr.length > i ? prevCountStr[prevCountStr.length - 1 - i] : '0';
                const newDigit = newCountStr.length > i ? newCountStr[newCountStr.length - 1 - i] : '0';
                if (prevDigit !== newDigit) {
                  changedIndices.add(newCountStr.length - 1 - i);
                }
              }

              setAnimatingIndices(changedIndices);
              setShufflingIndices(new Set());

              setTimeout(() => {
                setAnimatingIndices(new Set());
              }, 300);

              setUserCount(newCount);
            }
          } catch (err) {
            console.error('Error incrementing count:', err);
            setShufflingIndices(new Set());
          }
        }, 1000);

        return () => clearTimeout(incrementTimeout);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive, userCount]);


  const formatUserCount = (count) => {
    const padded = count.toString().padStart(7, '0');
    return `${padded.slice(0, 1)},${padded.slice(1, 4)},${padded.slice(4)}`;
  };

  const renderFlipCounter = () => {
    const countStr = formatUserCount(userCount);
    const elements = [];
    let digitIndex = 0;

    for (let i = 0; i < countStr.length; i++) {
      const char = countStr[i];
      if (char === ',') {
        elements.push(
          <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-16 sm:h-20 md:h-24 lg:h-28 mobile-comma">,</span>
        );
      } else {
        const isAnimating = animatingIndices.has(digitIndex);
        const isShuffling = shufflingIndices.has(digitIndex);
        elements.push(
          <FlipCard
            key={`digit-${digitIndex}`}
            digit={char}
            isAnimating={isAnimating}
            isShuffling={isShuffling}
          />
        );
        digitIndex++;
      }
    }
    return elements;
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    // <div className="h-screen bg-white relative overflow-hidden font-nunito">
    <div className="h-screen relative overflow-y-auto md:overflow-hidden font-nunito" style={{ backgroundColor: '#F9F9F9' }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

        @media (min-width: 768px) {
          body {
            overflow: hidden;
          }
        }

        @keyframes flip {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(-90deg); }
          100% { transform: rotateX(0deg); }
        }
        .animate-flip {
          animation: flip 0.3s ease-in-out;
          transform-style: preserve-3d;
        }
        .drawer {
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }
        .drawer.open {
          transform: translateX(0);
        }
        .profile-image {
          border-radius: 50% 0 0 50%;
        }
        .font-nunito {
          font-family: 'Nunito', sans-serif !important;
        }

        /* Mobile-only styles */
        @media (max-width: 767px) {
          .mobile-text-container {
            padding: 12px 16px !important;
          }
          .mobile-text-size {
            font-size: 1.25rem !important;
          }
          .mobile-counter-container {
            padding: 8px !important;
            padding-bottom: 24px !important;
          }
          .mobile-counter-spacing {
            gap: 2px !important;
          }
          .mobile-users-text {
            font-size: 0.75rem !important;
            bottom: 4px !important;
            right: 8px !important;
          }
          .mobile-tagline {
            font-size: 0.6rem !important;
            letter-spacing: 0.03em !important;
            line-height: 1.5 !important;
          }
          .mobile-flip-card {
            height: 72px !important;
          }
          .mobile-flip-card span {
            font-size: 3rem !important;
          }
          .mobile-comma {
            font-size: 3rem !important;
            height: 72px !important;
          }
          form input,
          form select,
          form textarea {
            font-size: 0.65rem !important;
          }
          form input::placeholder,
          form select::placeholder,
          form textarea::placeholder {
            font-size: 0.65rem !important;
          }
        }
        .react-international-phone-country-selector-dropdown {
          z-index: 60;
        }
        .link-button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: #4B5563;
          cursor: pointer;
          text-decoration: none;
        }
        .link-button:hover {
          color: #9333EA;
        }
      `}</style>

      {/* <PhoneNumberDialog
        isOpen={showPhoneDialog}
        onClose={() => setShowPhoneDialog(false)}
        onSubmit={handlePhoneSubmit}
      /> */}

      <div
        className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
        style={{ width: 'min(320px, 85vw)' }}
      >
        <div className="p-4">
          <button
            onClick={toggleDrawer}
            className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
          >
            ✕
          </button>
          <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
          <div className="space-y-3">
            {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
              leaderboardData.map((user, index) => (
                <div
                  key={index}
                  ref={index === 0 ? containerRef : null}
                  className="flex items-center bg-white pl-0 pr-2 shadow-sm"
                  style={{
                    borderRadius: '8px',
                    minHeight: '56px'
                  }}
                >
                  <div className="flex-1 ml-2 flex items-center">
                    <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
                  </div>
                  <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
                    {user.score}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#4A4A4A] text-center font-nunito">No leaderboard data available</p>
            )}
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={toggleDrawer}
        />
      )}


      <div className="relative z-10 w-full overflow-y-auto md:overflow-y-visible md:h-auto" style={{ backgroundColor: '#F9F9F9' }}>
        {/* Logo and Tagline Section - Below Nav Bar */}
        <div className="w-full relative z-10 py-4 md:py-0" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <div className="w-full flex items-center" style={{ gap: '12px' }}>
            <h1 className="text-purple-500 font-bold font-nunito whitespace-nowrap" style={{ fontSize: 'clamp(3rem, 9vw, 11rem)', letterSpacing: '0.05em' }}>
              <i>SESH</i>
            </h1>
            <img
              src="SESH_Isotype 1.svg"
              alt="SESH Icon"
              className="h-20 sm:h-28 md:h-36 lg:h-48"
            />
            <p className="text-gray-600 italic font-nunito uppercase whitespace-normal mobile-tagline" style={{ fontSize: 'clamp(0.65rem, 4vw, 7rem)', letterSpacing: '0.08em', lineHeight: '1.2' }}>
              the world is your oyster,<br />go find your pearls
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full" style={{ paddingLeft: '30px', paddingRight: '30px' }}>


          {/* HOME SECTION */}
          {activeSection === 'home' && (
            <>
              {/* Text and Counter Row */}
              <div className="w-full mb-4 sm:mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Text Container */}
                {/* <div className="rounded-xl p-6 sm:p-8 flex items-center justify-center mobile-text-container" style={{ backgroundColor: '#EFEFEF' }}>
                  <p className="text-[#4A4A4A] text-lg sm:text-xl md:text-2xl lg:text-3xl font-nunito mobile-text-size">
                    We are going to launch the next phase of the app once we hit <span className="font-bold">1 million users</span>. Help us get there by inviting your friends, family, and neighbors to download the app!
                  </p>
                </div> */}

                {/* Counter Container */}
                <div className="rounded-xl flex flex-col justify-center relative mobile-counter-container md:col-span-2" style={{ padding: '10px', paddingBottom: '28px', backgroundColor: '#EFEFEF' }}>
                  <div className="flex justify-center items-center space-x-2 sm:space-x-3 w-full mobile-counter-spacing">
                    {renderFlipCounter()}
                  </div>
                  <div className="absolute bottom-1 right-4 mobile-users-text">
                    <span className="text-[#4A4A4A] text-sm sm:text-base font-nunito font-bold">USERS</span>
                  </div>
                </div>
              </div>

              {/* How to Sesh Cards and Form Layout */}
              <div className="w-full">
                {/* App Store Banners - MOBILE ONLY (shows first on mobile) */}
                <div className="flex md:hidden flex-row items-stretch gap-2 mb-4 w-full">
                  <a
                    href="https://apps.apple.com/us/app/the-sesh-app/id1671947382"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <img
                      src="/google-play-badge.png"
                      alt="Get it on Google Play"
                      className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>

                {/* Cards and Form Grid */}
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
                  {/* How to Sesh Cards */}
                  <div className="md:col-span-1 h-full order-1 flex flex-col mb-4 md:mb-0">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 flex-1">
                      {/* SWIPE Card */}
                      <div className="flex flex-col items-center h-full">
                        <div className="rounded-xl p-2 sm:p-3 md:p-8 lg:p-10 flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
                          <h3 className="text-[#4A4A4A] text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-4 text-center font-nunito"><em>SWIPE</em></h3>
                          <div className="mb-1 sm:mb-2 md:mb-4 flex justify-center">
                            <img src="/left and right swipe.svg" alt="Swipe Left and Right" className="w-16 h-8 sm:w-28 sm:h-14 md:w-48 md:h-28 lg:w-56 lg:h-32 object-contain" />
                          </div>
                          <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-[0.5rem] sm:text-base md:text-lg lg:text-xl uppercase">SWIPE LEFT FOR NO AND RIGHT FOR YES</p>
                        </div>
                      </div>

                      {/* INVITE Card */}
                      <div className="flex flex-col items-center h-full">
                        <div className="rounded-xl p-2 sm:p-3 md:p-8 lg:p-10 flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
                          <h3 className="text-[#4A4A4A] text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-4 text-center font-nunito"><em>INVITE</em></h3>
                          <div className="mb-1 sm:mb-2 md:mb-4">
                            <img src="/Onboarding_Invite 1.svg" alt="Invite" className="w-8 h-8 sm:w-14 sm:h-14 md:w-28 md:h-28 lg:w-32 lg:h-32" />
                          </div>
                          <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-[0.5rem] sm:text-base md:text-lg lg:text-xl uppercase">INVITE YOUR MATCH TO A SESH</p>
                        </div>
                      </div>

                      {/* PLAN Card */}
                      <div className="flex flex-col items-center h-full">
                        <div className="rounded-xl p-2 sm:p-3 md:p-8 lg:p-10 flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
                          <h3 className="text-[#4A4A4A] text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-4 text-center font-nunito"><em>PLAN</em></h3>
                          <div className="mb-1 sm:mb-2 md:mb-4">
                            <img src="/Onboarding_Chat 1.svg" alt="Chat" className="w-8 h-8 sm:w-14 sm:h-14 md:w-28 md:h-28 lg:w-32 lg:h-32" />
                          </div>
                          <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-[0.5rem] sm:text-base md:text-lg lg:text-xl uppercase whitespace-nowrap">PLAN THROUGH A CHAT<br />AND HAVE YOUR SESH</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form with App Store Banners */}
                  <div className="md:col-span-1 flex flex-col h-full order-2">
                    {/* App Store Banners - DESKTOP ONLY */}
                    <div className="hidden md:flex flex-row items-stretch gap-2 mb-4 w-full">
                      <a
                        href="https://apps.apple.com/us/app/the-sesh-app/id1671947382"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <img
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="Download on the App Store"
                          className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <img
                          src="/google-play-badge.png"
                          alt="Get it on Google Play"
                          className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </a>
                    </div>
                    {/* Contact Form */}
                    <div className="rounded-xl p-2 sm:p-2 md:p-3 w-full flex-1" style={{ backgroundColor: '#EFEFEF' }}>
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ABOUT US SECTION */}
          {activeSection === 'aboutUs' && (
            <>
              <h2 className="text-[#4A4A4A] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-nunito text-center"><i>ABOUT US</i></h2>
              <div className="w-full mb-6 h-[400px] sm:h-[420px] md:h-[450px]">
                <div className="bg-gray-100 rounded-xl p-8 sm:p-10 md:p-12 h-full flex flex-col justify-center">
                  <p className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-nunito mb-4 sm:mb-6">
                    <span className="font-bold italic text-[#A659FF]">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold italic text-[#A659FF]">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
                  </p>
                  <p className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-nunito text-center">
                    <span className="font-bold italic text-[#A659FF]">SESH</span> was created by two people.
                  </p>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <a
                    href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/google-play-badge.png"
                      alt="Get it on Google Play"
                      className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </>
          )}

          {/* HOW TO SESH SECTION */}
          {activeSection === 'howToSesh' && (
            <>
              <h2 className="text-[#4A4A4A] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-nunito text-center"><i>HOW TO SESH?</i></h2>
              <div className="w-full mb-6 h-[400px] sm:h-[420px] md:h-[450px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 h-full">
                  {/* SWIPE Card */}
                  <div className="flex flex-col items-center h-full">
                    <h3 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-2xl font-bold mb-2 text-center font-nunito"><em>SWIPE</em></h3>
                    <div className="bg-gray-100 rounded-xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center flex-1 w-full">
                      <div className="flex gap-3 mb-4 sm:mb-6">
                        <img src="/Onboarding_Swipe_Left.svg" alt="Swipe Left" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                        <img src="/Onboarding_Swipe_Right.svg" alt="Swipe Right" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                      </div>
                      <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-lg sm:text-xl md:text-2xl">SWIPE LEFT FOR NO AND RIGHT FOR YES</p>
                    </div>
                  </div>

                  {/* INVITE Card */}
                  <div className="flex flex-col items-center h-full">
                    <h3 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-2xl font-bold mb-2 text-center font-nunito"><em>INVITE</em></h3>
                    <div className="bg-gray-100 rounded-xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center flex-1 w-full">
                      <div className="mb-4 sm:mb-6">
                        <img src="/Onboarding_Invite 1.svg" alt="Invite" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                      </div>
                      <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-lg sm:text-xl md:text-2xl">INVITE YOUR MATCH TO A SESH</p>
                    </div>
                  </div>

                  {/* PLAN Card */}
                  <div className="flex flex-col items-center h-full">
                    <h3 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-2xl font-bold mb-2 text-center font-nunito"><em>PLAN</em></h3>
                    <div className="bg-gray-100 rounded-xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center flex-1 w-full">
                      <div className="mb-4 sm:mb-6">
                        <img src="/Onboarding_Chat 1.svg" alt="Chat" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                      </div>
                      <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-lg sm:text-xl md:text-xl">PLAN THROUGH A CHAT AND<br />HAVE YOUR SESH</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <a
                    href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/google-play-badge.png"
                      alt="Get it on Google Play"
                      className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </>
          )}

          {/* CONTACT SECTION */}
          {activeSection === 'contact' && (
            <>
              <h2 className="text-[#4A4A4A] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-nunito text-center"><i>CONTACT US</i></h2>
              <div className="w-full mb-6 h-[400px] sm:h-[420px] md:h-[450px] overflow-y-auto">
                <div className="bg-gray-100 rounded-xl p-8 sm:p-10 md:p-12 h-full">
                  <ContactForm />
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <a
                    href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/google-play-badge.png"
                      alt="Get it on Google Play"
                      className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);

export default Root;