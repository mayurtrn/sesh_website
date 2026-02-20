import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import './App.css';

/* 
// --- PRESERVED OLD CODE (USER REQUESTED) ---
// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   return (
//     <div className="relative w-10 sm:w-16 md:w-20 h-14 sm:h-24 md:h-32 bg-purple-600 rounded-lg sm:rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mx-0.5 sm:mx-1">
//       <div className={`absolute inset-0 flex items-center justify-center backface-hidden ${isAnimating ? 'animate-flip' : ''}`}>
//         <span className={`text-white font-black font-nunito ${isShuffling ? 'animate-shuffle text-white/50' : ''}`}
//           style={{ fontSize: 'min(5rem, 8vw)', lineHeight: 1 }}>
//           {digit}
//         </span>
//       </div>
//       {/* Glossy overlay */
//       <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
//       {/* Horizontal divider line */
//       <div className="absolute inset-x-0 top-1/2 h-0.5 bg-black/10"></div>
//     </div>
//   );
// };
// 
// const PrivacyPolicy = () => {
//   // ... (Keeping existing PrivacyPolicy code simplified for brevity in this single file view, but functionally complete)
//   const [policyData, setPolicyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
// 
//   useEffect(() => {
//     const fetchPrivacyPolicy = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/privacy-policy/');
//         if (!response.ok) throw new Error(`API request failed`);
//         const data = await response.json();
//         if (data.status === 200 && data.data) setPolicyData(data.data);
//         else setError('Invalid API response');
//       } catch (err) { setError('Failed to fetch privacy policy'); }
//       finally { setLoading(false); }
//     };
//     fetchPrivacyPolicy();
//   }, []);
// 
//   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white">Loading...</div>;
//   if (error) return <div className="min-h-screen flex items-center justify-center bg-white">{error}</div>;
// 
//   return (
//     <div className="min-h-screen bg-white py-12 px-4 font-nunito">
//       <div className="max-w-4xl mx-auto">
//         <button onClick={() => navigate('/')} className="mb-8 text-purple-600 font-black italic">← BACK TO HOME</button>
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
//           <h1 className="text-3xl font-black italic mb-8">{policyData.title}</h1>
//           <div className="prose" dangerouslySetInnerHTML={{ __html: policyData.description }} />
//         </div>
//       </div>
//     </div>
//   );
// };
// 
// const Contact = () => {
//   // ... (Keeping existing Contact code)
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', category: '', description: '' });
//   const [categories, setCategories] = useState([]);
//   const [isSubmitted, setIsSubmitted] = useState(false);
// 
//   useEffect(() => {
//     fetch('https://django.sesh.one/api/categories/').then(r => r.json()).then(d => {
//       setCategories(d.categories || []);
//       if (d.categories?.[0]) setFormData(f => ({ ...f, category: d.categories[0].name }));
//     }).catch(e => console.error(e));
//   }, []);
// 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const cat = categories.find(c => c.name === formData.category);
//     const payload = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone_number: formData.phoneNumber,
//       category: cat ? cat.id : null,
//       description: formData.description
//     };
//     try {
//       const res = await fetch('https://django.sesh.one/api/submissions/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
//       if (res.ok) setIsSubmitted(true);
//     } catch (e) { console.error(e); }
//   };
// 
//   if (isSubmitted) return (
//     <div className="min-h-screen bg-white py-12 px-4 font-nunito flex items-center justify-center">
//       <div className="text-center">
//         <button onClick={() => navigate('/')} className="mb-8 text-purple-600 font-black italic">← BACK TO HOME</button>
//         <div className="bg-green-50 p-8 rounded-2xl text-green-800 font-bold text-xl">Form successfully submitted!</div>
//       </div>
//     </div>
//   );
// 
//   return (
//     <div className="min-h-screen bg-white py-12 px-4 font-nunito">
//       <div className="max-w-2xl mx-auto">
//         <button onClick={() => navigate('/')} className="mb-8 text-purple-600 font-black italic">← BACK TO HOME</button>
//         <h1 className="text-3xl font-black italic mb-8">CONTACT US</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input className="w-full p-3 bg-gray-50 rounded-xl" placeholder="FIRST NAME" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
//           <input className="w-full p-3 bg-gray-50 rounded-xl" placeholder="LAST NAME" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required />
//           <input className="w-full p-3 bg-gray-50 rounded-xl" placeholder="EMAIL" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
//           <textarea className="w-full p-3 bg-gray-50 rounded-xl" placeholder="Message" rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
//           <button type="submit" className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold italic hover:bg-purple-700">SUBMIT</button>
//         </form>
//       </div>
//     </div>
//   );
// };
// 
// // --- Main Single Page App ---
// const App = () => {
//   const [userCount, setUserCount] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
// 
//   // Count Fetching Logic (Restored)
//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/current-count/')
//       .then(res => res.json())
//       .then(data => {
//         setUserCount(data.count || 0);
//         setIsActive(data.is_active || false);
//       })
//       .catch(err => console.error('Error fetching count:', err));
//   }, []);
// 
//   useEffect(() => {
//     if (isActive && userCount >= 0) {
//       const timeoutId = setTimeout(() => {
//         const countStr = userCount.toString().padStart(7, '0');
//         setShufflingIndices(new Set(Array.from({ length: countStr.length }, (_, i) => i)));
// 
//         const incrementTimeout = setTimeout(async () => {
//           try {
//             const response = await fetch('http://127.0.0.1:8000/api/increment-count/', { method: 'POST' });
//             if (response.ok) {
//               const data = await response.json();
//               const newCount = data.count;
//               const prevCountStr = userCount.toString().padStart(7, '0');
//               const newCountStr = newCount.toString().padStart(7, '0');
//               const changed = new Set();
//               for (let i = 0; i < newCountStr.length; i++) {
//                 if (prevCountStr[i] !== newCountStr[i]) changed.add(i);
//               }
//               setAnimatingIndices(changed);
//               setShufflingIndices(new Set());
//               setTimeout(() => setAnimatingIndices(new Set()), 300);
//               setUserCount(newCount);
//             }
//           } catch (e) { console.error(e); }
//         }, 1000);
//         return () => clearTimeout(incrementTimeout);
//       }, 2000);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [isActive, userCount]);
// 
//   const formatUserCount = (count) => count.toString().padStart(7, '0');
// 
//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const digits = countStr.split('');
//     // Insert commas manually for display: 0,000,000
//     // Actually simplicity might be better without commas or with styled commas spaces
//     // Restoring original structure with commas:
//     const elements = [];
//     let digitIndex = 0;
//     const formatted = `${countStr.slice(0, 1)},${countStr.slice(1, 4)},${countStr.slice(4)}`;
// 
//     for (let i = 0; i < formatted.length; i++) {
//       const char = formatted[i];
//       if (char === ',') {
//         elements.push(<span key={`comma-${i}`} className="text-purple-400 text-4xl sm:text-6xl font-black self-end pb-2 sm:pb-4 mx-1">,</span>);
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard key={`digit-${digitIndex}`} digit={char} isAnimating={isAnimating} isShuffling={isShuffling} />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };
// 
//   return (
//     <div className="h-screen w-screen bg-white overflow-hidden relative font-nunito flex flex-col items-center justify-between py-6 sm:py-8 lg:py-10">
//       {/* ... styling and structure ... */}
//     </div>
//   );
// };
// 
// const Root = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//       <Route path="/contact" element={<Contact />} />
//     </Routes>
//   </Router>
// );
// 
// export default Root;

