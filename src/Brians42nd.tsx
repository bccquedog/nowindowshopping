import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { 
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaUsers,
  FaCrown,
  FaStar,
  FaPlay,
  FaPause,
  FaBullseye,
  FaCircleQuestion
} from 'react-icons/fa6';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Brians42nd: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [guestCount, setGuestCount] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [rsvp, setRsvp] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    kids: 0
  });

  // Photo gallery data - All 46 actual usable images from the folder
  const photos = [
    { src: '/assets/bdayphototos/IMG_6220.JPG', alt: 'Proc classic birthday', delay: 0 },
    { src: '/assets/bdayphototos/IMG_6371.JPG', alt: 'Proc birthday memories', delay: 0.5 },
    { src: '/assets/bdayphototos/IMG_6923.JPG', alt: 'Proc birthday joy', delay: 1 },
    { src: '/assets/bdayphototos/IMG_7958.JPG', alt: 'Proc birthday special', delay: 1.5 },
    { src: '/assets/bdayphototos/IMG_9093.JPG', alt: 'Proc birthday fun', delay: 2 },
    { src: '/assets/bdayphototos/IMG_9908.JPG', alt: 'Proc birthday memories', delay: 2.5 },
    { src: '/assets/bdayphototos/IMG_9909.JPG', alt: 'Proc special moments', delay: 3 },
    { src: '/assets/bdayphototos/IMG_9910.JPG', alt: 'Proc with loved ones', delay: 3.5 },
    { src: '/assets/bdayphototos/IMG_9911.JPG', alt: 'Proc birthday joy', delay: 4 },
    { src: '/assets/bdayphototos/IMG_9912.JPG', alt: 'Proc celebration time', delay: 4.5 },
    { src: '/assets/bdayphototos/IMG_9913.JPG', alt: 'Proc happy birthday', delay: 5 },
    { src: '/assets/bdayphototos/IMG_9914.JPG', alt: 'Proc birthday fun', delay: 5.5 },
    { src: '/assets/bdayphototos/IMG_9915.JPG', alt: 'Proc celebrating', delay: 6 },
    { src: '/assets/bdayphototos/IMG_9916.JPG', alt: 'Proc with friends', delay: 6.5 },
    { src: '/assets/bdayphototos/IMG_9917.JPG', alt: 'Proc at event', delay: 7 },
    { src: '/assets/bdayphototos/IMG_9918.JPG', alt: 'Proc portrait', delay: 7.5 },
    { src: '/assets/bdayphototos/IMG_9919.JPG', alt: 'Proc candid', delay: 8 },
    { src: '/assets/bdayphototos/IMG_9920.JPG', alt: 'Proc smiling', delay: 8.5 },
    { src: '/assets/bdayphototos/IMG_9921.JPG', alt: 'Proc with group', delay: 9 },
    { src: '/assets/bdayphototos/IMG_9922.JPG', alt: 'Proc formal', delay: 9.5 },
    { src: '/assets/bdayphototos/IMG_9923.JPG', alt: 'Proc casual', delay: 10 },
    { src: '/assets/bdayphototos/IMG_9924.JPG', alt: 'Proc celebration', delay: 10.5 },
    { src: '/assets/bdayphototos/IMG_9925.JPG', alt: 'Proc with family', delay: 11 },
    { src: '/assets/bdayphototos/IMG_9926.JPG', alt: 'Proc outdoors', delay: 11.5 },
    { src: '/assets/bdayphototos/IMG_9927.JPG', alt: 'Proc professional', delay: 12 },
    { src: '/assets/bdayphototos/IMG_9928.JPG', alt: 'Proc relaxed', delay: 12.5 },
    { src: '/assets/bdayphototos/IMG_9929.JPG', alt: 'Proc happy', delay: 13 },
    { src: '/assets/bdayphototos/IMG_9930.JPG', alt: 'Proc with friends', delay: 13.5 },
    { src: '/assets/bdayphototos/IMG_9931.JPG', alt: 'Proc candid moment', delay: 14 },
    { src: '/assets/bdayphototos/IMG_9932.JPG', alt: 'Proc celebration', delay: 14.5 },
    { src: '/assets/bdayphototos/IMG_9933.JPG', alt: 'Proc with group', delay: 15 },
    { src: '/assets/bdayphototos/IMG_9934.JPG', alt: 'Proc portrait', delay: 15.5 },
    { src: '/assets/bdayphototos/IMG_9935.JPG', alt: 'Proc smiling', delay: 16 },
    { src: '/assets/bdayphototos/IMG_9936.JPG', alt: 'Proc with friends', delay: 16.5 },
    { src: '/assets/bdayphototos/IMG_9937.JPG', alt: 'Proc at event', delay: 17 },
    { src: '/assets/bdayphototos/IMG_9938.JPG', alt: 'Proc candid', delay: 17.5 },
    { src: '/assets/bdayphototos/IMG_9939.JPG', alt: 'Proc celebration', delay: 18 },
    { src: '/assets/bdayphototos/IMG_9940.JPG', alt: 'Proc with group', delay: 18.5 },
    { src: '/assets/bdayphototos/FullSizeRender.JPG', alt: 'Proc birthday highlight', delay: 19 },
    { src: '/assets/bdayphototos/IMG_3946.JPEG', alt: 'Proc birthday memories', delay: 19.5 },
    { src: '/assets/bdayphototos/IMG_3632.JPEG', alt: 'Proc celebration time', delay: 20 },
    { src: '/assets/bdayphototos/IMG_3627.JPEG', alt: 'Proc with friends', delay: 20.5 },
    { src: '/assets/bdayphototos/IMG_6680.JPEG', alt: 'Proc birthday joy', delay: 21 },
    { src: '/assets/bdayphototos/IMG_7671.JPEG', alt: 'Proc special celebration', delay: 21.5 },
    { src: '/assets/bdayphototos/IMG_5699.JPEG', alt: 'Proc birthday fun', delay: 22 },
    { src: '/assets/bdayphototos/IMG_9261.JPEG', alt: 'Proc with loved ones', delay: 22.5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate photos every 5 seconds
  useEffect(() => {
      const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
      return () => clearInterval(interval);
  }, [photos.length]);

  // Fetch guest count from Firebase
  useEffect(() => {
    const fetchGuestCount = async () => {
      try {
        const q = query(collection(db, 'brians42nd-rsvp'));
        const querySnapshot = await getDocs(q);
        let totalGuests = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.rsvp === 'yes' && data.guestInfo) {
            totalGuests += (data.guestInfo.adults || 0) + (data.guestInfo.kids || 0);
          }
        });
        
        setGuestCount(totalGuests);
      } catch (error) {
        console.error('Error fetching guest count:', error);
      }
    };

    fetchGuestCount();
  }, []);

  // Background music with persistent control
  useEffect(() => {
    console.log('Initializing audio...');
    const audio = new Audio('/assets/legend.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    setAudioRef(audio);
    
    // Set up audio event listeners
    const handlePlay = () => {
      console.log('Audio started playing');
      setIsMusicPlaying(true);
    };
    const handlePause = () => {
      console.log('Audio paused');
      setIsMusicPlaying(false);
    };
    const handleEnded = () => {
      console.log('Audio ended');
      setIsMusicPlaying(false);
    };
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsMusicPlaying(false);
    };
    const handleCanPlay = () => {
      console.log('Audio can play');
    };
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    
    // Try to play on first user interaction
    const handleFirstInteraction = () => {
      console.log('First interaction detected, attempting to play audio...');
      if (!isMusicPlaying && audio.readyState >= 2) {
        audio.play().then(() => {
          console.log('Audio play successful');
        }).catch(e => {
          console.log('Audio autoplay prevented:', e);
        });
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      console.log('Cleaning up audio...');
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Change favicon and page title for this page
  useEffect(() => {
    // Store original values
    const originalTitle = document.title;
    const originalFavicon = document.querySelector('link[rel="icon"]')?.getAttribute('href') || '/assets/logosandicons/nwsfavicon.png';
    
    // Update page title
    document.title = "Brians42nd - Proc's Birthday Kickoff | Ronnie Lott Year";
    
    // Create new favicon link for birthday page
    const birthdayFavicon = document.createElement('link');
    birthdayFavicon.rel = 'icon';
    birthdayFavicon.href = '/assets/logosandicons/favicon.png';
    birthdayFavicon.type = 'image/png';
    
    // Remove existing favicon and add birthday favicon
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }
    document.head.appendChild(birthdayFavicon);
    
    // Add Open Graph meta tags for better social sharing
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', "Brians42nd - Proc's Birthday Kickoff");
    document.head.appendChild(ogTitle);
    
    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', "Join us for an epic NFL-themed celebration as we celebrate the big 4-2! Touchdown at 42!");
    document.head.appendChild(ogDescription);
    
    const ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', '/assets/logosandicons/favicon.png');
    document.head.appendChild(ogImage);
    
    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', window.location.href);
    document.head.appendChild(ogUrl);
    
    // Add Twitter Card meta tags
    const twitterCard = document.createElement('meta');
    twitterCard.name = 'twitter:card';
    twitterCard.content = 'summary_large_image';
    document.head.appendChild(twitterCard);
    
    const twitterTitle = document.createElement('meta');
    twitterTitle.name = 'twitter:title';
    twitterTitle.content = "Brians42nd - Proc's Birthday Kickoff";
    document.head.appendChild(twitterTitle);
    
    const twitterDescription = document.createElement('meta');
    twitterDescription.name = 'twitter:description';
    twitterDescription.content = "Join us for an epic NFL-themed celebration as we celebrate the big 4-2! Touchdown at 42!";
    document.head.appendChild(twitterDescription);
    
    const twitterImage = document.createElement('meta');
    twitterImage.name = 'twitter:image';
    twitterImage.content = '/assets/logosandicons/favicon.png';
    document.head.appendChild(twitterImage);
    
    // Cleanup function to restore original values
    return () => {
      document.title = originalTitle;
      birthdayFavicon.remove();
      const restoreFavicon = document.createElement('link');
      restoreFavicon.rel = 'icon';
      restoreFavicon.href = originalFavicon;
      restoreFavicon.type = 'image/png';
      document.head.appendChild(restoreFavicon);
      
      // Remove meta tags
      [ogTitle, ogDescription, ogImage, ogUrl, twitterCard, twitterTitle, twitterDescription, twitterImage].forEach(tag => {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, []);

  const eventDate = new Date('2025-09-07T12:00:00');
  const timeUntilEvent = eventDate.getTime() - currentTime.getTime();
  const days = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntilEvent % (1000 * 60 * 60)) / (1000 * 60));

  const nflTeams = [
    { name: 'Kansas City Chiefs', color: '#E31837', secondary: '#FFB81C', logo: '/assets/NFLlogos/Kansas_City_Chiefs_logo.svg.png' },
    { name: 'San Francisco 49ers', color: '#AA0000', secondary: '#B3995D', logo: '/assets/NFLlogos/San_Francisco_49ers_logo.svg.png' },
    { name: 'Baltimore Ravens', color: '#241773', secondary: '#000000', logo: '/assets/NFLlogos/Baltimore_Ravens_logo.svg.png' },
    { name: 'Buffalo Bills', color: '#00338D', secondary: '#C60C30', logo: '/assets/NFLlogos/Buffalo_Bills_logo.png' },
    { name: 'Dallas Cowboys', color: '#003594', secondary: '#869397', logo: '/assets/NFLlogos/Dallas_Cowboys.svg.png' },
    { name: 'Green Bay Packers', color: '#203731', secondary: '#FFB612', logo: '/assets/NFLlogos/Green_Bay_Packers_logo.svg.png' },
    { name: 'New England Patriots', color: '#002244', secondary: '#C60C30', logo: '/assets/NFLlogos/New_England_Patriots_logo.svg.png' },
    { name: 'Pittsburgh Steelers', color: '#000000', secondary: '#FFB612', logo: '/assets/NFLlogos/Pittsburgh_Steelers_logo.svg.png' },
    { name: 'Seattle Seahawks', color: '#002244', secondary: '#69BE28', logo: '/assets/NFLlogos/Seattle_Seahawks_logo.svg.png' },
    { name: 'Tampa Bay Buccaneers', color: '#D50A0A', secondary: '#FF7900', logo: '/assets/NFLlogos/Tampa_Bay_Buccaneers_logo.svg.png' },
    { name: 'Denver Broncos', color: '#FB4F14', secondary: '#002244', logo: '/assets/NFLlogos/Denver_Broncos_logo.svg.png' },
    { name: 'Las Vegas Raiders', color: '#000000', secondary: '#C4C4C4', logo: '/assets/NFLlogos/Las_Vegas_Raiders_logo.svg.png' },
    { name: 'Los Angeles Chargers', color: '#0080C6', secondary: '#FFC20E', logo: '/assets/NFLlogos/NFL_Chargers_logo.svg.png' },
    { name: 'Los Angeles Rams', color: '#003594', secondary: '#FFA300', logo: '/assets/NFLlogos/NFL_Rams_logo.svg.png' },
    { name: 'Arizona Cardinals', color: '#97233F', secondary: '#000000', logo: '/assets/NFLlogos/Arizona_Cardinals_logo.svg.png' },
    { name: 'Atlanta Falcons', color: '#A71930', secondary: '#000000', logo: '/assets/NFLlogos/Atlanta_Falcons_logo.svg.png' },
    { name: 'Carolina Panthers', color: '#0085CA', secondary: '#101820', logo: '/assets/NFLlogos/Carolina_Panthers_logo.svg.png' },
    { name: 'Chicago Bears', color: '#0B162A', secondary: '#C83803', logo: '/assets/NFLlogos/Chicago_Bears_logo.svg.png' },
    { name: 'Cincinnati Bengals', color: '#FB4F14', secondary: '#000000', logo: '/assets/NFLlogos/Cincinnati_Bengals_logo.svg.png' },
    { name: 'Cleveland Browns', color: '#311D00', secondary: '#FF3C00', logo: '/assets/NFLlogos/Cleveland_Browns_logo.svg.png' },
    { name: 'Detroit Lions', color: '#0076B6', secondary: '#B0B7BC', logo: '/assets/NFLlogos/Detroit_Lions_logo.svg.png' },
    { name: 'Houston Texans', color: '#03202F', secondary: '#A71930', logo: '/assets/NFLlogos/Houston_Texans_logo.svg.png' },
    { name: 'Indianapolis Colts', color: '#002C5F', secondary: '#A2AAAD', logo: '/assets/NFLlogos/Indianapolis_Colts_logo.svg.png' },
    { name: 'Jacksonville Jaguars', color: '#006778', secondary: '#D7A22A', logo: '/assets/NFLlogos/Jacksonville_Jaguars_logo.svg.png' },
    { name: 'Miami Dolphins', color: '#008E97', secondary: '#FC4C02', logo: '/assets/NFLlogos/Miami_Dolphins_logo.svg.png' },
    { name: 'Minnesota Vikings', color: '#4F2683', secondary: '#FFC62F', logo: '/assets/NFLlogos/Minnesota_Vikings_logo.svg.png' },
    { name: 'New Orleans Saints', color: '#D3BC8D', secondary: '#000000', logo: '/assets/NFLlogos/New_Orleans_Saints_logo.svg.png' },
    { name: 'New York Giants', color: '#0B2265', secondary: '#A71930', logo: '/assets/NFLlogos/New_York_Giants_logo.svg.png' },
    { name: 'New York Jets', color: '#125740', secondary: '#000000', logo: '/assets/NFLlogos/New_York_Jets_logo.svg.png' },
    { name: 'Philadelphia Eagles', color: '#004C54', secondary: '#A5ACAF', logo: '/assets/NFLlogos/Philadelphia_Eagles_logo.svg.png' },
    { name: 'Tennessee Titans', color: '#0C2340', secondary: '#4B92DB', logo: '/assets/NFLlogos/Tennessee_Titans_logo.svg.png' },
    { name: 'Washington Commanders', color: '#5A1414', secondary: '#FFB612', logo: '/assets/NFLlogos/Washington_Commanders_logo.svg.png' }
  ];

  // Find Ravens index
  const ravensIndex = nflTeams.findIndex(team => team.name === 'Baltimore Ravens');
  const [currentTeamIndex, setCurrentTeamIndex] = useState(ravensIndex);
  const [isRavensFirst, setIsRavensFirst] = useState(true);

  // Auto-rotate teams with special timing for Ravens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamIndex(prevIndex => {
        if (isRavensFirst && prevIndex === ravensIndex) {
          // After Ravens, move to next team
          setIsRavensFirst(false);
          return (ravensIndex + 1) % nflTeams.length;
        } else {
          // Regular rotation for other teams
          return (prevIndex + 1) % nflTeams.length;
        }
      });
    }, isRavensFirst && currentTeamIndex === ravensIndex ? 5000 : 2000);
    
    return () => clearInterval(interval);
  }, [isRavensFirst, currentTeamIndex, ravensIndex]);

  const randomTeam = nflTeams[currentTeamIndex];

  const handleRsvp = (response: string) => {
    setRsvp(response);
  };

  // Calendar event functions for the birthday party
  const getBirthdayEventTitle = () => "Proc's 42nd Birthday Kickoff";
  const getBirthdayEventDescription = () => "Join us for an epic NFL-themed celebration as we celebrate the big 4-2! Wear attire from your favorite team as we start the season and kick-off year 42 surrounded by family and friends.";
  const getBirthdayEventStart = () => new Date('2024-09-08T18:00:00'); // September 8th, 2024 at 6 PM
  const getBirthdayEventEnd = () => new Date('2024-09-08T23:00:00'); // September 8th, 2024 at 11 PM
  
  const getGoogleCalendarUrl = () => {
    const start = getBirthdayEventStart();
    const end = getBirthdayEventEnd();
    const format = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(getBirthdayEventTitle())}&dates=${format(start)}/${format(end)}&details=${encodeURIComponent(getBirthdayEventDescription())}&location=8308%20Aletta%20Pl%2C%20Severn%2C%20MD%2021144&sf=true&output=xml`;
  };
  
  const getICS = () => {
    const start = getBirthdayEventStart();
    const end = getBirthdayEventEnd();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const format = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
    return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${getBirthdayEventTitle()}\nDESCRIPTION:${getBirthdayEventDescription()}\nDTSTART:${format(start)}\nDTEND:${format(end)}\nLOCATION:8308 Aletta Pl, Severn, MD 21144\nEND:VEVENT\nEND:VCALENDAR`;
  };
  
  const downloadICS = () => {
    const ics = getICS();
    const blob = new Blob([ics.replace(/\\n/g, '\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'procs-birthday.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShowRsvpForm = () => {
    // Scroll to the RSVP section
    const rsvpSection = document.getElementById('rsvp-section');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvp === 'yes' && (!guestInfo.name || !guestInfo.email)) {
      setError('Please provide your name and email.');
      return;
    }
    
    try {
      // Save RSVP response to Firebase
      await addDoc(collection(db, 'brians42nd-rsvp'), {
        rsvp: rsvp,
        guestInfo: guestInfo,
        createdAt: serverTimestamp(),
      });
      
      setSubmitted(true);
      setShowConfetti(true);
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Error saving RSVP:', error);
      setError('There was an error saving your RSVP. Please try again.');
    }
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-slate-800/90 to-blue-800/90 backdrop-blur-sm border-b border-blue-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/hub"
              className="p-3 rounded-xl bg-blue-600/20 text-white hover:bg-blue-500/30 transition-all duration-300 border border-blue-400/30"
            >
              <FaArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Proc's Birthday Kickoff
              </h1>
              <p className="text-blue-200/80 text-lg">Ronnie Lott Year</p>
        </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (audioRef) {
                  if (isMusicPlaying) {
                    console.log('Pausing audio...');
                    audioRef.pause();
                  } else {
                    console.log('Playing audio...');
                    audioRef.play().then(() => {
                      console.log('Audio play successful from button');
                    }).catch(e => {
                      console.error('Audio play failed from button:', e);
                    });
                  }
                } else {
                  console.error('Audio reference not available');
                }
              }}
              className="p-3 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300"
              title={isMusicPlaying ? "Pause Music" : "Play Music"}
            >
              {isMusicPlaying ? (
                <FaPause className="w-5 h-5" />
              ) : (
                <FaPlay className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/50 to-slate-800/50 backdrop-blur-sm border border-blue-500/30 p-8 mb-8"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                    <FaCrown className="w-6 h-6 text-white" />
          </div>
                  <span className="text-yellow-400 font-semibold text-lg">Championship Celebration</span>
          </div>
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-yellow-300 bg-clip-text text-transparent">
                  Touchdown at 42!
                </h2>
                <p className="text-xl text-blue-200/90 mb-6 leading-relaxed">
                  Join us for an epic NFL-themed celebration as we celebrate the big 4-2! 
                  Wear attire from your favorite team as we start the season and kick-off year 42 surrounded by family and friends.
                </p>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShowRsvpForm}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-bold text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                  >
                    <FaCalendar className="inline w-5 h-5 mr-2" />
                    RSVP Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(getGoogleCalendarUrl(), '_blank')}
                    className="px-8 py-4 bg-slate-700/50 border border-slate-600/30 rounded-xl font-bold text-white hover:bg-slate-600/50 transition-all duration-300"
                  >
                    <FaCalendar className="inline w-5 h-5 mr-2" />
                    Add to Calendar
                  </motion.button>
                </div>
              </div>
              <div className="relative">
                <div className="relative">
                  <div 
                    className="w-full h-64 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${randomTeam.color}, ${randomTeam.secondary})` }}
                  >
                    <motion.img 
                      key={randomTeam.name}
                      src={randomTeam.logo} 
                      alt={`${randomTeam.name} logo`}
                      className="w-32 h-32 object-contain opacity-80"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-xl">{randomTeam.name}</div>
                    <div className="text-white/80 text-sm">Featured Team</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-red-300 mb-2">{days}</div>
              <div className="text-red-200/80">Days</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">{hours}</div>
              <div className="text-blue-200/80">Hours</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-green-300 mb-2">{minutes}</div>
              <div className="text-green-200/80">Minutes</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">42</div>
              <div className="text-yellow-200/80">Years Young</div>
            </div>
          </motion.div>

          {/* Featured Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-white mb-2">The Journey to 42</h3>
              <p className="text-blue-200/80">A collection of moments that shaped the legend</p>
        </div>

        {/* Featured Photo */}
            <div className="relative aspect-[16/9] max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-600 to-slate-800 mb-6">
          <img
            src={photos[currentPhotoIndex]?.src}
            alt={photos[currentPhotoIndex]?.alt}
            className="w-full h-full object-cover transition-all duration-1000"
                style={{ backgroundColor: 'rgba(15, 17, 21, 0.8)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                onClick={() => setShowPhotoModal(true)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm"
              >
                    <FaStar className="inline w-3 h-3 mr-1" />
                View All Photos
                  </motion.button>
              <div className="flex space-x-1">
                {photos.slice(0, 6).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 cursor-pointer ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Photo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {Array.from({ length: 12 }).map((_, index) => {
            // Calculate which photo to show for this grid position with staggered timing
            const photoIndex = (currentPhotoIndex + index * 3) % photos.length;
            const photo = photos[photoIndex];
            
            return (
              <motion.div
                key={`grid-${index}-${photoIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.05, // Faster staggered effect
                  duration: 0.3
                }}
              className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                  setCurrentPhotoIndex(photoIndex);
                setShowPhotoModal(true);
              }}
            >
                <div className="aspect-square rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-blue-600 to-slate-800">
                  <motion.img
                    key={photoIndex} // Force re-render when photo changes
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: 'rgba(15, 17, 21, 0.8)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-lg"></div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FaStar className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

          </motion.div>

          {/* Event Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <FaCalendar className="w-6 h-6 mr-3 text-blue-400" />
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-400/30">
                    <FaClock className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Sunday, September 7, 2025</div>
                    <div className="text-blue-200/80">12:00 PM - 8:00 PM</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-400/30">
                    <FaUsers className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Guest Count</div>
                    <div className="text-purple-200/80">{guestCount} confirmed guests</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8"
            >

              <div className="space-y-4">
                                 <div className="flex items-start space-x-3">
                   <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                   <div>
                     <div className="font-semibold text-white">NFL Game Viewing</div>
                     <div className="text-blue-200/80">Multiple screens showing live games with full NFL Sunday Ticket streaming access - catch every touchdown, every play, and every moment of NFL Week 1 action</div>
                   </div>
                 </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-white">Food, Drinks, Games</div>
                    <div className="text-green-200/80">And back by popular demand, Severn Tea; the original recipe. Plus, bring your best singing voice for karaoke showdowns! 🎤</div>
                  </div>
                </div>

            </div>
            </motion.div>
        </div>

        {/* RSVP Section */}
          <motion.div
            id="rsvp-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-white">Are You Coming? <FaBullseye className="inline text-red-500" /></h3>
            
            {!submitted ? (
              <>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 ${
                  rsvp==='yes'?'bg-green-600 border-green-400 shadow-lg':'bg-white/10 border-white/20 hover:bg-green-600/20'
                }`} 
                onClick={() => handleRsvp('yes')}
              >
                <FaStar className="inline mr-2" /> I'm Owt (Yes)
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 ${
                  rsvp==='maybe'?'bg-yellow-500 border-yellow-300 shadow-lg':'bg-white/10 border-white/20 hover:bg-yellow-500/20'
                }`} 
                onClick={() => handleRsvp('maybe')}
              >
                <FaCircleQuestion className="inline mr-2" /> Maybe
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 ${
                  rsvp==='no'?'bg-gray-600 border-gray-400 shadow-lg':'bg-white/10 border-white/20 hover:bg-gray-600/20'
                }`} 
                onClick={() => handleRsvp('no')}
              >
                <FaCrown className="inline mr-2" /> I'm Cat (Can't Make It)
                  </motion.button>
            </div>

            {rsvp === 'yes' && (
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl mb-6 border border-green-400/30">
                    <p className="text-xl font-semibold mb-3 text-white"><FaStar className="inline mr-2" /> The Party Spot:</p>
                    <p className="text-lg text-white"><strong>Château de la Proc</strong></p>
                    <p className="text-lg text-white">8308 Aletta Pl, Severn, MD 21144</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                  onClick={() => {
                    // Try to open in user's default map app first
                    const address = '8308 Aletta Pl, Severn, MD 21144';
                    const encodedAddress = encodeURIComponent(address);
                    
                    // Universal map link that works across devices
                    const mapUrl = `https://maps.apple.com/?q=${encodedAddress}`;
                    
                    // Fallback to Google Maps if Apple Maps doesn't work
                    const googleMapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
                    
                    // Try to open Apple Maps first (works on iOS/Mac), fallback to Google Maps
                    window.open(mapUrl, '_blank');
                  }}
                >
                  <FaCalendar className="inline mr-2" /> Get Directions
                    </motion.button>
              </div>
            )}

                                {rsvp && !submitted && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    {rsvp === 'yes' ? 'Who\'s Rolling Through?' : 'Contact Information'} <FaUsers className="text-champagne" />
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 rounded-lg text-black"
                        value={guestInfo.name}
                        onChange={e => setGuestInfo({...guestInfo, name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 rounded-lg text-black"
                        value={guestInfo.email}
                        onChange={e => setGuestInfo({...guestInfo, email: e.target.value})}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-3 rounded-lg text-black"
                      value={guestInfo.phone}
                      onChange={e => setGuestInfo({...guestInfo, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  {rsvp === 'yes' && (
                    <>
                      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaStar className="text-green-400" />
                          <span className="text-green-300 font-semibold">Welcome to Bring!</span>
                        </div>
                        <p className="text-white/90 text-sm">
                          Feel free to bring a drink, bottle, or dish (pre-approved). We'd love to share in the celebration together!
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                            How Many Grown-Ups? <FaUsers className="text-champagne" />
                          </label>
                          <p className="text-sm text-white/70 mb-2">(including you)</p>
                          <select
                            className="w-full p-3 rounded-lg text-black"
                            value={guestInfo.adults}
                            onChange={e => setGuestInfo({...guestInfo, adults: parseInt(e.target.value)})}
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                            How Many Little Ones? <FaStar className="text-champagne" />
                          </label>
                          <select
                            className="w-full p-3 rounded-lg text-black"
                            value={guestInfo.kids}
                            onChange={e => setGuestInfo({...guestInfo, kids: parseInt(e.target.value)})}
                          >
                            {[0, 1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                >
                                      <FaStar className="inline mr-2" /> Send RSVP
                </motion.button>
              </form>
            )}

                {error && <div className="text-red-400 mt-4 text-center animate-pulse">{error}</div>}
                
                {/* Calendar Download Options */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <FaCalendar className="text-blue-400" />
                    Add to Your Calendar
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(getGoogleCalendarUrl(), '_blank')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCalendar className="w-4 h-4" />
                      Google Calendar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadICS}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCalendar className="w-4 h-4" />
                      Download (.ics)
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce"><FaStar className="text-yellow-400" /></div>
                <div className="text-green-400 font-bold text-2xl mb-2 animate-pulse">
                  {rsvp === 'yes' ? 'You\'re In! 🎊' : 'Thanks for letting us know! 💙'}
                </div>
                <div className="text-white/80 text-lg">
                  {rsvp === 'yes' 
                    ? `Can't wait to celebrate with you${guestInfo.name ? `, ${guestInfo.name}` : ''}!` 
                    : 'We\'ll miss you, but thanks for the RSVP!'
                  }
                </div>
              </div>
            )}
          </motion.div>
        </div>
          </div>
          
      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={photos[currentPhotoIndex]?.src}
              alt={photos[currentPhotoIndex]?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors z-10"
            >
              <FaStar className="w-6 h-6" />
            </motion.button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentPhotoIndex(index)}
                />
              ))}
            </div>
            {/* Navigation arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors z-10"
            >
              <FaArrowLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors z-10"
            >
              <FaArrowLeft className="w-6 h-6 rotate-180" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][Math.floor(Math.random() * 5)]
              }`}></div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Brians42nd; 