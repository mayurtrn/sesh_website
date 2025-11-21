// import React, { useState, useEffect, useRef } from 'react';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     if (value.length <= 10) {
//       setPhoneNumber(value);
//       setIsSwipeReady(value.length >= 10);
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
//         >
//           ×
//         </button>
        
//         {/* <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 leading-tight">
//             enter your phone number<br />
//             to get <em>exclusive</em> in app<br />
//             rewards
            
//           </h2>
//         </div> */}
//         <div className="text-center mb-6 sm:mb-8">
//   <h2 className="text-xl sm:text-2xl font-bold  mb-4 leading-tight text-[#4A4A4A]">
//     <em>ENTER YOUR PHONE NUMBER<br />
//     TO GET EXCLUSIVE IN APP<br />
//     REWARDS</em>
//   </h2>
// </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic">
//             ENTER PHONE NUMBER
//           </label>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full px-4 py-3 bg-gray-200 rounded-lg text-black focus:outline-none"
//             maxLength="10"
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 ">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 {/* <span className="mr-2 sm:mr-3 text-lg sm:text-xl">→</span> */}
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center">
              
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT", 
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   const leaderboardData = [
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=1" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=2" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=3" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=4" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=5" },
//   ];

//   const handlePhoneSubmit = (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     setShowPhoneDialog(false);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden">
//       <style jsx>{`
//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//       `}</style>

//       {/* Phone Number Dialog */}
//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

      
//       {/* Side Drawer */}
//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {leaderboardData.map((user, index) => (
//               <div 
//                 key={index}
//                 ref={index === 0 ? containerRef : null}
//                 className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                 style={{
//                   borderRadius: '8px',
//                   minHeight: '56px'
//                 }}
//               >
//                 <img 
//                   src={user.image}
//                   alt={`${user.name}'s profile`}
//                   className="w-14 h-14 profile-image object-cover"
//                   style={{ borderRadius: '8px 0 0 8px' }}
//                 />
//                 <div className="flex-1 ml-2 flex items-center">
//                   <p className="text-[#4A4A4A] text-xl font-bold italic">{user.name}</p>
//                 </div>
//                 <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto" style={{ borderRadius: '10px', height: '30px' }}>
//                   {user.score}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for drawer */}
//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       {/* Left Side Decorative Image */}
//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '0',
//           bottom: '120px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-inter flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium italic">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         {/* Join the Race Section */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           {/* <div className="bg-gray-200 rounded-xl p-4 sm:p-6"> */}
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">

//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <svg 
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
//                     fill="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
//                   </svg>
//                 </button>
//                 {/* Tooltip */}
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-lg">
//                 we are going to launch the next phase of the app once we hit 1 million users. help us get there by inviting your friends, family, and neighbors to download the app through your referral code.you get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Phone Mockup & Features */}
//         <div className="block lg:hidden mb-6 sm:mb-8">
//           {/* App Store Buttons (Moved Above iPhone Frame) */}
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Carousel Navigation */}
//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           {/* Mobile Feature Steps */}
//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* App Store Buttons (Desktop Only) */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>
  
//           {/* About Us Section */}
//           <div className="w-full mb-6 lg:max-w-3xl">
//             {/* <div className="bg-gray-200 rounded-xl p-4"> */}
//             <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">

//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3"><i>ABOUT US</i></h2>
//               <div className="bg-purple-500 rounded-lg p-3">
//                 <p className="text-white text-sm sm:text-base">
//                   <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//                 </p>
//               </div>
//             </div>
//           </div>
  
//           {/* Mobile Footer */}
//           <div className="block lg:hidden mt-8 pt-8 pb-6">
//             <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs">
//               <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//               <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//               <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//               <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//               <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//               <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//               <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//             </div>
//           </div>
//         </div>
  
//         {/* Desktop Elements */}
//         {/* Gradient Background for iPhone */}
//         <div 
//           className="absolute hidden lg:block z-0"
//           style={{
//             top: 'calc(50% - 350px)',
//             right: 'calc((100vw - 1536px) / 2 - 80px)',
//             width: '500px',
//             height: '600px',
//             background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//             borderRadius: '50%',
//             filter: 'blur(40px)'
//           }}
//         />
  
//         {/* Desktop iPhone Mockup */}
//         <div 
//           ref={phoneRef}
//           className="absolute transform -translate-y-1/2 hidden lg:block cursor-pointer z-10"
//           style={{
//             transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateY(-50%) translateZ(0)`,
//             transition: 'transform 0.2s ease-out',
//             right: 'calc((100vw - 1536px) / 2 + 58px)',
//             top: 'calc(50% - 60px)',
//             width: '280px',
//             height: '500px',
//             transformStyle: 'preserve-3d'
//           }}
//         >
//           <div className="relative">
//             <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[2rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.8rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//             <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//             <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//           </div>
//         </div>
  
//         {/* Desktop Carousel Navigation */}
//         <div 
//           className="absolute hidden lg:block z-10"
//           style={{ 
//             right: 'calc((100vw - 1536px) / 2 + 58px)',
//             top: 'calc(50% + 200px)',
//             width: '280px'
//           }}
//         >
//           <div className="flex justify-center items-center">
//             {/* <div className="bg-gray-200 px-4 py-4 flex items-center space-x-3 rounded-[5px]"> */}
//             <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">

//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </div>
  
//         {/* Desktop Feature Steps Section */}
//         <div 
//           className="absolute hidden lg:block z-10" 
//           style={{ 
//             top: 'calc(50% + 290px)',
//             right: 'calc((100vw - 1536px) / 2 + 58px)',
//             width: '280px'
//           }}
//         >
//           {/* <div className="bg-gray-200 rounded-xl p-4"> */}
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">

//             <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3"><i>{featureSteps[currentImageIndex].title}</i></h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>
  
//         {/* Desktop Footer */}
//         <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//           <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm">
//             <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default App;










