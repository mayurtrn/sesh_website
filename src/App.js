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






import React, { useState, useEffect, useRef } from 'react';

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
    <div className="relative flex-1 h-12 sm:h-16 md:h-20 bg-purple-500 rounded-md overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transition-all duration-100 leading-none">
          {displayDigit}
        </span>
      </div>
      <div className={`absolute inset-0 ${isAnimating ? 'animate-flip' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-500 flex items-end justify-center overflow-hidden">
          <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform translate-y-1/2 leading-none">
            {displayDigit}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-500 flex items-start justify-center overflow-hidden">
          <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito transform -translate-y-1/2 leading-none">
            {displayDigit}
          </span>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-600 transform -translate-y-1/2 z-10"></div>
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

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setIsSwipeReady(value.length >= 10);
    }
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
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 bg-gray-200 rounded-lg text-black focus:outline-none font-nunito"
            maxLength="10"
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
            
            <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 ">
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
              
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [userCount, setUserCount] = useState(999999);
  const [animatingIndices, setAnimatingIndices] = useState(new Set());
  const [shufflingIndices, setShufflingIndices] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [showPhoneDialog, setShowPhoneDialog] = useState(true);
  const containerRef = useRef(null);
  const phoneRef = useRef(null);

  const phoneImages = [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=800&fit=crop"
  ];

  const featureSteps = [
    {
      title: "MATCH",
      description: "use the one of a kind matchmaking system to find your friend or date"
    },
    {
      title: "CHAT", 
      description: "invite your match to a hangout and see if they accept"
    },
    {
      title: "SESH",
      description: "meet your new friend or date in person and have your SESH."
    }
  ];

  const leaderboardData = [
    { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=1" },
    { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=2" },
    { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=3" },
    { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=4" },
    { name: "MAYUR E", score: 1000, image: "https://picsum.photos/48/48?random=5" },
  ];

  const handlePhoneSubmit = async (phoneNumber) => {
    console.log('Phone number submitted:', phoneNumber);
    try {
      const response = await fetch('https://django.sesh.one/api/check-generate-referral/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);
      // Optionally, you can handle the response data here (e.g., store referral code, show a success message, etc.)
      setShowPhoneDialog(false);
    } catch (error) {
      console.error('Error calling API:', error.message);
      // Optionally, you can show an error message to the user here
      setShowPhoneDialog(false); // Close dialog even on error, but you can modify this behavior as needed
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const allIndices = new Set();
      const countStr = userCount.toLocaleString().replace(/,/g, '');
      for (let i = 0; i < countStr.length; i++) {
        allIndices.add(i);
      }
      setShufflingIndices(allIndices);

      setTimeout(() => {
        setUserCount(prevCount => {
          const increment = Math.floor(Math.random() * 5) + 1;
          const newCount = prevCount + increment;
          const prevCountStr = prevCount.toLocaleString().replace(/,/g, '');
          const newCountStr = newCount.toLocaleString().replace(/,/g, '');
          const changedIndices = new Set();
          
          for (let i = 0; i < Math.max(prevCountStr.length, newCountStr.length); i++) {
            const prevDigit = prevCountStr[prevCountStr.length - 1 - i] || '0';
            const newDigit = newCountStr[newCountStr.length - 1 - i] || '0';
            if (prevDigit !== newDigit) {
              changedIndices.add(newCountStr.length - 1 - i);
            }
          }
          
          setAnimatingIndices(changedIndices);
          setShufflingIndices(new Set());
          
          setTimeout(() => {
            setAnimatingIndices(new Set());
          }, 300);
          
          return newCount;
        });
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [userCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % phoneImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (phoneRef.current) {
        const rect = phoneRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const maxDistance = 200;
        
        const deltaX = (e.clientX - centerX) / maxDistance;
        const deltaY = (e.clientY - centerY) / maxDistance;
        
        setMousePosition({
          x: Math.max(-0.5, Math.min(0.5, deltaX)),
          y: Math.max(-0.5, Math.min(0.5, deltaY))
        });
      }
    };

    const resetPosition = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    if (phoneRef.current) {
      phoneRef.current.addEventListener('mouseenter', () => {
        document.addEventListener('mousemove', handleMouseMove);
      });
      
      phoneRef.current.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', handleMouseMove);
        resetPosition();
      });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.getBoundingClientRect().height;
      setContainerHeight(height);
    }
  }, [isDrawerOpen]);

  const formatUserCount = (count) => {
    return count.toLocaleString();
  };

  const renderFlipCounter = () => {
    const countStr = formatUserCount(userCount);
    const elements = [];
    let digitIndex = 0;
    
    for (let i = 0; i < countStr.length; i++) {
      const char = countStr[i];
      if (char === ',') {
        elements.push(
          <span key={`comma-${i}`} className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-nunito leading-none flex items-center h-12 sm:h-16 md:h-20">,</span>
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

  const goToPrevImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? phoneImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex => 
      (prevIndex + 1) % phoneImages.length
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-nunito">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');

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
      `}</style>

      {/* Phone Number Dialog */}
      <PhoneNumberDialog
        isOpen={showPhoneDialog}
        onClose={() => setShowPhoneDialog(false)}
        onSubmit={handlePhoneSubmit}
      />

      
      {/* Side Drawer */}
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
            {leaderboardData.map((user, index) => (
              <div 
                key={index}
                ref={index === 0 ? containerRef : null}
                className="flex items-center bg-white pl-0 pr-2 shadow-sm"
                style={{
                  borderRadius: '8px',
                  minHeight: '56px'
                }}
              >
                <img 
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="w-14 h-14 profile-image object-cover"
                  style={{ borderRadius: '8px 0 0 8px' }}
                />
                <div className="flex-1 ml-2 flex items-center">
                  <p className="text-[#4A4A4A] text-xl font-bold italic font-nunito">{user.name}</p>
                </div>
                <div className="bg-purple-500 text-white px-3 flex items-center justify-center my-auto font-nunito" style={{ borderRadius: '10px', height: '30px' }}>
                  {user.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for drawer */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={toggleDrawer}
        />
      )}

      {/* Left Side Decorative Image */}
      <img 
        src="SESH_Isotype 1.svg"
        alt="Decorative background"
        className="absolute hidden lg:block z-0 object-cover"
        style={{
          left: 'calc((100vue - 1536px) / 2 - 200px)',
          top: '30px',
          bottom: '50px',
          width: '400px'
        }}
      />

      <div className="py-4 sm:py-8 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 lg:max-w-3xl">
          <h1 className="text-purple-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nunito flex items-center">
            <i className="lg:hidden">SESH<img src="SESH_Isotype 1.svg" alt="SESH Logo" className="inline-block h-8 sm:h-10 ml-2" /></i>
            <i className="hidden lg:block">SESH</i>
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium lg:text-4xl italic font-nunito">
            the world is your oyster, go find your pearls
          </p>
        </div>

        {/* Join the Race Section */}
        <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl">
          <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4 sm:p-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <h2 className="text-[#4A4A4A] text-xl sm:text-2xl md:text-3xl font-bold font-nunito"><i>JOIN THE RACE TO 1 MILLION</i></h2>
              <div className="relative group">
                <button
                  onClick={toggleDrawer}
                  className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg p-2 sm:p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform mx-4"
                >
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                  </svg>
                </button>
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-nunito z-50">
                  referral leader board
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
            <div className="bg-purple-500 rounded-lg p-6 sm:p-8 mb-4 sm:mb-5">
              <p className="text-white text-sm sm:text-base md:text-2xl font-nunito">
                We are going to launch the next phase of the app once we hit 1 million users. Help us get there by inviting your friends, family, and neighbors to download the app through your referral code.You get your referral code in the app.
              </p>
            </div>
            <div className="flex justify-center items-center space-x-1 sm:space-x-2 min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
              {renderFlipCounter()}
            </div>
          </div>
        </div>

        {/* Mobile Phone Mockup & Features */}
        <div className="block lg:hidden mb-6 sm:mb-8">
          <div className="w-full mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
              />
              <img 
                src="google-play-badge.png"
                alt="Get it on Google Play"
                className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-48 sm:w-56 h-96 sm:h-[448px] bg-gradient-to-b from-gray-800 to-black rounded-[2rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-black rounded-[1.5rem] p-1">
                <div className="w-full h-full bg-white rounded-[1.2rem] overflow-hidden relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-10"></div>
                  <img 
                    src={phoneImages[currentImageIndex]} 
                    alt={`App screenshot ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover rounded-[1.2rem]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mb-6">
            <div className="bg-gray-200 px-3 py-3 flex items-center space-x-2 rounded-[5px]">
              <button
                onClick={goToPrevImage}
                className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
              >
                ‹
              </button>
              <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
                {phoneImages.map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
                    }`}
                    style={{ borderRadius: '5px' }}
                  >
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full" />
                  </div>
                ))}
              </div>
              <button
                onClick={goToNextImage}
                className="text-purple-500 text-2xl sm:text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
              >
                ›
              </button>
            </div>
          </div>

          <div className="bg-gray-200 rounded-xl p-4">
            <h2 className="text-black text-xl sm:text-2xl font-bold mb-3 font-nunito">{featureSteps[currentImageIndex].title}</h2>
            <div className="bg-purple-500 rounded-lg p-3">
              <p className="text-white text-sm sm:text-base font-nunito">
                {featureSteps[currentImageIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* App Store Buttons (Desktop Only) */}
        <div className="w-full mb-6 sm:mb-8 lg:max-w-3xl hidden lg:block">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <img 
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img 
              src="google-play-badge.png"
              alt="Get it on Google Play"
              className="h-12 sm:h-14 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        {/* About Us Section */}
        <div className="w-full mb-6 lg:max-w-3xl">
          <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
            <h2 className="text-[#4A4A4A] text-xl sm:text-2xl font-bold mb-3 font-nunito"><i>ABOUT US</i></h2>
            <div className="bg-purple-500 rounded-lg p-5">
              <p className="text-white text-sm sm:text-base font-nunito">
                <span className="font-bold">SESH</span>, short for "session", is part of the phrase "great <span className="font-bold">SESH</span>" and is exchanged among friends after a great hangout. we are focused on bringing people together in real life, not just online.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="block lg:hidden mt-8 pt-8 pb-6">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-gray-600 text-xs font-nunito">
            <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
            <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
            <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
            <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
            <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
            <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Desktop Elements */}
      {/* Gradient Background for iPhone */}
      <div 
        className="absolute hidden lg:block z-0"
        style={{
          top: '80px',
          right: 'calc((100vw - 1536px) / 2 + 20px)',
          width: '500px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />

      {/* Desktop iPhone Mockup */}
      <div 
        ref={phoneRef}
        className="absolute hidden lg:block cursor-pointer z-10"
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 8}deg) translateZ(0)`,
          transition: 'transform 0.2s ease-out',
          right: 'calc((100vw - 1536px) / 2 + 58px)',
          top: '80px',
          width: '280px',
          height: '500px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative">
          <div className="w-64 h-[480px] bg-gradient-to-b from-gray-800 to-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-black rounded-[2rem] p-1">
              <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>
                <img 
                  src={phoneImages[currentImageIndex]} 
                  alt={`App screenshot ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover rounded-[1.8rem]"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-6 left-2 w-1 h-6 bg-gray-600 rounded-full opacity-80"></div>
          <div className="absolute top-16 left-2 w-1 h-10 bg-gray-600 rounded-full opacity-80"></div>
          <div className="absolute top-16 right-2 w-1 h-16 bg-gray-600 rounded-full opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 rounded-[2.5rem] pointer-events-none"></div>
        </div>
      </div>

      {/* Desktop Carousel Navigation */}
      <div 
        className="absolute hidden lg:block z-10"
        style={{ 
          right: 'calc((100vw - 1536px) / 2 + 58px)',
          top: '580px',
          width: '280px'
        }}
      >
        <div className="flex justify-center items-center">
          <div style={{ backgroundColor: '#EFEFEF' }} className="px-4 py-4 flex items-center space-x-3 rounded-[5px]">
            <button
              onClick={goToPrevImage}
              className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
            >
              ‹
            </button>
            <div className="flex items-center overflow-hidden bg-purple-500 rounded-lg" style={{ borderRadius: '5px' }}>
              {phoneImages.map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center px-4 py-2 transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-purple-800 rounded-lg' : 'bg-purple-500'
                  }`}
                  style={{ borderRadius: '5px' }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ))}
            </div>
            <button
              onClick={goToNextImage}
              className="text-purple-500 text-3xl font-bold hover:text-purple-600 transition-colors font-nunito"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Feature Steps Section */}
      <div 
        className="absolute hidden lg:block z-10" 
        style={{ 
          top: '670px',
          right: 'calc((100vw - 1536px) / 2 + 58px)',
          width: '280px'
        }}
      >
        <div style={{ backgroundColor: '#EFEFEF' }} className="rounded-xl p-4">
          <h2 className="text-[#4A4A4A] text-2xl font-bold mb-3 font-nunito"><i>{featureSteps[currentImageIndex].title}</i></h2>
          <div className="bg-purple-500 rounded-lg p-3">
            <p className="text-white text-lg font-nunito">
              {featureSteps[currentImageIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-8 right-4 sm:right-8 hidden lg:flex items-center">
        <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-gray-600 text-xs sm:text-sm font-nunito">
          <a href="#" className="hover:text-purple-500 transition duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-purple-500 transition duration-300">Contact</a>
          <a href="#" className="hover:text-purple-500 transition duration-300">Facebook</a>
          <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
          <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
          <a href="#" className="hover:text-purple-500 transition duration-300">TikTok</a>
          <a href="#" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default App;