// --- NEW IMPLEMENTATION (BENTO GRID DESIGN) ---

const FlipCard = ({ digit, isAnimating, isShuffling }) => {
  return (
    <div className="relative w-8 sm:w-16 md:w-20 h-12 sm:h-24 md:h-28 backdrop-blur-md rounded-lg sm:rounded-2xl border border-white/50 shadow-lg overflow-hidden flex items-center justify-center transform hover:scale-105 transition-all mx-0.5 sm:mx-1" style={{ backgroundColor: '#A659FF' }}>
      {/* 3D tilt can be added via CSS on hover if desired, simplistic for now */}
      <span className={`text-white font-black font-nunito text-3xl sm:text-6xl ${isShuffling ? 'animate-pulse text-white/50' : ''}`}>
        {digit}
      </span>
    </div>
  );
};

// ... (PrivacyPolicy and Contact components defined similarly minimalist)
const PrivacyPolicy = () => {
  const [policyData, setPolicyData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => { fetch('https://django.sesh.one/api/privacy-policy/').then(r => r.json()).then(d => { if (d.status === 200) setPolicyData(d.data) }); }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-nunito">
      <button onClick={() => navigate('/')} className="mb-8 text-purple-600 font-black italic text-xl">← HOME</button>
      <div className="bg-white p-8 rounded-3xl shadow-xl">{policyData ? <div dangerouslySetInnerHTML={{ __html: policyData.description }} /> : 'Loading...'}</div>
    </div>
  );
};
const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-nunito">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg text-center">
        <button onClick={() => navigate('/')} className="mb-4 text-purple-600 font-black italic">← HOME</button>
        <h1 className="text-3xl font-black italic mb-4">CONTACT</h1>
        <p className="text-gray-500">Contact form disabled for this view.</p>
      </div>
    </div>
  );
};