// import React, { useState, useEffect, useRef } from 'react';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     if (value.length <= 10) {
//       setPhoneNumber(value);
//       setIsSwipeReady(value.length >= 10);
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//   <h2 className="text-xl sm:text-2xl font-bold  mb-4 leading-tight text-[#4A4A4A]">
//     <em>ENTER YOUR PHONE NUMBER<br />
//     TO GET EXCLUSIVE IN APP<br />
//     REWARDS</em>
//   </h2>
// </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic">
//             ENTER PHONE NUMBER
//           </label>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full px-4 py-3 bg-gray-200 rounded-lg text-black focus:outline-none"
//             maxLength="10"
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 ">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center">
              
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT", 
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   const leaderboardData = [
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=1" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=2" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=3" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=4" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=5" },
//   ];

//   const handlePhoneSubmit = (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     setShowPhoneDialog(false);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden">
//       <style jsx>{`
//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//       `}</style>

//       {/* Phone Number Dialog */}
//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

      
//       {/* Side Drawer */}
//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {leaderboardData.map((user, index) => (
//               <div 
//                 key={index}
//                 ref={index === 0 ? containerRef : null}
//                 className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                 style={{
//                   borderRadius: '8px',
//                   minHeight: '56px'
//                 }}
//               >
//                 <img 
//                   src={user.image}
//                   alt={`${user.name}'s profile`}
//                   className="w-14 h-14 profile-image object-cover"
//                   style={{ borderRadius: '8px 0 0 8px' }}
//                 />
//                 <div className="flex-1 ml-2 flex items-center">
//                   <p className="text-[#4A4A4A] text-xl font-bold italic">{user.name}</p>
//                 </div>
//                 <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto" style={{ borderRadius: '10px', height: '30px' }}>
//                   {user.score}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for drawer */}
//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       {/* Left Side Decorative Image */}
//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '0',
//           bottom: '120px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-inter flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           {/* <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium italic">
//             the world is your oyster, go find your pearls
//           </p> */}
//           <p className="text-gray-600 text-lg sm:text-xl lg:text-4xl font-medium italic">
//   the world is your oyster, go find your pearls
// </p>
//         </div>

//         {/* Join the Race Section */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <svg 
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
//                     fill="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
//                   </svg>
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-lg">
//                 we are going to launch the next phase of the app once we hit 1 million users. help us get there by inviting your friends, family, and neighbors to download the app through your referral code.you get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Phone Mockup & Features */}
//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* App Store Buttons (Desktop Only) */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         {/* About Us Section */}
//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Footer */}
//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs">
//             <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Elements */}
//       {/* Gradient Background for iPhone */}
//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       {/* Desktop iPhone Mockup */}
//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Desktop Carousel Navigation */}
//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Feature Steps Section */}
//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-sm">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Footer */}
//       <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm">
//           <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;












// import React, { useState, useEffect, useRef } from 'react';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     if (value.length <= 10) {
//       setPhoneNumber(value);
//       setIsSwipeReady(value.length >= 10);
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//   <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//     <em>ENTER YOUR PHONE NUMBER<br />
//     TO GET EXCLUSIVE IN APP<br />
//     REWARDS</em>
//   </h2>
// </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full px-4 py-3 bg-gray-200 rounded-lg text-black focus:outline-none font-nunito"
//             maxLength="10"
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 ">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
              
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT", 
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   const leaderboardData = [
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=1" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=2" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=3" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=4" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=5" },
//   ];

//   const handlePhoneSubmit = (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     setShowPhoneDialog(false);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//       `}</style>

//       {/* Phone Number Dialog */}
//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

      
//       {/* Side Drawer */}
//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {leaderboardData.map((user, index) => (
//               <div 
//                 key={index}
//                 ref={index === 0 ? containerRef : null}
//                 className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                 style={{
//                   borderRadius: '8px',
//                   minHeight: '56px'
//                 }}
//               >
//                 <img 
//                   src={user.image}
//                   alt={`${user.name}'s profile`}
//                   className="w-14 h-14 profile-image object-cover"
//                   style={{ borderRadius: '8px 0 0 8px' }}
//                 />
//                 <div className="flex-1 ml-2 flex items-center">
//                   <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                 </div>
//                 <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                   {user.score}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for drawer */}
//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       {/* Left Side Decorative Image */}
//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         {/* Join the Race Section */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <svg 
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
//                     fill="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
//                   </svg>
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code.You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Phone Mockup & Features */}
//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* App Store Buttons (Desktop Only) */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         {/* About Us Section */}
//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Footer */}
//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Elements */}
//       {/* Gradient Background for iPhone */}
//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       {/* Desktop iPhone Mockup */}
//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Desktop Carousel Navigation */}
//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Feature Steps Section */}
//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Footer */}
//       <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;






// import React, { useState, useEffect, useRef } from 'react';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     if (value.length <= 10) {
//       setPhoneNumber(value);
//       setIsSwipeReady(value.length >= 10);
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//   <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//     <em>ENTER YOUR PHONE NUMBER<br />
//     TO GET EXCLUSIVE IN APP<br />
//     REWARDS</em>
//   </h2>
// </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full px-4 py-3 bg-gray-200 rounded-lg text-black focus:outline-none font-nunito"
//             maxLength="10"
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 ">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
              
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT", 
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   const leaderboardData = [
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=1" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=2" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=3" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=4" },
//     { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=5" },
//   ];

//   const handlePhoneSubmit = async (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     try {
//       const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone_number: phoneNumber }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);
//       // Optionally, you can handle the response data here (e.g., store referral code, show a success message, etc.)
//       setShowPhoneDialog(false);
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       // Optionally, you can show an error message to the user here
//       setShowPhoneDialog(false); // Close dialog even on error, but you can modify this behavior as needed
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//       `}</style>

//       {/* Phone Number Dialog */}
//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

      
//       {/* Side Drawer */}
//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {leaderboardData.map((user, index) => (
//               <div 
//                 key={index}
//                 ref={index === 0 ? containerRef : null}
//                 className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                 style={{
//                   borderRadius: '8px',
//                   minHeight: '56px'
//                 }}
//               >
//                 <img 
//                   src={user.image}
//                   alt={`${user.name}'s profile`}
//                   className="w-14 h-14 profile-image object-cover"
//                   style={{ borderRadius: '8px 0 0 8px' }}
//                 />
//                 <div className="flex-1 ml-2 flex items-center">
//                   <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                 </div>
//                 <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                   {user.score}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for drawer */}
//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       {/* Left Side Decorative Image */}
//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vue - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         {/* Join the Race Section */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <svg 
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
//                     fill="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
//                   </svg>
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code.You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Phone Mockup & Features */}
//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* App Store Buttons (Desktop Only) */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         {/* About Us Section */}
//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Footer */}
//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Elements */}
//       {/* Gradient Background for iPhone */}
//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       {/* Desktop iPhone Mockup */}
//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Desktop Carousel Navigation */}
//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Feature Steps Section */}
//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Footer */}
//       <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;





// import React, { useState, useEffect, useRef } from 'react';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     if (value.length <= 10) {
//       setPhoneNumber(value);
//       setIsSwipeReady(value.length >= 10);
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//             <em>ENTER YOUR PHONE NUMBER<br />
//             TO GET EXCLUSIVE IN APP<br />
//             REWARDS</em>
//           </h2>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full px-4 py-3 bg-gray-200 rounded-lg text-black focus:outline-none font-nunito"
//             maxLength="10"
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 ">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
              
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT", 
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         // Extract the leaderboard array from the response
//         if (data && Array.isArray(data.leaderboard)) {
//           // Map the API response to match the expected structure
//           const formattedData = data.leaderboard.map(item => ({
//             name: `${item.first_name} ${item.last_name}`.trim() || item.mobile_number,
//             score: item.points,
//             image: item.profile_picture
//           }));
//           setLeaderboardData(formattedData);
//         } else {
//           console.error('API response does not contain a leaderboard array:', data);
//           setLeaderboardData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error.message);
//         setLeaderboardData([]);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   const handlePhoneSubmit = async (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     try {
//       const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone_number: phoneNumber }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);
//       setShowPhoneDialog(false);
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       setShowPhoneDialog(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//       `}</style>

//       {/* Phone Number Dialog */}
//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

      
//       {/* Side Drawer */}
//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
//               leaderboardData.map((user, index) => (
//                 <div 
//                   key={index}
//                   ref={index === 0 ? containerRef : null}
//                   className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                   style={{
//                     borderRadius: '8px',
//                     minHeight: '56px'
//                   }}
//                 >
//                   <img 
//                     src={user.image || 'https://picsum.photos/48/48?random=' + index}
//                     alt={`${user.name}'s profile`}
//                     className="w-14 h-14 profile-image object-cover"
//                     style={{ borderRadius: '8px 0 0 8px' }}
//                   />
//                   <div className="flex-1 ml-2 flex items-center">
//                     <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                   </div>
//                   <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                     {user.score}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-[#4A4A4A] text-center font-nunito">No leaderboard data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for drawer */}
//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       {/* Left Side Decorative Image */}
//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         {/* Join the Race Section */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <svg 
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
//                     fill="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
//                   </svg>
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code.You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Phone Mockup & Features */}
//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* App Store Buttons (Desktop Only) */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         {/* About Us Section */}
//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Footer */}
//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Elements */}
//       {/* Gradient Background for iPhone */}
//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       {/* Desktop iPhone Mockup */}
//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Desktop Carousel Navigation */}
//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Feature Steps Section */}
//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Footer */}
//       <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
























