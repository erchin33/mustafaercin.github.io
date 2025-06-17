"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Modal, Nav, Tab, Badge, Spinner } from "react-bootstrap";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { FaSave, FaTrash, FaEdit, FaEye, FaPlus, FaSearch, FaFilter, FaSort, FaUndo, FaRedo, FaLink, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaTelegram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaFileAlt, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { SiArtstation } from 'react-icons/si';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  order: number;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  video?: string;
  github?: string;
  demo?: string;
}

interface Skill {
  id: string;
  name: string;
  percentage: number;
  color: string;
  order: number;
  isActive: boolean;
}

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description: string;
}

interface Theme {
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    dark: string;
    light: string;
    gradientStart: string;
    gradientEnd: string;
    cardBg: string;
    cardBorder: string;
    textMuted: string;
  };
}

interface Backup {
  id: string;
  timestamp: string;
  data: any;
}

interface Button {
  id: string;
  name: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  customIconUrl?: string;
}

// AdminCard bileşenini dışarı taşıyoruz
const AdminCard = ({ 
  title, 
  children, 
  cardKey, 
  state, 
  onMinimize, 
  onMaximize 
}: { 
  title: string; 
  children: React.ReactNode; 
  cardKey: string;
  state: { isMinimized: boolean; isMaximized: boolean };
  onMinimize: () => void;
  onMaximize: () => void;
}) => {
  return (
    <Card className={`mb-4 ${state.isMaximized ? 'position-fixed top-0 start-0 w-100 h-100 m-0' : ''}`} 
          style={{ 
            zIndex: state.isMaximized ? 1050 : 1,
            transition: 'all 0.3s ease',
            height: state.isMinimized ? 'auto' : 'auto'
          }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={onMinimize}
          >
            {state.isMinimized ? '🔽' : '🔼'}
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={onMaximize}
          >
            {state.isMaximized ? '⤵️' : '⤴️'}
          </Button>
        </div>
      </Card.Header>
      <Card.Body style={{ display: state.isMinimized ? 'none' : 'block' }}>
        {children}
      </Card.Body>
    </Card>
  );
};

export default function AdminPanel() {
  const router = useRouter();
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Content states
  const [heroText, setHeroText] = useState({
    name: "Mustafa ERCİN",
    titles: ["Game Designer", "Level Designer"]
  });
  const [pageTitle, setPageTitle] = useState("Mustafa Erçin - Game & Level Designer");
  const [copyrightText, setCopyrightText] = useState("© 2025 Mustafa Erçin. All rights reserved.");
  const [aboutText, setAboutText] = useState({
    paragraph1: "I graduated with a degree in Game Design, with a strong foundation in game mechanics, user experience, and creative game development. I possess experience in analyzing KPIs and conducting market research to inform game development.",
    paragraph2: "As a quick learner and dedicated team player, I am eager to apply my skills to contribute innovative ideas and collaborate within a dynamic team. Committed to continuous growth in the game design field, I am passionate about creating engaging and immersive gaming experiences. While my expertise spans various areas, my primary focus has been in level design, where I have developed a strong ability to craft engaging, balanced, and immersive game levels."
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  // UI states
  const [contactInfo, setContactInfo] = useState({
    email: "mustafaercin@gmail.com",
    phone: "+905340180861",
    linkedin: "https://linkedin.com/in/mustafa-ercin",
    github: "https://github.com/erchin33"
  });
  const [profileImage, setProfileImage] = useState("/me.jpeg");
  const [scrollIndicator, setScrollIndicator] = useState({
    enabled: true,
    color: "#007bff",
    size: "2rem"
  });
  const [logoText, setLogoText] = useState("BH");
  const [logoColors, setLogoColors] = useState({
    start: "#007bff",
    end: "#00ff88"
  });
  const [colorPalette, setColorPalette] = useState({
    primary: "#6366f1",
    primaryHover: "#818cf8",
    dark: "#0f172a",
    light: "#ffffff",
    gradientStart: "rgba(15, 23, 42, 0.95)",
    gradientEnd: "rgba(99, 102, 241, 0.1)",
    cardBg: "rgba(15, 23, 42, 0.7)",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    textMuted: "rgba(255, 255, 255, 0.7)"
  });

  // Admin panel states
  const [isLoading, setIsLoading] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("default");
  const [backups, setBackups] = useState<Backup[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [autoSave, setAutoSave] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: string; message: string; onConfirm: () => void } | null>(null);
  const [adminPageTitle, setAdminPageTitle] = useState("Admin Panel - Portfolio Manager");
  const [cardStates, setCardStates] = useState<{ [key: string]: { isMinimized: boolean; isMaximized: boolean } }>({
    about: { isMinimized: false, isMaximized: false },
    skills: { isMinimized: false, isMaximized: false },
    projects: { isMinimized: false, isMaximized: false },
    workExperience: { isMinimized: false, isMaximized: false },
    education: { isMinimized: false, isMaximized: false },
    buttons: { isMinimized: false, isMaximized: false },
    pageSettings: { isMinimized: false, isMaximized: false },
    hero: { isMinimized: false, isMaximized: false },
    contact: { isMinimized: false, isMaximized: false },
    logo: { isMinimized: false, isMaximized: false },
  });

  // Add state for original data
  const [originalData, setOriginalData] = useState<any>(null);

  // Button management states
  const [buttons, setButtons] = useState<Button[]>([
    {
      id: '1',
      name: 'GitHub',
      url: 'https://github.com/mustafaercin',
      icon: 'FaGithub',
      order: 1,
      isActive: true
    },
    {
      id: '2',
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mustafaercin',
      icon: 'FaLinkedin',
      order: 2,
      isActive: true
    }
  ]);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaDiscord,
    FaTelegram,
    FaWhatsapp,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGlobe,
    FaFileAlt,
    FaDownload,
    FaExternalLinkAlt,
    SiArtstation
  };

  // Admin şifresi - gerçek uygulamada bu değer güvenli bir şekilde saklanmalıdır
  const ADMIN_PASSWORD = "admin123";

  // Save changes to localStorage and create backup if auto-save is enabled
  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const data = {
        heroText,
        pageTitle,
        copyrightText,
        aboutText,
        projects,
        skills,
        contactInfo,
        profileImage,
        scrollIndicator,
        colorPalette,
        logoText,
        logoColors,
        workExperience,
        education
      };
      
      // Save current state to undo stack
      setUndoStack([...undoStack, data]);
      setRedoStack([]); // Clear redo stack when new changes are made
      
      // Save main data
      localStorage.setItem('portfolioData', JSON.stringify(data));
      
      // Save buttons separately
      localStorage.setItem('portfolioButtons', JSON.stringify(buttons));
      
      setLastSaved(new Date().toLocaleTimeString());
      
      if (autoSave) {
        createBackup();
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Changes saved successfully!');
    } catch (error) {
      alert('Error saving changes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      // Giriş yapıldığında otomatik kaydetmeye gerek yok
    } else {
      setError("Incorrect password");
    }
  };

  const toggleMinimize = (key: string) => {
    setCardStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        isMinimized: !prev[key].isMinimized,
        isMaximized: false
      }
    }));
  };

  const toggleMaximize = (key: string) => {
    setCardStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        isMaximized: !prev[key].isMaximized,
        isMinimized: false
      }
    }));
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    const savedButtons = localStorage.getItem('portfolioButtons');
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setOriginalData(data); // Store original data
        setHeroText(data.heroText || heroText);
        setPageTitle(data.pageTitle || pageTitle);
        setCopyrightText(data.copyrightText || copyrightText);
        setAboutText(data.aboutText || aboutText);
        setProjects(data.projects || []);
        setSkills(data.skills || []);
        setContactInfo(data.contactInfo || contactInfo);
        setProfileImage(data.profileImage || profileImage);
        setScrollIndicator(data.scrollIndicator || scrollIndicator);
        setColorPalette(data.colorPalette || colorPalette);
        setLogoText(data.logoText || logoText);
        setLogoColors(data.logoColors || logoColors);
        setWorkExperience(data.workExperience || []);
        setEducation(data.education || []);
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }

    if (savedButtons) {
      try {
        const parsedButtons = JSON.parse(savedButtons);
        setButtons(parsedButtons);
      } catch (error) {
        console.error('Error parsing saved buttons:', error);
        setButtons([]);
      }
    }
  }, [isAuthenticated]);

  // Save buttons whenever they change (if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('portfolioButtons', JSON.stringify(buttons));
    }
  }, [buttons, isAuthenticated]);

  // Load backups on mount
  useEffect(() => {
    const savedBackups = localStorage.getItem('portfolioBackups');
    if (savedBackups) {
      setBackups(JSON.parse(savedBackups));
    }
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (autoSave) {
      // Clear any existing interval
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }

      // Set up new interval
      const interval = setInterval(() => {
        saveChanges();
      }, 10000); // Auto-save every 10 seconds

      setAutoSaveInterval(interval);

      // Cleanup function
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    } else {
      // Clear interval if auto-save is disabled
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        setAutoSaveInterval(null);
      }
    }
  }, [autoSave]);

  // Button management functions
  const addButton = () => {
    const newButton: Button = {
      id: Date.now().toString(),
      name: "New Button",
      url: "#",
      icon: "FaExternalLinkAlt",
      order: buttons.length + 1,
      isActive: true
    };
    const updatedButtons = [...buttons, newButton];
    setButtons(updatedButtons);
    localStorage.setItem('portfolioButtons', JSON.stringify(updatedButtons));
  };

  const removeButton = (id: string) => {
    const updatedButtons = buttons.filter(button => button.id !== id);
    setButtons(updatedButtons);
    localStorage.setItem('portfolioButtons', JSON.stringify(updatedButtons));
  };

  const updateButton = (id: string, field: keyof Button, value: any) => {
    const updatedButtons = buttons.map(button => 
      button.id === id ? { ...button, [field]: value } : button
    );
    setButtons(updatedButtons);
    localStorage.setItem('portfolioButtons', JSON.stringify(updatedButtons));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(buttons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setButtons(updatedItems);
    localStorage.setItem('portfolioButtons', JSON.stringify(updatedItems));
  };

  // Auto-detect icon based on button name
  const detectIcon = (name: string, url: string): string => {
    const lowerName = name.toLowerCase();
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('github.com')) return 'FaGithub';
    if (lowerUrl.includes('linkedin.com')) return 'FaLinkedin';
    if (lowerUrl.includes('twitter.com')) return 'FaTwitter';
    if (lowerUrl.includes('instagram.com')) return 'FaInstagram';
    if (lowerUrl.includes('youtube.com')) return 'FaYoutube';
    if (lowerUrl.includes('discord.com')) return 'FaDiscord';
    if (lowerUrl.includes('t.me')) return 'FaTelegram';
    if (lowerUrl.includes('wa.me')) return 'FaWhatsapp';
    if (lowerName.includes('mail') || lowerUrl.includes('mailto:')) return 'FaEnvelope';
    if (lowerName.includes('phone') || lowerUrl.includes('tel:')) return 'FaPhone';
    if (lowerName.includes('location') || lowerName.includes('address')) return 'FaMapMarkerAlt';
    if (lowerName.includes('website') || lowerName.includes('site')) return 'FaGlobe';
    if (lowerName.includes('resume') || lowerName.includes('cv')) return 'FaFileAlt';
    if (lowerName.includes('download')) return 'FaDownload';
    if (lowerUrl.includes('artstation.com')) return 'SiArtstation';
    
    return 'FaExternalLinkAlt';
  };

  // Update icon when name or url changes
  useEffect(() => {
    setButtons(buttons.map(button => ({
      ...button,
      icon: detectIcon(button.name, button.url)
    })));
  }, [buttons.map(b => b.name).join(), buttons.map(b => b.url).join()]);

  // Preview Modal
  const [previewData, setPreviewData] = useState<any>(null);

  const updatePreview = () => {
    const currentData = {
      heroText,
      pageTitle,
      copyrightText,
      aboutText,
      projects,
      skills,
      contactInfo,
      profileImage,
      scrollIndicator,
      colorPalette,
      logoText,
      logoColors,
      workExperience,
      education,
      buttons
    };
    setPreviewData(currentData);
  };

  // Update preview when data changes
  useEffect(() => {
    if (showPreviewModal) {
      updatePreview();
    }
  }, [
    showPreviewModal,
    heroText,
    pageTitle,
    copyrightText,
    aboutText,
    projects,
    skills,
    contactInfo,
    profileImage,
    scrollIndicator,
    colorPalette,
    logoText,
    logoColors,
    workExperience,
    education,
    buttons
  ]);

  // Discard changes function
  const discardChanges = () => {
    if (!originalData) return;

    setConfirmAction({
      type: 'discard',
      message: 'Are you sure you want to discard all changes? This action cannot be undone.',
      onConfirm: () => {
        setHeroText(originalData.heroText);
        setPageTitle(originalData.pageTitle);
        setCopyrightText(originalData.copyrightText);
        setAboutText(originalData.aboutText);
        setProjects(originalData.projects);
        setSkills(originalData.skills);
        setContactInfo(originalData.contactInfo);
        setProfileImage(originalData.profileImage);
        setScrollIndicator(originalData.scrollIndicator);
        setColorPalette(originalData.colorPalette);
        setLogoText(originalData.logoText);
        setLogoColors(originalData.logoColors);
        setWorkExperience(originalData.workExperience);
        setEducation(originalData.education);
        // Note: We don't discard button changes here as they are saved separately
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  // Update page title when adminPageTitle changes
  useEffect(() => {
    document.title = adminPageTitle;
  }, [adminPageTitle]);

  // Tema seçenekleri
  const themes: { [key: string]: Theme } = {
    default: {
      name: "Default",
      colors: {
        primary: "#6366f1",
        primaryHover: "#818cf8",
        dark: "#0f172a",
        light: "#ffffff",
        gradientStart: "rgba(15, 23, 42, 0.95)",
        gradientEnd: "rgba(99, 102, 241, 0.1)",
        cardBg: "rgba(15, 23, 42, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.1)",
        textMuted: "rgba(255, 255, 255, 0.7)"
      }
    },
    ocean: {
      name: "Ocean",
      colors: {
        primary: "#0891b2",
        primaryHover: "#06b6d4",
        dark: "#0e7490",
        light: "#ffffff",
        gradientStart: "rgba(14, 116, 144, 0.95)",
        gradientEnd: "rgba(8, 145, 178, 0.1)",
        cardBg: "rgba(14, 116, 144, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.1)",
        textMuted: "rgba(255, 255, 255, 0.7)"
      }
    },
    forest: {
      name: "Forest",
      colors: {
        primary: "#059669",
        primaryHover: "#10b981",
        dark: "#065f46",
        light: "#ffffff",
        gradientStart: "rgba(6, 95, 70, 0.95)",
        gradientEnd: "rgba(5, 150, 105, 0.1)",
        cardBg: "rgba(6, 95, 70, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.1)",
        textMuted: "rgba(255, 255, 255, 0.7)"
      }
    }
  };

  // Yeni fonksiyonlar
  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    setColorPalette(themes[themeName].colors);
  };

  const createBackup = () => {
    const backup: Backup = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      data: {
        heroText,
        pageTitle,
        copyrightText,
        aboutText,
        projects,
        skills,
        contactInfo,
        profileImage,
        scrollIndicator,
        colorPalette,
        logoText,
        logoColors,
        workExperience,
        education,
        buttons
      }
    };
    setBackups([...backups, backup]);
    localStorage.setItem('portfolioBackups', JSON.stringify([...backups, backup]));
  };

  const restoreBackup = (backup: Backup) => {
    setConfirmAction({
      type: 'restore',
      message: 'Are you sure you want to restore this backup? All current changes will be lost.',
      onConfirm: () => {
        const data = backup.data;
        setHeroText(data.heroText);
        setPageTitle(data.pageTitle);
        setCopyrightText(data.copyrightText);
        setAboutText(data.aboutText);
        setProjects(data.projects);
        setSkills(data.skills);
        setContactInfo(data.contactInfo);
        setProfileImage(data.profileImage);
        setScrollIndicator(data.scrollIndicator);
        setColorPalette(data.colorPalette);
        setLogoText(data.logoText);
        setLogoColors(data.logoColors);
        setWorkExperience(data.workExperience);
        setEducation(data.education);
        setButtons(data.buttons || []);
        setShowBackupModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const currentState = {
        heroText,
        pageTitle,
        copyrightText,
        aboutText,
        projects,
        skills,
        contactInfo,
        profileImage,
        scrollIndicator,
        colorPalette,
        logoText,
        logoColors,
        workExperience,
        education
      };
      setRedoStack([...redoStack, currentState]);
      const previousState = undoStack[undoStack.length - 1];
      setUndoStack(undoStack.slice(0, -1));
      // Restore previous state
      setHeroText(previousState.heroText);
      setPageTitle(previousState.pageTitle);
      setCopyrightText(previousState.copyrightText);
      setAboutText(previousState.aboutText);
      setProjects(previousState.projects);
      setSkills(previousState.skills);
      setContactInfo(previousState.contactInfo);
      setProfileImage(previousState.profileImage);
      setScrollIndicator(previousState.scrollIndicator);
      setColorPalette(previousState.colorPalette);
      setLogoText(previousState.logoText);
      setLogoColors(previousState.logoColors);
      setWorkExperience(previousState.workExperience);
      setEducation(previousState.education);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const currentState = {
        heroText,
        pageTitle,
        copyrightText,
        aboutText,
        projects,
        skills,
        contactInfo,
        profileImage,
        scrollIndicator,
        colorPalette,
        logoText,
        logoColors,
        workExperience,
        education
      };
      setUndoStack([...undoStack, currentState]);
      const nextState = redoStack[redoStack.length - 1];
      setRedoStack(redoStack.slice(0, -1));
      // Restore next state
      setHeroText(nextState.heroText);
      setPageTitle(nextState.pageTitle);
      setCopyrightText(nextState.copyrightText);
      setAboutText(nextState.aboutText);
      setProjects(nextState.projects);
      setSkills(nextState.skills);
      setContactInfo(nextState.contactInfo);
      setProfileImage(nextState.profileImage);
      setScrollIndicator(nextState.scrollIndicator);
      setColorPalette(nextState.colorPalette);
      setLogoText(nextState.logoText);
      setLogoColors(nextState.logoColors);
      setWorkExperience(nextState.workExperience);
      setEducation(nextState.education);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navigation />
        <main className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">Admin Login</h2>
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter admin password"
                        />
                      </Form.Group>
                      {error && <div className="text-danger mb-3">{error}</div>}
                      <div className="text-center">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer copyrightText={copyrightText} />
      </>
    );
  }

  return (
    <div className="admin-panel">
      <Navigation />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Paneli</h1>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setShowPreviewModal(true)}>
              Önizleme
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Değişiklikleri Kaydet
            </Button>
          </div>
        </div>

        {/* İletişim Bilgileri Kartı */}
        <AdminCard
          title="İletişim Bilgileri"
          cardKey="contact"
          state={cardStates.contact || { isMinimized: false, isMaximized: false }}
          onMinimize={() => toggleMinimize('contact')}
          onMaximize={() => toggleMaximize('contact')}
        >
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>E-posta Adresi</Form.Label>
                  <Form.Control
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="ornek@email.com"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefon Numarası</Form.Label>
                  <Form.Control
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+90 5XX XXX XX XX"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn Profili</Form.Label>
                  <Form.Control
                    type="url"
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/kullaniciadi"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>GitHub Profili</Form.Label>
                  <Form.Control
                    type="url"
                    value={contactInfo.github}
                    onChange={(e) => setContactInfo({ ...contactInfo, github: e.target.value })}
                    placeholder="https://github.com/kullaniciadi"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </AdminCard>

        {/* Logo Ayarları Kartı */}
        <AdminCard
          title="Logo Ayarları"
          cardKey="logo"
          state={cardStates.logo || { isMinimized: false, isMaximized: false }}
          onMinimize={() => toggleMinimize('logo')}
          onMaximize={() => toggleMaximize('logo')}
        >
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Logo Metni</Form.Label>
                  <Form.Control
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    placeholder="Logo metnini girin"
                    maxLength={10}
                  />
                  <Form.Text className="text-muted">
                    Maksimum 10 karakter
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Başlangıç Rengi</Form.Label>
                  <Form.Control
                    type="color"
                    value={logoColors.start}
                    onChange={(e) => setLogoColors({ ...logoColors, start: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bitiş Rengi</Form.Label>
                  <Form.Control
                    type="color"
                    value={logoColors.end}
                    onChange={(e) => setLogoColors({ ...logoColors, end: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <h6>Logo Önizleme:</h6>
              <div 
                className="p-3 rounded"
                style={{
                  background: `linear-gradient(45deg, ${logoColors.start}, ${logoColors.end})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  fontSize: "2rem",
                  fontWeight: "bold"
                }}
              >
                {logoText}
              </div>
            </div>
          </Form>
        </AdminCard>

        {/* Diğer kartlar buraya gelecek */}
        <Tab.Container defaultActiveKey="content">
          <Card className="mb-4">
            <Card.Header>
              <Nav variant="tabs" className="card-header-tabs">
                <Nav.Item>
                  <Nav.Link eventKey="content">Content</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="buttons">Buttons</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="appearance">Appearance</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings">Settings</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="content">
                  <AdminCard 
                    title="Hero Section" 
                    cardKey="hero"
                    state={cardStates.hero}
                    onMinimize={() => toggleMinimize('hero')}
                    onMaximize={() => toggleMaximize('hero')}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={heroText.name}
                        onChange={(e) => setHeroText({...heroText, name: e.target.value})}
                        placeholder="Enter your name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Professional Titles</Form.Label>
                      {heroText.titles.map((title, index) => (
                        <div key={index} className="d-flex gap-2 mb-2">
                          <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => {
                              const newTitles = [...heroText.titles];
                              newTitles[index] = e.target.value;
                              setHeroText({...heroText, titles: newTitles});
                            }}
                            placeholder="Enter professional title"
                          />
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => {
                              const newTitles = heroText.titles.filter((_, i) => i !== index);
                              setHeroText({...heroText, titles: newTitles});
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="primary" 
                        onClick={() => setHeroText({
                          ...heroText, 
                          titles: [...heroText.titles, "New Title"]
                        })}
                      >
                        Add Title
                      </Button>
                      <Form.Text className="text-muted">
                        Add your professional titles (e.g., Game Designer, Level Designer)
                      </Form.Text>
                    </Form.Group>
                  </AdminCard>

                  <AdminCard 
                    title="Page Settings" 
                    cardKey="pageSettings"
                    state={cardStates.pageSettings}
                    onMinimize={() => toggleMinimize('pageSettings')}
                    onMaximize={() => toggleMaximize('pageSettings')}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Page Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                        placeholder="Enter page title"
                      />
                      <Form.Text className="text-muted">
                        This will be shown in the browser tab
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Copyright Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={copyrightText}
                        onChange={(e) => setCopyrightText(e.target.value)}
                        placeholder="Enter copyright text"
                      />
                      <Form.Text className="text-muted">
                        This will be shown in the footer
                      </Form.Text>
                    </Form.Group>
                  </AdminCard>

                  <AdminCard 
                    title="About" 
                    cardKey="about"
                    state={cardStates.about}
                    onMinimize={() => toggleMinimize('about')}
                    onMaximize={() => toggleMaximize('about')}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>First Paragraph</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={aboutText.paragraph1}
                        onChange={(e) => setAboutText({...aboutText, paragraph1: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Second Paragraph</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={aboutText.paragraph2}
                        onChange={(e) => setAboutText({...aboutText, paragraph2: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Profile Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                      />
                    </Form.Group>
                  </AdminCard>

                  <AdminCard 
                    title="Skills" 
                    cardKey="skills"
                    state={cardStates.skills}
                    onMinimize={() => toggleMinimize('skills')}
                    onMaximize={() => toggleMaximize('skills')}
                  >
                    {skills.map((skill, index) => (
                      <div key={index} className="d-flex gap-2 mb-2">
                        <Form.Control
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...skills];
                            newSkills[index].name = e.target.value;
                            setSkills(newSkills);
                          }}
                        />
                        <Button variant="danger" size="sm" onClick={() => {
                          const newSkills = skills.filter((_, i) => i !== index);
                          setSkills(newSkills);
                        }}>Remove</Button>
                      </div>
                    ))}
                    <Button variant="primary" onClick={() => setSkills([...skills, {
                      id: Date.now().toString(),
                      name: "New Skill",
                      percentage: 50,
                      color: "#007bff",
                      order: skills.length + 1,
                      isActive: true
                    }])}>Add Skill</Button>
                  </AdminCard>

                  <AdminCard 
                    title="Projects" 
                    cardKey="projects"
                    state={cardStates.projects}
                    onMinimize={() => toggleMinimize('projects')}
                    onMaximize={() => toggleMaximize('projects')}
                  >
                    {projects.map((project, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-3">
                            <h5>Project {index + 1}</h5>
                            <Button variant="danger" size="sm" onClick={() => {
                              const newProjects = projects.filter((_, i) => i !== index);
                              setProjects(newProjects);
                            }}>Remove</Button>
                          </div>
                          <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].title = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].description = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.image}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].image = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Video URL (Google Drive/YouTube)</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.video || ""}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].video = e.target.value;
                                setProjects(newProjects);
                              }}
                              placeholder="Enter video URL"
                            />
                            <Form.Text className="text-muted">
                              For Google Drive videos, use the sharing link. For YouTube videos, use the embed URL.
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Tags (comma separated)</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.tags.join(", ")}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].tags = e.target.value.split(",").map(t => t.trim());
                                setProjects(newProjects);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>GitHub URL</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.github || ""}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].github = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Demo URL</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.demo || ""}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[index].demo = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    ))}
                    <Button variant="primary" onClick={() => setProjects([...projects, {
                      id: Date.now().toString(),
                      title: "New Project",
                      description: "Project description",
                      tags: ["Tag1", "Tag2"],
                      image: "/projects/slidecubes.png",
                      order: projects.length + 1,
                      category: "game",
                      isActive: true,
                      isFeatured: false,
                      video: "",
                      github: "",
                      demo: ""
                    }])}>Add Project</Button>
                  </AdminCard>

                  <AdminCard 
                    title="Work Experience" 
                    cardKey="workExperience"
                    state={cardStates.workExperience}
                    onMinimize={() => toggleMinimize('workExperience')}
                    onMaximize={() => toggleMaximize('workExperience')}
                  >
                    {workExperience.map((exp, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-3">
                            <h5>Experience {index + 1}</h5>
                            <Button variant="danger" size="sm" onClick={() => {
                              const newExp = workExperience.filter((_, i) => i !== index);
                              setWorkExperience(newExp);
                            }}>Remove</Button>
                          </div>
                          <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.title}
                              onChange={(e) => {
                                const newExp = [...workExperience];
                                newExp[index].title = e.target.value;
                                setWorkExperience(newExp);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...workExperience];
                                newExp[index].company = e.target.value;
                                setWorkExperience(newExp);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.duration}
                              onChange={(e) => {
                                const newExp = [...workExperience];
                                newExp[index].duration = e.target.value;
                                setWorkExperience(newExp);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                const newExp = [...workExperience];
                                newExp[index].location = e.target.value;
                                setWorkExperience(newExp);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={exp.description}
                              onChange={(e) => {
                                const newExp = [...workExperience];
                                newExp[index].description = e.target.value;
                                setWorkExperience(newExp);
                              }}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    ))}
                    <Button variant="primary" onClick={() => setWorkExperience([...workExperience, {
                      id: Date.now().toString(),
                      title: "New Title",
                      company: "Company Name",
                      duration: "Duration",
                      location: "Location",
                      description: "Description"
                    }])}>Add Experience</Button>
                  </AdminCard>

                  <AdminCard 
                    title="Education" 
                    cardKey="education"
                    state={cardStates.education}
                    onMinimize={() => toggleMinimize('education')}
                    onMaximize={() => toggleMaximize('education')}
                  >
                    {education.map((edu, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-3">
                            <h5>Education {index + 1}</h5>
                            <Button variant="danger" size="sm" onClick={() => {
                              const newEdu = education.filter((_, i) => i !== index);
                              setEducation(newEdu);
                            }}>Remove</Button>
                          </div>
                          <Form.Group className="mb-3">
                            <Form.Label>School</Form.Label>
                            <Form.Control
                              type="text"
                              value={edu.school}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].school = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Degree</Form.Label>
                            <Form.Control
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].degree = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Field of Study</Form.Label>
                            <Form.Control
                              type="text"
                              value={edu.field}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].field = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                              type="text"
                              value={edu.duration}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].duration = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                              type="text"
                              value={edu.location}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].location = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={edu.description}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[index].description = e.target.value;
                                setEducation(newEdu);
                              }}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    ))}
                    <Button variant="primary" onClick={() => setEducation([...education, {
                      id: Date.now().toString(),
                      school: "School Name",
                      degree: "Degree",
                      field: "Field of Study",
                      duration: "Duration",
                      location: "Location",
                      description: "Description"
                    }])}>Add Education</Button>
                  </AdminCard>
                </Tab.Pane>
                <Tab.Pane eventKey="buttons">
                  <AdminCard 
                    title="Button Management" 
                    cardKey="buttons"
                    state={cardStates.buttons}
                    onMinimize={() => toggleMinimize('buttons')}
                    onMaximize={() => toggleMaximize('buttons')}
                  >
                    <div className="mb-3">
                      <Button variant="primary" onClick={addButton}>
                        <FaPlus className="me-2" />
                        Add Button
                      </Button>
                    </div>

                    {buttons.map((button, index) => (
                      <Card key={button.id} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Button {index + 1}</h5>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => onDragEnd({
                                  source: { index },
                                  destination: { index: index - 1 }
                                })}
                                disabled={index === 0}
                              >
                                ↑
                              </Button>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => onDragEnd({
                                  source: { index },
                                  destination: { index: index + 1 }
                                })}
                                disabled={index === buttons.length - 1}
                              >
                                ↓
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => removeButton(button.id)}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </div>

                          <Form.Group className="mb-3">
                            <Form.Label>Button Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={button.name}
                              onChange={(e) => updateButton(button.id, 'name', e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                              type="text"
                              value={button.url}
                              onChange={(e) => updateButton(button.id, 'url', e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Icon</Form.Label>
                            <Form.Select
                              value={button.icon}
                              onChange={(e) => updateButton(button.id, 'icon', e.target.value)}
                            >
                              <option value="FaGithub">GitHub</option>
                              <option value="FaLinkedin">LinkedIn</option>
                              <option value="FaTwitter">Twitter</option>
                              <option value="FaInstagram">Instagram</option>
                              <option value="FaYoutube">YouTube</option>
                              <option value="FaDiscord">Discord</option>
                              <option value="FaTelegram">Telegram</option>
                              <option value="FaWhatsapp">WhatsApp</option>
                              <option value="FaEnvelope">Email</option>
                              <option value="FaPhone">Phone</option>
                              <option value="FaMapMarkerAlt">Location</option>
                              <option value="FaGlobe">Website</option>
                              <option value="FaFileAlt">Resume</option>
                              <option value="FaDownload">Download</option>
                              <option value="SiArtstation">Artstation</option>
                              <option value="FaExternalLinkAlt">External Link</option>
                              <option value="custom">Custom Icon URL</option>
                            </Form.Select>
                          </Form.Group>

                          {button.icon === 'custom' && (
                            <Form.Group className="mb-3">
                              <Form.Label>Custom Icon URL</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter icon URL (e.g., https://example.com/icon.svg)"
                                value={button.customIconUrl || ''}
                                onChange={(e) => updateButton(button.id, 'customIconUrl', e.target.value)}
                              />
                              <Form.Text className="text-muted">
                                Enter a URL to an image file (SVG, PNG, etc.)
                              </Form.Text>
                            </Form.Group>
                          )}

                          <Form.Group className="mb-3">
                            <Form.Label>Icon Preview</Form.Label>
                            <div className="d-flex align-items-center">
                              {button.icon === 'custom' && button.customIconUrl ? (
                                <img 
                                  src={button.customIconUrl} 
                                  alt="Custom Icon" 
                                  style={{ width: '24px', height: '24px' }} 
                                />
                              ) : (
                                iconMap[button.icon] && React.createElement(iconMap[button.icon], { size: 24 })
                              )}
                              <span className="ms-2">{button.icon === 'custom' ? 'Custom Icon' : button.icon}</span>
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id={`button-active-${button.id}`}
                              label="Active"
                              checked={button.isActive}
                              onChange={(e) => updateButton(button.id, 'isActive', e.target.checked)}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    ))}
                  </AdminCard>
                </Tab.Pane>
                <Tab.Pane eventKey="appearance">
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Theme Settings</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        {Object.entries(themes).map(([key, theme]) => (
                          <Col key={key} md={4} className="mb-3">
                            <Card 
                              className={`theme-card ${selectedTheme === key ? 'selected' : ''}`}
                              onClick={() => handleThemeChange(key)}
                            >
                              <Card.Body>
                                <div className="theme-preview mb-2" style={{
                                  background: `linear-gradient(45deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
                                  height: '100px',
                                  borderRadius: '4px'
                                }} />
                                <h6 className="mb-0">{theme.name}</h6>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="settings">
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0">General Settings</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Scroll Indicator</Form.Label>
                        <Form.Check 
                          type="switch"
                          id="scroll-indicator"
                          label="Enable Scroll Indicator"
                          checked={scrollIndicator.enabled}
                          onChange={(e) => setScrollIndicator({...scrollIndicator, enabled: e.target.checked})}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Scroll Indicator Color</Form.Label>
                        <Form.Control
                          type="color"
                          value={scrollIndicator.color}
                          onChange={(e) => setScrollIndicator({...scrollIndicator, color: e.target.value})}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Scroll Indicator Size</Form.Label>
                        <Form.Select
                          value={scrollIndicator.size}
                          onChange={(e) => setScrollIndicator({...scrollIndicator, size: e.target.value})}
                        >
                          <option value="1.5rem">Small</option>
                          <option value="2rem">Medium</option>
                          <option value="2.5rem">Large</option>
                        </Form.Select>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Container>

      {/* Backup Modal */}
      <Modal show={showBackupModal} onHide={() => setShowBackupModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Backups</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between mb-3">
            <Button variant="primary" onClick={createBackup}>
              <FaPlus className="me-2" />
              Create Backup
            </Button>
          </div>
          <div className="backup-list">
            {backups.map((backup) => (
              <Card key={backup.id} className="mb-2">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">Backup {backup.id}</h6>
                    <small className="text-muted">
                      {new Date(backup.timestamp).toLocaleString()}
                    </small>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => restoreBackup(backup)}
                  >
                    Restore
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* Preview Modal */}
      <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} size="xl" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe 
            src={`/preview?data=${encodeURIComponent(JSON.stringify(previewData))}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Preview"
          />
        </Modal.Body>
      </Modal>

      {/* Confirm Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmAction?.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              confirmAction?.onConfirm();
              setShowConfirmModal(false);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer copyrightText={copyrightText} />

      <style jsx>{`
        .card {
          transition: all 0.3s ease;
        }
        
        .card.position-fixed {
          margin: 0 !important;
          border-radius: 0;
        }

        .theme-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .theme-card.selected {
          border: 2px solid var(--bs-primary);
        }

        .backup-list {
          max-height: 400px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
} 