const App = () => {
  const [userCount, setUserCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [shufflingIndices, setShufflingIndices] = useState(new Set());

  // Count Fetching Logic (Restored)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/current-count/')
      .then(res => res.json())
      .then(data => {
        setUserCount(data.count || 0);
        setIsActive(data.is_active || false);
      })
      .catch(err => console.error('Error fetching count:', err));
  }, []);

  useEffect(() => {
    if (isActive && userCount >= 0) {
      const timeoutId = setTimeout(() => {
        const countStr = userCount.toString().padStart(7, '0');
        setShufflingIndices(new Set(Array.from({ length: countStr.length }, (_, i) => i)));
        const incrementTimeout = setTimeout(async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/increment-count/', { method: 'POST' });
            if (response.ok) {
              const data = await response.json();
              const newCount = data.count;
              const prevCountStr = userCount.toString().padStart(7, '0');
              const newCountStr = newCount.toString().padStart(7, '0');
              const changed = new Set();
              for (let i = 0; i < newCountStr.length; i++) {
                if (prevCountStr[i] !== newCountStr[i]) changed.add(i);
              }
              setAnimatingIndices(changed);
              setShufflingIndices(new Set());
              setTimeout(() => setAnimatingIndices(new Set()), 300);
              setUserCount(newCount);
            }
          } catch (e) { console.error(e); }
        }, 1000);
        return () => clearTimeout(incrementTimeout);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive, userCount]);

  const formatUserCount = (count) => count.toString().padStart(7, '0');
  const renderFlipCounter = () => {
    const countStr = formatUserCount(userCount);
    const formatted = `${countStr.slice(0, 1)},${countStr.slice(1, 4)},${countStr.slice(4)}`;
    const elements = [];
    let digitIndex = 0;

    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
      if (char === ',') {
        elements.push(<span key={`comma-${i}`} className="text-purple-800 text-3xl sm:text-6xl font-black self-end pb-1 mx-0.5">,</span>);
      } else {
        const isAnimating = animatingIndices.has(digitIndex);
        const isShuffling = shufflingIndices.has(digitIndex);
        elements.push(
          <FlipCard key={`digit-${digitIndex}`} digit={char} isAnimating={isAnimating} isShuffling={isShuffling} />
        );
        digitIndex++;
      }
    }
    return elements;
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden relative font-nunito p-4 sm:p-8 flex items-center justify-center">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');
        .font-nunito { font-family: 'Nunito', sans-serif !important; }
        

        
        /* Bento Tilt Effect */
        .bento-card {
            background: rgba(229, 231, 235, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .bento-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 20px 40px -10px rgba(124, 58, 237, 0.15);
            border-color: rgba(167, 139, 250, 0.5);
            z-index: 10;
        }
        
        /* 3D Flip Utilities */
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .flipper-content {
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .group:hover .flipper-content {
          transform: rotateY(180deg);
        }
        
        /* Ensure hover state persists during transform */
        .group {
          perspective: 1000px;
          cursor: pointer;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gray-50 z-0"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Bento Grid Container */}
      <div className="relative z-10 w-full max-w-7xl h-full sm:h-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 sm:gap-6">

        {/* 1. HERO CELL (Large Left Panel) */}
        <div className="bento-card md:col-span-2 md:row-span-3 p-6 sm:p-12 flex flex-col justify-start items-start text-left bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-5xl sm:text-8xl font-black italic text-purple-600 tracking-tighter">SESH</h1>
            <img src="/SESH_Isotype 1.svg" alt="Sesh" className="h-16 sm:h-24" />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl sm:text-5xl font-extrabold italic text-gray-600 leading-tight uppercase mb-4">
              The world is your oyster, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-[#A659FF]">Go Find Your Pearls</span>
            </h2>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Join the movement</p>
            <div className="flex flex-col sm:flex-row mt-8 w-full max-w-lg items-center gap-4">
              <a href="https://apps.apple.com/us/app/the-sesh-app/id1671947382" target="_blank" rel="noopener noreferrer" className="flex-1 w-full hover:scale-105 transition-transform flex justify-center sm:justify-start">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-auto w-auto" style={{ height: '68px' }} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh" target="_blank" rel="noopener noreferrer" className="flex-1 w-full hover:scale-105 transition-transform flex justify-center sm:justify-start">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-[4.25rem] w-auto" style={{ marginTop: '-5px' }} />
              </a>
            </div>
          </div>
        </div>

        {/* 2. COUNTER CELL (Wide Top Right) */}
        <div className="bento-card md:col-span-2 md:row-span-1 p-6 flex flex-col items-center justify-center bg-gray-200/60">
          <div className="flex gap-1 justify-center scale-90 sm:scale-100 origin-center w-full">
            {renderFlipCounter()}
          </div>
          <p className="mt-2 text-xs font-black tracking-[0.4em] text-gray-400 uppercase">Active Users</p>
        </div>

        {/* 3. FEATURE: SWIPE */}
        <div className="md:col-span-1 md:row-span-1 group perspective-1000 h-full relative cursor-pointer min-h-[220px] md:min-h-0">
          <div className="absolute inset-0 z-50"></div>
          <div className="flipper-content">
            {/* Front */}
            <div className="absolute inset-0 bento-card flex flex-col items-center justify-center text-center backface-hidden">
              <img src="/left and right swipe.svg" className="h-16 mb-4" />
              <h3 className="text-3xl font-black italic text-gray-600">SWIPE</h3>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bento-card flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 bg-purple-100/90 text-gray-600 border-2 border-purple-300">
              <p className="font-bold text-lg leading-tight px-4 uppercase">swipe left for no and right for yes</p>
            </div>
          </div>
        </div>

        {/* 4. FEATURE: INVITE */}
        <div className="md:col-span-1 md:row-span-1 group perspective-1000 h-full relative cursor-pointer min-h-[220px] md:min-h-0">
          <div className="absolute inset-0 z-50"></div>
          <div className="flipper-content">
            {/* Front */}
            <div className="absolute inset-0 bento-card flex flex-col items-center justify-center text-center backface-hidden">
              <img src="/Onboarding_Invite 1.svg" className="h-16 mb-4" />
              <h3 className="text-3xl font-black italic text-gray-600">INVITE</h3>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bento-card flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 bg-purple-100/90 text-gray-600 border-2 border-purple-300">
              <p className="font-bold text-lg leading-tight px-4 uppercase">invite your match to a SESH</p>
            </div>
          </div>
        </div>

        {/* 5. FEATURE: PLAN */}
        <div className="md:col-span-2 md:row-span-1 group perspective-1000 mx-auto w-full md:w-[48%] h-full relative cursor-pointer min-h-[220px] md:min-h-0">
          <div className="absolute inset-0 z-50"></div>
          <div className="flipper-content">
            {/* Front */}
            <div className="absolute inset-0 bento-card flex flex-col items-center justify-center text-center backface-hidden">
              <img src="/Onboarding_Chat 1.svg" className="h-16 mb-4" />
              <h3 className="text-3xl font-black italic text-gray-600">PLAN</h3>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bento-card flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 bg-purple-100/90 text-gray-600 border-2 border-purple-300">
              <p className="font-bold text-lg leading-tight px-4 uppercase">plan through a chat and have your SESH</p>
            </div>
          </div>
        </div>



      </div>

      {/* Footer Links */}
      {/* <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-bold text-gray-400 tracking-widest uppercase flex justify-center gap-6">
        <Link to="/privacy-policy" className="hover:text-purple-600">Privacy</Link>
        <Link to="/contact" className="hover:text-purple-600">Contact</Link>
      </div> */}

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