// import React, { useState, useEffect, useRef } from 'react';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (phone, meta) => {
//     setPhoneNumber(phone);
//     // Use meta data to validate phone number
//     const { isValid, country } = meta || {};
//     // Log validation details for debugging
//     console.log('Phone:', phone, 'IsValid:', isValid, 'Country:', country?.iso2, 'DialCode:', country?.dialCode);
//     // Extract digits from the phone number, excluding the country code
//     const digitsOnly = phone.replace(/\D/g, '');
//     const countryCode = country?.dialCode || '';
//     const nationalNumber = digitsOnly.slice(countryCode.length);
//     // Enable swipe if isValid is true or if national number has at least 8 digits
//     const isPhoneValid = isValid !== undefined ? isValid : nationalNumber.length >= 8;
//     setIsSwipeReady(isPhoneValid);
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//             <em>ENTER YOUR PHONE NUMBER<br />
//             TO GET EXCLUSIVE IN APP<br />
//             REWARDS</em>
//           </h2>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <PhoneInput
//             defaultCountry="us"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full font-nunito"
//             inputProps={{
//               className: "w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito",
//               maxLength: 16 // Adjust for country code + phone number
//             }}
//             countrySelectorStyleProps={{
//               buttonClassName: "w-[60px] !h-[44px] px-2 py-1 bg-gray-200 rounded-l-lg text-black font-nunito border-none focus:outline-none flex items-center",
//               dropdownStyleProps: {
//                 className: "react-international-phone-country-selector-dropdown"
//               }
//             }}
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
//               Please enter a valid phone number to unlock rewards.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT", 
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   // useEffect(() => {
//   //   const fetchLeaderboardData = async () => {
//   //     try {
//   //       const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
//   //       if (!response.ok) {
//   //         throw new Error(`API request failed with status ${response.status}`);
//   //       }
//   //       const data = await response.json();
//   //       if (data && Array.isArray(data.leaderboard)) {
//   //         const formattedData = data.leaderboard.map(item => ({
//   //           name: `${item.first_name} ${item.last_name}`.trim() || item.mobile_number,
//   //           score: item.points,
//   //           image: item.profile_picture
//   //         }));
//   //         setLeaderboardData(formattedData);
//   //       } else {
//   //         console.error('API response does not contain a leaderboard array:', data);
//   //         setLeaderboardData([]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching leaderboard data:', error.message);
//   //       setLeaderboardData([]);
//   //     }
//   //   };

