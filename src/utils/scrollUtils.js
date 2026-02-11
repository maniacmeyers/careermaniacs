// Utility function to scroll to sections with proper offset
export const scrollToSection = (sectionId, offset = 100) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Utility function to handle navigation with scroll
export const navigateAndScroll = (navigate, path, sectionId = null, offset = 100) => {
  if (window.location.pathname === path && sectionId) {
    // Same page, just scroll
    scrollToSection(sectionId, offset);
  } else {
    // Different page, navigate then scroll
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId, offset);
      }, 100);
    }
  }
};