//   //   fetchLeaderboardData();
//   // }, []);
//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data && Array.isArray(data.leaderboard)) {
//           const formattedData = data.leaderboard
//             .filter(item => item.first_name && item.last_name) // Filter for entries with both first_name and last_name
//             .map(item => ({
//               name: `${item.first_name} ${item.last_name}`.trim(),
//               score: item.points,
//             }));
//           setLeaderboardData(formattedData);
//         } else {
//           console.error('API response does not contain a leaderboard array:', data);
//           setLeaderboardData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error.message);
//         setLeaderboardData([]);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   const handlePhoneSubmit = async (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     try {
//       const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone_number: phoneNumber ,source: "website"}),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);
//       setShowPhoneDialog(false);
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       setShowPhoneDialog(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//         .react-international-phone-country-selector-dropdown {
//           z-index: 60; /* Ensure dropdown appears above dialog */
//         }
//       `}</style>

//       {/* Phone Number Dialog */}
//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

//       {/* Side Drawer */}
//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
//               leaderboardData.map((user, index) => (
//                 <div 
//                   key={index}
//                   ref={index === 0 ? containerRef : null}
//                   className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                   style={{
//                     borderRadius: '8px',
//                     minHeight: '56px'
//                   }}
//                 >
//                   {/* <img 
//                     src={user.image || 'https://picsum.photos/48/48?random=' + index}
//                     alt={`${user.name}'s profile`}
//                     className="w-14 h-14 profile-image object-cover"
//                     style={{ borderRadius: '8px 0 0 8px' }}
//                   /> */}
//                   <div className="flex-1 ml-2 flex items-center">
//                     <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                   </div>
//                   <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                     {user.score}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-[#4A4A4A] text-center font-nunito">No leaderboard data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for drawer */}
//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       {/* Left Side Decorative Image */}
//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         {/* Join the Race Section */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   {/* <svg 
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
//                     fill="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
//                   </svg> */}
//                   <img color='white'
//   src="/download.svg"
//   alt="Leaderboard Icon"
//   className="w-5 h-5 sm:w-6 sm:h-6 text-white"
// />
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code. You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Phone Mockup & Features */}
//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* App Store Buttons (Desktop Only) */}
//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         {/* About Us Section */}
//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Footer */}
//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Elements */}
//       {/* Gradient Background for iPhone */}
//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       {/* Desktop iPhone Mockup */}
//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Desktop Carousel Navigation */}
//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Feature Steps Section */}
//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Footer */}
//       <div className="absolute bottom-4 sm:bottom-4 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//           <a href="https://www.instagram.com/app.sesh/" target="_blank" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="https://www.tiktok.com/@app.sesh" target="_blank" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (phone, meta) => {
//     setPhoneNumber(phone);
//     const { isValid, country } = meta || {};
//     console.log('Phone:', phone, 'IsValid:', isValid, 'Country:', country?.iso2, 'DialCode:', country?.dialCode);
//     const digitsOnly = phone.replace(/\D/g, '');
//     const countryCode = country?.dialCode || '';
//     const nationalNumber = digitsOnly.slice(countryCode.length);
//     const isPhoneValid = isValid !== undefined ? isValid : nationalNumber.length >= 8;
//     setIsSwipeReady(isPhoneValid);
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//             <em>ENTER YOUR PHONE NUMBER<br />
//             TO GET EXCLUSIVE IN APP<br />
//             REWARDS</em>
//           </h2>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <PhoneInput
//             defaultCountry="us"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full font-nunito"
//             inputProps={{
//               className: "w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito",
//               maxLength: 16
//             }}
//             countrySelectorStyleProps={{
//               buttonClassName: "w-[60px] !h-[44px] px-2 py-1 bg-gray-200 rounded-l-lg text-black font-nunito border-none focus:outline-none flex items-center",
//               dropdownStyleProps: {
//                 className: "react-international-phone-country-selector-dropdown"
//               }
//             }}
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
//               Please enter a valid phone number to unlock rewards.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const PrivacyPolicy = () => {
//   const [policyData, setPolicyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPrivacyPolicy = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/privacy-policy/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data.status === 200 && data.data) {
//           setPolicyData(data.data);
//         } else {
//           setError('Invalid API response format');
//         }
//       } catch (err) {
//         setError('Failed to fetch privacy policy: ' + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrivacyPolicy();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
//         <p className="text-[#4A4A4A] text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
//         <p className="text-[#4A4A4A] text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/')}
//           className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//         >
//           ← Back to Home
//         </button>
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//           {policyData.title.charAt(0).toUpperCase() + policyData.title.slice(1)}
//         </h1>
//         <div
//           className="prose prose-lg text-[#4A4A4A] font-nunito"
//           dangerouslySetInnerHTML={{ __html: policyData.description }}
//         />
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT",
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data && Array.isArray(data.leaderboard)) {
//           const formattedData = data.leaderboard
//             .filter(item => item.first_name && item.last_name)
//             .map(item => ({
//               name: `${item.first_name} ${item.last_name}`.trim(),
//               score: item.points,
//             }));
//           setLeaderboardData(formattedData);
//         } else {
//           console.error('API response does not contain a leaderboard array:', data);
//           setLeaderboardData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error.message);
//         setLeaderboardData([]);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   const handlePhoneSubmit = async (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     try {
//       const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone_number: phoneNumber, source: "website" }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);
//       setShowPhoneDialog(false);
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       setShowPhoneDialog(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       const height = containerRef.current.getBoundingClientRect().height;
//       setContainerHeight(height);
//     }
//   }, [isDrawerOpen]);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//         .react-international-phone-country-selector-dropdown {
//           z-index: 60;
//         }
//       `}</style>

//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
//               leaderboardData.map((user, index) => (
//                 <div 
//                   key={index}
//                   ref={index === 0 ? containerRef : null}
//                   className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                   style={{
//                     borderRadius: '8px',
//                     minHeight: '56px'
//                   }}
//                 >
//                   <div className="flex-1 ml-2 flex items-center">
//                     <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                   </div>
//                   <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                     {user.score}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-[#4A4A4A] text-center font-nunito">No leaderboard data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <img
//                     src="/download.svg"
//                     alt="Leaderboard Icon"
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white"
//                   />
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code. You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <Link to="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</Link>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//             <a href="https://www.instagram.com/app.sesh/" target="_blank" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="https://www.tiktok.com/@app.sesh" target="_blank" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//           </div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-4 sm:bottom-4 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <Link to="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</Link>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
//           <a href="https://www.instagram.com/app.sesh/" target="_blank" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="https://www.tiktok.com/@app.sesh" target="_blank" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Root component with routing
// const Root = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//     </Routes>
//   </Router>
// );

// export default Root;



// import React, { useState, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (phone, meta) => {
//     setPhoneNumber(phone);
//     const { isValid, country } = meta || {};
//     console.log('Phone:', phone, 'IsValid:', isValid, 'Country:', country?.iso2, 'DialCode:', country?.dialCode);
//     const digitsOnly = phone.replace(/\D/g, '');
//     const countryCode = country?.dialCode || '';
//     const nationalNumber = digitsOnly.slice(countryCode.length);
//     const isPhoneValid = isValid !== undefined ? isValid : nationalNumber.length >= 8;
//     setIsSwipeReady(isPhoneValid);
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//             <em>ENTER YOUR PHONE NUMBER<br />
//             TO GET EXCLUSIVE IN APP<br />
//             REWARDS</em>
//           </h2>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <PhoneInput
//             defaultCountry="us"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full font-nunito"
//             inputProps={{
//               className: "w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito",
//               maxLength: 16
//             }}
//             countrySelectorStyleProps={{
//               buttonClassName: "w-[60px] !h-[44px] px-2 py-1 bg-gray-200 rounded-l-lg text-black font-nunito border-none focus:outline-none flex items-center",
//               dropdownStyleProps: {
//                 className: "react-international-phone-country-selector-dropdown"
//               }
//             }}
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
//               Please enter a valid phone number to unlock rewards.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const PrivacyPolicy = () => {
//   const [policyData, setPolicyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPrivacyPolicy = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/privacy-policy/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data.status === 200 && data.data) {
//           setPolicyData(data.data);
//         } else {
//           setError('Invalid API response format');
//         }
//       } catch (err) {
//         setError('Failed to fetch privacy policy: ' + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrivacyPolicy();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
//         <p className="text-[#4A4A4A] text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
//         <p className="text-[#4A4A4A] text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/')}
//           className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//         >
//           ← Back to Home
//         </button>
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//           {policyData.title.charAt(0).toUpperCase() + policyData.title.slice(1)}
//         </h1>
//         <div
//           className="prose prose-lg text-[#4A4A4A] font-nunito"
//           dangerouslySetInnerHTML={{ __html: policyData.description }}
//         />
//       </div>
//     </div>
//   );
// };


// const Contact = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     category: '', // Initialize as empty until categories are loaded
//     description: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/categories/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data.categories);
//         // Set default category to the first one if available
//         if (data.categories.length > 0) {
//           setFormData(prev => ({ ...prev, category: data.categories[0].name }));
//         }
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setError('Failed to load categories. Please try again.');
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const selectedCategory = categories.find(cat => cat.name === formData.category);
//     const payload = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone_number: formData.phoneNumber,
//       category: selectedCategory ? selectedCategory.id : null,
//       description: formData.description
//     };

//     try {
//       const response = await fetch('https://django.sesh.one/api/submissions/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }

//       const data = await response.json();
//       console.log('Form submitted successfully:', data);
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       setError('Failed to submit form. Please try again.');
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//         <div className="max-w-4xl mx-auto">
//           <button
//             onClick={() => navigate('/')}
//             className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//           >
//             ← Back to Home
//           </button>
//           <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//             Contact Us
//           </h1>
//           <div className="bg-green-100 rounded-lg p-6 text-center">
//             <p className="text-[#4A4A4A] text-lg font-nunito">
//               Form successfully submitted!
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/')}
//           className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//         >
//           ← Back to Home
//         </button>
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//           Contact Us
//         </h1>
//         {error && (
//           <div className="bg-red-100 rounded-lg p-4 mb-6 text-center">
//             <p className="text-red-700 text-lg font-nunito">{error}</p>
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//             />
//           </div>
//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Category
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//               disabled={categories.length === 0}
//             >
//               {categories.length === 0 ? (
//                 <option value="">Loading categories...</option>
//               ) : (
//                 categories.map(category => (
//                   <option key={category.id} value={category.name}>
//                     {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="5"
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-nunito"
//               disabled={categories.length === 0}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// const App = () => {
//   const [userCount, setUserCount] = useState(999999);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);
//   const navigate = useNavigate();

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT",
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data && Array.isArray(data.leaderboard)) {
//           const formattedData = data.leaderboard
//             .filter(item => item.first_name && item.last_name)
//             .map(item => ({
//               name: `${item.first_name} ${item.last_name}`.trim(),
//               score: item.points,
//             }));
//           setLeaderboardData(formattedData);
//         } else {
//           console.error('API response does not contain a leaderboard array:', data);
//           setLeaderboardData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error.message);
//         setLeaderboardData([]);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   const handlePhoneSubmit = async (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     try {
//       const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone_number: phoneNumber, source: "website" }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);
//       setShowPhoneDialog(false);
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       setShowPhoneDialog(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allIndices = new Set();
//       const countStr = userCount.toLocaleString().replace(/,/g, '');
//       for (let i = 0; i < countStr.length; i++) {
//         allIndices.add(i);
//       }
//       setShufflingIndices(allIndices);

//       setTimeout(() => {
//         setUserCount(prevCount => {
//           const increment = Math.floor(Math.random() * 5) + 1;
//           const newCount = prevCount + increment;
//           const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
//           const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//           const changedIndices = new Set();
          
//           for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
//             const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
//             const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
//             if (prevDigit !== newDigit) {
//               changedIndices.add(newCountStr.length - 1 - i);
//             }
//           }
          
//           setAnimatingIndices(changedIndices);
//           setShufflingIndices(new Set());
          
//           setTimeout(() => {
//             setAnimatingIndices(new Set());
//           }, 300);
          
//           return newCount;
//         });
//       }, 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [userCount]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [phoneImages.length]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const handlePlaceholderClick = () => {
//     // Placeholder for future navigation or action
//     console.log('Placeholder link clicked');
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//         .react-international-phone-country-selector-dropdown {
//           z-index: 60;
//         }
//         .link-button {
//           background: none;
//           border: none;
//           padding: 0;
//           font: inherit;
//           color: #4B5563;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .link-button:hover {
//           color: #9333EA;
//         }
//       `}</style>

//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
//               leaderboardData.map((user, index) => (
//                 <div 
//                   key={index}
//                   ref={index === 0 ? containerRef : null}
//                   className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                   style={{
//                     borderRadius: '8px',
//                     minHeight: '56px'
//                   }}
//                 >
//                   <div className="flex-1 ml-2 flex items-center">
//                     <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                   </div>
//                   <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                     {user.score}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-[#4A4A4A] text-center font-nunito">No leaderboard data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <img
//                     src="/download.svg"
//                     alt="Leaderboard Icon"
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white"
//                   />
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code. You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//           </div>
//         </div>

//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <Link to="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</Link>
//             <button onClick={() => navigate('/contact')} className="link-button">Contact</button>
//             <button onClick={handlePlaceholderClick} className="link-button">Facebook</button>
//             <button onClick={handlePlaceholderClick} className="link-button">Twitter</button>
//             <a href="https://www.instagram.com/app.sesh/" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="https://www.tiktok.com/@app.sesh" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <button onClick={handlePlaceholderClick} className="link-button">LinkedIn</button>
//           </div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-4 sm:bottom-4 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <Link to="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</Link>
//           <button onClick={() => navigate('/contact')} className="link-button">Contact</button>
//           <button onClick={handlePlaceholderClick} className="link-button">Facebook</button>
//           <button onClick={handlePlaceholderClick} className="link-button">Twitter</button>
//           <a href="https://www.instagram.com/app.sesh/" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="https://www.tiktok.com/@app.sesh" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <button onClick={handlePlaceholderClick} className="link-button">LinkedIn</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Root component with routing
// const Root = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//       <Route path="/contact" element={<Contact />} />
//     </Routes>
//   </Router>
// );

// export default Root;




// import React, { useState, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// const FlipCard = ({ digit, isAnimating, isShuffling }) => {
//   const [currentDigit, setCurrentDigit] = useState(digit);
//   const [nextDigit, setNextDigit] = useState(digit);
//   const [shuffleDigit, setShuffleDigit] = useState(digit);

//   useEffect(() => {
//     if (isShuffling) {
//       const shuffleInterval = setInterval(() => {
//         setShuffleDigit(Math.floor(Math.random() * 10).toString());
//       }, 50);

//       setTimeout(() => {
//         clearInterval(shuffleInterval);
//         setShuffleDigit(digit);
//       }, 800);

//       return () => clearInterval(shuffleInterval);
//     }
//   }, [isShuffling, digit]);

//   useEffect(() => {
//     if (digit !== currentDigit && !isShuffling) {
//       setNextDigit(digit);
//       setTimeout(() => {
//         setCurrentDigit(digit);
//       }, 150);
//     }
//   }, [digit, currentDigit, isShuffling]);

//   const displayDigit = isShuffling ? shuffleDigit : (isAnimating ? nextDigit : currentDigit);

//   return (
//     <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
//           {displayDigit}
//         </span>
//       </div>
//       <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
//         <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
//           <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
//             {displayDigit}
//           </span>
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
//     </div>
//   );
// };

// const PhoneNumberDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSwipeReady, setIsSwipeReady] = useState(false);
//   const [swipeDistance, setSwipeDistance] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const swipeThreshold = 200;

//   const handlePhoneChange = (phone, meta) => {
//     setPhoneNumber(phone);
//     const { isValid, country } = meta || {};
//     console.log('Phone:', phone, 'IsValid:', isValid, 'Country:', country?.iso2, 'DialCode:', country?.dialCode);
//     const digitsOnly = phone.replace(/\D/g, '');
//     const countryCode = country?.dialCode || '';
//     const nationalNumber = digitsOnly.slice(countryCode.length);
//     const isPhoneValid = isValid !== undefined ? isValid : nationalNumber.length >= 8;
//     setIsSwipeReady(isPhoneValid);
//   };

//   const handleMouseDown = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleMouseUp = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (!isSwipeReady) return;
//     setIsDragging(true);
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !isSwipeReady) return;
//     const currentX = e.touches[0].clientX;
//     const distance = Math.max(0, currentX - startX);
//     setSwipeDistance(Math.min(distance, swipeThreshold));
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging || !isSwipeReady) return;
    
//     if (swipeDistance >= swipeThreshold) {
//       onSubmit(phoneNumber);
//     } else {
//       setSwipeDistance(0);
//     }
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove);
//       document.addEventListener('touchend', handleTouchEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, swipeDistance, startX, isSwipeReady, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-nunito"
//         >
//           ×
//         </button>
        
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-[#4A4A4A] font-nunito">
//             <em>ENTER YOUR PHONE NUMBER<br />
//             TO GET EXCLUSIVE IN APP<br />
//             REWARDS</em>
//           </h2>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black mb-2 uppercase tracking-wide italic font-nunito">
//             ENTER PHONE NUMBER
//           </label>
//           <PhoneInput
//             defaultCountry="us"
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             className="w-full font-nunito"
//             inputProps={{
//               className: "w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito",
//               maxLength: 16
//             }}
//             countrySelectorStyleProps={{
//               buttonClassName: "w-[60px] !h-[44px] px-2 py-1 bg-gray-200 rounded-l-lg text-black font-nunito border-none focus:outline-none flex items-center",
//               dropdownStyleProps: {
//                 className: "react-international-phone-country-selector-dropdown"
//               }
//             }}
//           />
//         </div>

//         <div className="relative">
//           <div
//             className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
//               isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
//             }`}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//           >
//             <div
//               className="absolute inset-0 bg-purple-800 transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${(swipeDistance / swipeThreshold) * 100}%)`
//               }}
//             />
            
//             <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16">
//               <div
//                 className="flex items-center text-white font-medium transition-opacity duration-200 font-nunito"
//                 style={{
//                   opacity: 1 - (swipeDistance / swipeThreshold) * 0.7
//                 }}
//               >
//                 <span className="text-sm sm:text-base italic">SWIPE TO UNLOCK REWARDS</span>
//               </div>
//             </div>

//             <div
//               className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-md flex items-center justify-center shadow-lg transition-transform duration-200 ease-out"
//               style={{
//                 transform: `translateX(${swipeDistance}px)`
//               }}
//             >
//               <span className="text-purple-600 text-xl font-bold font-nunito">→</span>
//             </div>
//           </div>
          
//           {!isSwipeReady && (
//             <p className="text-sm text-[#4A4A4A] mt-2 text-center font-nunito">
//               Please enter a valid phone number to unlock rewards.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const PrivacyPolicy = () => {
//   const [policyData, setPolicyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPrivacyPolicy = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/privacy-policy/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data.status === 200 && data.data) {
//           setPolicyData(data.data);
//         } else {
//           setError('Invalid API response format');
//         }
//       } catch (err) {
//         setError('Failed to fetch privacy policy: ' + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrivacyPolicy();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
//         <p className="text-[#4A4A4A] text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center font-nunito">
//         <p className="text-[#4A4A4A] text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/')}
//           className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//         >
//           ← Back to Home
//         </button>
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//           {policyData.title.charAt(0).toUpperCase() + policyData.title.slice(1)}
//         </h1>
//         <div
//           className="prose prose-lg text-[#4A4A4A] font-nunito"
//           dangerouslySetInnerHTML={{ __html: policyData.description }}
//         />
//       </div>
//     </div>
//   );
// };
// const Contact = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     category: '', // Initialize as empty until categories are loaded
//     description: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/categories/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data.categories);
//         // Set default category to the first one if available
//         if (data.categories.length > 0) {
//           setFormData(prev => ({ ...prev, category: data.categories[0].name }));
//         }
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setError('Failed to load categories. Please try again.');
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const selectedCategory = categories.find(cat => cat.name === formData.category);
//     const payload = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone_number: formData.phoneNumber,
//       category: selectedCategory ? selectedCategory.id : null,
//       description: formData.description
//     };

//     try {
//       const response = await fetch('https://django.sesh.one/api/submissions/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }

//       const data = await response.json();
//       console.log('Form submitted successfully:', data);
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       setError('Failed to submit form. Please try again.');
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//         <div className="max-w-4xl mx-auto">
//           <button
//             onClick={() => navigate('/')}
//             className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//           >
//             ← Back to Home
//           </button>
//           <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//             Contact Us
//           </h1>
//           <div className="bg-green-100 rounded-lg p-6 text-center">
//             <p className="text-[#4A4A4A] text-lg font-nunito">
//               Form successfully submitted!
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-nunito">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/')}
//           className="mb-6 text-purple-500 hover:text-purple-600 text-lg font-bold font-nunito"
//         >
//           ← Back to Home
//         </button>
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-6 font-nunito">
//           Contact Us
//         </h1>
//         {error && (
//           <div className="bg-red-100 rounded-lg p-4 mb-6 text-center">
//             <p className="text-red-700 text-lg font-nunito">{error}</p>
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//             />
//           </div>
//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Category
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//               disabled={categories.length === 0}
//             >
//               {categories.length === 0 ? (
//                 <option value="">Loading categories...</option>
//               ) : (
//                 categories.map(category => (
//                   <option key={category.id} value={category.name}>
//                     {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-[#4A4A4A] mb-2 font-nunito">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="5"
//               className="w-full px-4 py-3 bg-gray-200 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-nunito"
//               disabled={categories.length === 0}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// const App = () => {
//   const [userCount, setUserCount] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const [animatingIndices, setAnimatingIndices] = useState(new Set());
//   const [shufflingIndices, setShufflingIndices] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [showPhoneDialog, setShowPhoneDialog] = useState(true);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);
//   const navigate = useNavigate();

//   const phoneImages = [
//     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
//     "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
//   ];

//   const featureSteps = [
//     {
//       title: "MATCH",
//       description: "use the one of a kind matchmaking system to find your friend or date"
//     },
//     {
//       title: "CHAT",
//       description: "invite your match to a hangout and see if they accept"
//     },
//     {
//       title: "SESH",
//       description: "meet your new friend or date in person and have your SESH."
//     }
//   ];

//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const response = await fetch('https://django.sesh.one/api/leaderboard-persistent/');
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         if (data && Array.isArray(data.leaderboard)) {
//           const formattedData = data.leaderboard
//             .filter(item => item.first_name && item.last_name)
//             .map(item => ({
//               name: `${item.first_name} ${item.last_name}`.trim(),
//               score: item.points,
//             }));
//           setLeaderboardData(formattedData);
//         } else {
//           console.error('API response does not contain a leaderboard array:', data);
//           setLeaderboardData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error.message);
//         setLeaderboardData([]);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   const handlePhoneSubmit = async (phoneNumber) => {
//     console.log('Phone number submitted:', phoneNumber);
//     try {
//       const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone_number: phoneNumber, source: "website" }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);
//       setShowPhoneDialog(false);
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       setShowPhoneDialog(false);
//     }
//   };

//   // Fetch initial count and active status
//   useEffect(() => {
//     const fetchInitialCount = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/current-count/');
//         if (response.ok) {
//           const data = await response.json();
//           setUserCount(data.count || 0);
//           setIsActive(data.is_active || false);
//         }
//       } catch (err) {
//         console.error('Error fetching initial count:', err);
//       }
//     };

//     fetchInitialCount();
//   }, []);

//   // Increment once after 2 seconds if active (per visit)
//   useEffect(() => {
//     if (isActive && userCount > 0) {  // Ensure initial fetch happened
//       const timeoutId = setTimeout(() => {
//         // Start shuffling all current digits
//         const countStr = userCount.toLocaleString().replace(/,/g, '');
//         const allIndices = new Set();
//         for (let i = 0; i < countStr.length; i++) {
//           allIndices.add(i);
//         }
//         setShufflingIndices(allIndices);

//         // After 1 second, perform the increment via API
//         const incrementTimeout = setTimeout(async () => {
//           try {
//             const response = await fetch('http://127.0.0.1:8000/api/increment-count/', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (response.ok) {
//               const data = await response.json();
//               const newCount = data.count;

//               // Calculate changed indices for animation (same logic as before)
//               const prevCountStr = userCount.toLocaleString().replace(/,/g, '');
//               const newCountStr = newCount.toLocaleString().replace(/,/g, '');
//               const changedIndices = new Set();
//               const maxLen = Math.max(prevCountStr.length, newCountStr.length);
//               for (let i = 0; i < maxLen; i++) {
//                 const prevDigit = prevCountStr.length > i ? prevCountStr[prevCountStr.length - 1 - i] : '0';
//                 const newDigit = newCountStr.length > i ? newCountStr[newCountStr.length - 1 - i] : '0';
//                 if (prevDigit !== newDigit) {
//                   changedIndices.add(newCountStr.length - 1 - i);
//                 }
//               }

//               setAnimatingIndices(changedIndices);
//               setShufflingIndices(new Set());

//               setTimeout(() => {
//                 setAnimatingIndices(new Set());
//               }, 300);

//               setUserCount(newCount);
//             }
//           } catch (err) {
//             console.error('Error incrementing count:', err);
//             // Clear shuffling on error
//             setShufflingIndices(new Set());
//           }
//         }, 1000);  // Shuffle for 1s, then increment (total ~3s, but starts after 2s wait)

//         return () => clearTimeout(incrementTimeout);
//       }, 2000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [isActive, userCount]);  // Re-run if active changes (e.g., if admin toggles during session)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [phoneImages.length]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (phoneRef.current) {
//         const rect = phoneRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const maxDistance = 200;
        
//         const deltaX = (e.clientX - centerX) / maxDistance;
//         const deltaY = (e.clientY - centerY) / maxDistance;
        
//         setMousePosition({
//           x: Math.max(-0.5, Math.min(0.5, deltaX)),
//           y: Math.max(-0.5, Math.min(0.5, deltaY))
//         });
//       }
//     };

//     const resetPosition = () => {
//       setMousePosition({ x: 0, y: 0 });
//     };

//     if (phoneRef.current) {
//       phoneRef.current.addEventListener('mouseenter', () => {
//         document.addEventListener('mousemove', handleMouseMove);
//       });
      
//       phoneRef.current.addEventListener('mouseleave', () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         resetPosition();
//       });
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   const formatUserCount = (count) => {
//     return count.toLocaleString();
//   };

//   const renderFlipCounter = () => {
//     const countStr = formatUserCount(userCount);
//     const elements = [];
//     let digitIndex = 0;
    
//     for (let i = 0; i < countStr.length; i++) {
//       const char = countStr[i];
//       if (char === ',') {
//         elements.push(
//           <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
//         );
//       } else {
//         const isAnimating = animatingIndices.has(digitIndex);
//         const isShuffling = shufflingIndices.has(digitIndex);
//         elements.push(
//           <FlipCard
//             key={`digit-${digitIndex}`}
//             digit={char}
//             isAnimating={isAnimating}
//             isShuffling={isShuffling}
//           />
//         );
//         digitIndex++;
//       }
//     }
//     return elements;
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex(prevIndex => 
//       (prevIndex + 1) % phoneImages.length
//     );
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const handlePlaceholderClick = () => {
//     // Placeholder for future navigation or action
//     console.log('Placeholder link clicked');
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

//         @keyframes flip {
//           0% { transform: rotateX(0deg); }
//           50% { transform: rotateX(-90deg); }
//           100% { transform: rotateX(0deg); }
//         }
//         .animate-flip {
//           animation: flip 0.3s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .drawer {
//           transform: translateX(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .drawer.open {
//           transform: translateX(0);
//         }
//         .profile-image {
//           border-radius: 50% 0 0 50%;
//         }
//         .font-nunito {
//           font-family: 'Nunito', sans-serif !important;
//         }
//         .react-international-phone-country-selector-dropdown {
//           z-index: 60;
//         }
//         .link-button {
//           background: none;
//           border: none;
//           padding: 0;
//           font: inherit;
//           color: #4B5563;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .link-button:hover {
//           color: #9333EA;
//         }
//       `}</style>

//       <PhoneNumberDialog
//         isOpen={showPhoneDialog}
//         onClose={() => setShowPhoneDialog(false)}
//         onSubmit={handlePhoneSubmit}
//       />

//       <div 
//         className={`drawer fixed top-0 right-0 h-full w-80 sm:w-80 bg-gray-100 shadow-lg z-30 ${isDrawerOpen ? 'open' : ''}`}
//         style={{ width: 'min(320px, 85vw)' }}
//       >
//         <div className="p-4">
//           <button 
//             onClick={toggleDrawer}
//             className="text-purple-500 text-2xl font-bold mb-4 font-nunito"
//           >
//             ✕
//           </button>
//           <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-4 font-nunito"><i>LEADERBOARD</i></h2>
//           <div className="space-y-3">
//             {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
//               leaderboardData.map((user, index) => (
//                 <div 
//                   key={index}
//                   ref={index === 0 ? containerRef : null}
//                   className="flex items-center bg-white pl-0 pr-2 shadow-sm"
//                   style={{
//                     borderRadius: '8px',
//                     minHeight: '56px'
//                   }}
//                 >
//                   <div className="flex-1 ml-2 flex items-center">
//                     <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
//                   </div>
//                   <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
//                     {user.score}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-[#4A4A4A] text-center font-nunito">No leaderboard data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {isDrawerOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 z-20"
//           onClick={toggleDrawer}
//         />
//       )}

//       <img 
//         src="SESH_Isotype 1.svg"
//         alt="Decorative background"
//         className="absolute hidden lg:block z-0 object-cover"
//         style={{
//           left: 'calc((100vw - 1536px) / 2 - 200px)',
//           top: '30px',
//           bottom: '50px',
//           width: '400px'
//         }}
//       />

//       <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
//           <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
//             <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
//             <i className="hidden lg:block">SESH</i>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
//             the world is your oyster, go find your pearls
//           </p>
//         </div>

//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
//             <div className="flex items-center mb-3 sm:mb-4">
//               <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
//               <div className="relative group">
//                 <button
//                   onClick={toggleDrawer}
//                   className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
//                 >
//                   <img
//                     src="/download.svg"
//                     alt="Leaderboard Icon"
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white"
//                   />
//                 </button>
//                 <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
//                   referral leader board
//                   <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
//               <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
//                 We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code. You get your referral code in the app.
//               </p>
//             </div>
//             <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
//               {renderFlipCounter()}
//             </div>
//           </div>
//         </div>

//         <div className="block lg:hidden mb-6 sm:mb-8">
//           <div className="w-full mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <img 
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="Download on the App Store"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               {/* <a href='https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh'>
//                 <img 
//                 src="google-play-badge.png"
//                 alt="Get it on Google Play"
//                 className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//               />
//               </a> */}
//               <a
// //   href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
// //   target="_blank"
// //   rel="noopener noreferrer"
// // >
// //   <img
// //     src="google-play-badge.png"
// //     alt="Get it on Google Play"
// //     className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
// //   />
// // </a>
// href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
//   target="_blank"
//   rel="noopener noreferrer"
//   onClick={(e) => {
//     console.log('Link clicked!');
//     console.log('URL:', e.currentTarget.href);
//   }}
// >
//   <img
//     src="/google-play-badge.png"  // Note the leading slash
//     alt="Get it on Google Play"
//     className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//     onLoad={() => console.log('Image loaded successfully')}
//     onError={() => console.log('Image failed to load')}
//   />
// </a>
              
//             </div>
//           </div>

//           <div className="flex justify-center mb-6">
//             <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
//               <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
//                 <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
//                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
//                   <img 
//                     src={phoneImages[currentImageIndex]} 
//                     alt={`App screenshot ${currentImageIndex + 1}`} 
//                     className="w-full h-full object-cover rounded-[1.2rem]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mb-6">
//             <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
//               <button
//                 onClick={goToPrevImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ‹
//               </button>
//               <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//                 {phoneImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
//                       index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                     }`}
//                     style={{ borderRadius: '5px' }}
//                   >
//                     <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={goToNextImage}
//                 className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//               >
//                 ›
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-xl p-4">
//             <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
//             <div className="bg-purple-500 rounded-lg p-3">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 {featureSteps[currentImageIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <img 
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="Download on the App Store"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             />
//             {/* <img 
//               src="google-play-badge.png"
//               alt="Get it on Google Play"
//               className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//             /> */}
//              <a
// //   href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
// //   target="_blank"
// //   rel="noopener noreferrer"
// // >
// //   <img
// //     src="google-play-badge.png"
// //     alt="Get it on Google Play"
// //     className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
// //   />
// // </a>
// href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
//   target="_blank"
//   rel="noopener noreferrer"
//   onClick={(e) => {
//     console.log('Link clicked!');
//     console.log('URL:', e.currentTarget.href);
//   }}
// >
//   <img
//     src="/google-play-badge.png"  // Note the leading slash
//     alt="Get it on Google Play"
//     className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
//     onLoad={() => console.log('Image loaded successfully')}
//     onError={() => console.log('Image failed to load')}
//   />
// </a>
//           </div>
//         </div>

//         <div className="w-full mb-6 lg:max-w-3xl">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//             <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
//             <div className="bg-purple-500 rounded-lg p-5">
//               <p className="text-white text-sm sm:text-base font-nunito">
//                 <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="block lg:hidden mt-8 pt-8 pb-6">
//           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
//             <Link to="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</Link>
//             <button onClick={() => navigate('/contact')} className="link-button">Contact</button>
//             <button onClick={handlePlaceholderClick} className="link-button">Facebook</button>
//             <button onClick={handlePlaceholderClick} className="link-button">Twitter</button>
//             <a href="https://www.instagram.com/app.sesh/" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">Instagram</a>
//             <a href="https://www.tiktok.com/@app.sesh" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">TikTok</a>
//             <button onClick={handlePlaceholderClick} className="link-button">LinkedIn</button>
//           </div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-0"
//         style={{
//           top: '80px',
//           right: 'calc((100vw - 1536px) / 2 + 20px)',
//           width: '500px',
//           height: '600px',
//           background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
//           borderRadius: '50%',
//           filter: 'blur(40px)'
//         }}
//       />

//       <div 
//         ref={phoneRef}
//         className="absolute hidden lg:block cursor-pointer z-10"
//         style={{
//           transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
//           transition: 'transform 0.2s ease-out',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '80px',
//           width: '280px',
//           height: '500px',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         <div className="relative">
//           <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
//             <div className="w-full h-full bg-black rounded-[2rem] p-1">
//               <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
//                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
//                 <img 
//                   src={phoneImages[currentImageIndex]} 
//                   alt={`App screenshot ${currentImageIndex + 1}`} 
//                   className="w-full h-full object-cover rounded-[1.8rem]"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-10"
//         style={{ 
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           top: '580px',
//           width: '280px'
//         }}
//       >
//         <div className="flex justify-center items-center">
//           <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
//             <button
//               onClick={goToPrevImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ‹
//             </button>
//             <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
//               {phoneImages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
//                     index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
//                   }`}
//                   style={{ borderRadius: '5px' }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full" />
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={goToNextImage}
//               className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>

//       <div 
//         className="absolute hidden lg:block z-10" 
//         style={{ 
//           top: '670px',
//           right: 'calc((100vw - 1536px) / 2 + 58px)',
//           width: '280px'
//         }}
//       >
//         <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
//           <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
//           <div className="bg-purple-500 rounded-lg p-3">
//             <p className="text-white text-lg font-nunito">
//               {featureSteps[currentImageIndex].description}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-4 sm:bottom-4 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
//         <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
//           <Link to="/privacy-policy" className="hover:text-purple-500 transition duration-300">Privacy Policy</Link>
//           <button onClick={() => navigate('/contact')} className="link-button">Contact</button>
//           <button onClick={handlePlaceholderClick} className="link-button">Facebook</button>
//           <button onClick={handlePlaceholderClick} className="link-button">Twitter</button>
//           <a href="https://www.instagram.com/app.sesh/" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">Instagram</a>
//           <a href="https://www.tiktok.com/@app.sesh" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">TikTok</a>
//           <button onClick={handlePlaceholderClick} className="link-button">LinkedIn</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Root component with routing
// const Root = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//       <Route path="/contact" element={<Contact />} />
//     </Routes>
//   </Router>
// );

// export default Root;




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
    <div className="relative flex-1 h-16 sm:h-20 md:h-24 lg:h-28 rounded-md overflow-hidden flex items-center justify-center mobile-flip-card" style={{ backgroundColor: '#A659FF' }}>
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
            className={`relative bg-purple-600 rounded-md h-14 overflow-hidden ${
              isSwipeReady ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'
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
      <div className="flex items-center justify-center min-h-[400px]">
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
      <form onSubmit={handleSubmit} className="space-y-6">
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
              rows="5"
              placeholder="ENTER ANY MORE DETAILS ABOUT YOUR REQUEST"
              className="w-full px-4 py-3 rounded-lg text-[#4A4A4A] focus:outline-none font-nunito placeholder-black placeholder:font-bold border-none"
              style={{ backgroundColor: '#F9F9F9', border: 'none' }}
              required
            />
          </div>
          <div className="flex justify-center" style={{ marginTop: '14px' }}>
            <button
              type="submit"
              className="bg-purple-500 text-white px-32 py-3 rounded-lg hover:bg-purple-600 transition-colors font-nunito font-bold italic"
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
          <div className="rounded-xl p-6 sm:p-8 flex items-center justify-center mobile-text-container" style={{ backgroundColor: '#EFEFEF' }}>
            <p className="text-[#4A4A4A] text-lg sm:text-xl md:text-2xl lg:text-3xl font-nunito mobile-text-size">
              We are going to launch the next phase of the app once we hit <span className="font-bold">1 million users</span>. Help us get there by inviting your friends, family, and neighbors to download the app!
            </p>
          </div>

          {/* Counter Container */}
          <div className="rounded-xl flex flex-col justify-center relative mobile-counter-container" style={{ padding: '10px', backgroundColor: '#EFEFEF' }}>
            <div className="flex justify-center items-center space-x-2 sm:space-x-3 w-full mobile-counter-spacing">
              {renderFlipCounter()}
            </div>
            <div className="absolute bottom-2 right-4 mobile-users-text">
              <span className="text-[#4A4A4A] text-sm sm:text-base font-nunito font-bold">USERS</span>
            </div>
          </div>
        </div>

        {/* How to Sesh Cards and Form Layout */}
        <div className="w-full">
          {/* Flex container for mobile reordering */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-3 md:gap-4 lg:gap-6">
            {/* How to Sesh Cards */}
            <div className="md:col-span-1 h-full order-1 mb-4 sm:mb-6 md:mb-8">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 h-full">
                {/* SWIPE Card */}
                <div className="flex flex-col items-center h-full">
                  <div className="rounded-xl p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
                    <h3 className="text-[#4A4A4A] text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-center font-nunito"><em>SWIPE</em></h3>
                    <div className="mb-2 sm:mb-4 flex justify-center">
                      <img src="/left and right swipe.svg" alt="Swipe Left and Right" className="w-20 h-10 sm:w-40 sm:h-20 md:w-48 md:h-24 lg:w-56 lg:h-28 object-contain" />
                    </div>
                    <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-[0.5rem] sm:text-base md:text-lg lg:text-xl uppercase">SWIPE LEFT FOR NO AND RIGHT FOR YES</p>
                  </div>
                </div>

                {/* INVITE Card */}
                <div className="flex flex-col items-center h-full">
                  <div className="rounded-xl p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
                    <h3 className="text-[#4A4A4A] text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-center font-nunito"><em>INVITE</em></h3>
                    <div className="mb-2 sm:mb-4">
                      <img src="/Onboarding_Invite 1.svg" alt="Invite" className="w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
                    </div>
                    <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-[0.5rem] sm:text-base md:text-lg lg:text-xl uppercase">INVITE YOUR MATCH TO A SESH</p>
                  </div>
                </div>

                {/* PLAN Card */}
                <div className="flex flex-col items-center h-full">
                  <div className="rounded-xl p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
                    <h3 className="text-[#4A4A4A] text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-center font-nunito"><em>PLAN</em></h3>
                    <div className="mb-2 sm:mb-4">
                      <img src="/Onboarding_Chat 1.svg" alt="Chat" className="w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
                    </div>
                    <p className="text-[#4A4A4A] text-center font-nunito font-bold italic text-[0.5rem] sm:text-base md:text-lg lg:text-xl uppercase whitespace-nowrap">PLAN THROUGH A CHAT<br />AND HAVE YOUR SESH</p>
                  </div>
                </div>
              </div>
            </div>

            {/* App Store Banners Row */}
            <div className="flex flex-row justify-start items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 order-2 md:order-3 md:col-span-2">
                  <a
                    href="https://apps.apple.com/us/app/the-sesh-app/id1671947382"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      className="h-16 sm:h-20 md:h-24 cursor-pointer hover:opacity-80 transition-opacity object-contain"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.therealnetworkssss.sesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/google-play-badge.png"
                      alt="Get it on Google Play"
                      className="h-16 sm:h-20 md:h-24 cursor-pointer hover:opacity-80 transition-opacity object-contain"
                    />
                  </a>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-1 flex flex-col h-full order-3 md:order-2 mb-4 sm:mb-6 md:mb-8">
              <div className="rounded-xl p-2 sm:p-2 md:p-3 w-full h-full" style={{ backgroundColor: '#EFEFEF' }}>
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