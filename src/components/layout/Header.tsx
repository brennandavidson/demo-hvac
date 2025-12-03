'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QuoteButton from '@/components/ui/QuoteButton';
import { useHeader } from '@/contexts/HeaderContext';
import {
  getSiteConfigBusiness,
  getSiteConfigContact,
  getSiteConfigServices,
  getSiteConfigServiceAreas,
  getSiteConfigBranding,
  getSiteConfigProjects,
} from '@/lib/get-site-config';
import { getNavColors } from '@/lib/colors';
import { getLogoMaxWidth, getDefaultLogoMaxHeight } from '@/lib/logo-utils';

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

interface HeaderProps {
  navLinks?: NavLink[];
  phoneNumber?: string;
  onQuoteClick?: () => void;
}

export function Header({
  navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/service-areas', label: 'Service Areas' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  phoneNumber,
  onQuoteClick,
}: HeaderProps) {
  // Load configuration
  const business = getSiteConfigBusiness();
  const contact = getSiteConfigContact();
  const services = getSiteConfigServices();
  const serviceAreas = getSiteConfigServiceAreas();
  const branding = getSiteConfigBranding();
  const projectsConfig = getSiteConfigProjects();

  // Check if projects exist to conditionally show/hide projects link
  const hasProjects = projectsConfig?.gallery && projectsConfig.gallery.length > 0;

  // Filter out projects link if no projects exist
  const filteredNavLinks = useMemo(() =>
    navLinks.filter(link => link.href !== '/projects' || hasProjects),
    [navLinks, hasProjects]
  );

  // Use config values with fallback to props
  const phone = phoneNumber || contact.phone;

  const { hasHeroImage } = useHeader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServiceAreasOpen, setIsServiceAreasOpen] = useState(false);

  // Dropdown configuration - items per column before switching to 2-column layout
  const DROPDOWN_ITEMS_PER_COLUMN = 8;

  // Memoize submenus to prevent rebuilding on every render
  const servicesSubmenu = useMemo(() =>
    services.items.map(service => ({
      href: `/services/${service.slug}`,
      label: service.title,
    })),
    [services.items]
  );

  const serviceAreasSubmenu = useMemo(() =>
    serviceAreas.cities.map(city => ({
      href: `/service-areas/${city.slug}`,
      label: city.name,
    })),
    [serviceAreas.cities]
  );

  // Memoize layout decisions
  const servicesNeedsTwoColumns = useMemo(() => servicesSubmenu.length >= DROPDOWN_ITEMS_PER_COLUMN, [servicesSubmenu.length]);
  const serviceAreasNeedsTwoColumns = useMemo(() => serviceAreasSubmenu.length >= DROPDOWN_ITEMS_PER_COLUMN, [serviceAreasSubmenu.length]);

  useEffect(() => {
    // Check scroll position immediately on mount
    setIsScrolled(window.scrollY > 10);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsServiceAreasOpen(false);
  };

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    }
    setIsMenuOpen(false);
  };

  // Determine if header should have background
  // For pages WITH hero: only show background when scrolled or menu open
  // For pages WITHOUT hero: always show background
  const shouldShowBackground = !hasHeroImage || isScrolled || isMenuOpen;

  // Get nav colors from config
  const navColors = getNavColors();

  // Get logo dimensions from config (calculated at build time)
  const logoDimensions = branding.logoDimensions?.horizontalInverted;
  const logoMaxHeight = logoDimensions?.maxHeight || getDefaultLogoMaxHeight();
  const logoMaxWidth = getLogoMaxWidth();

  return (
    <header
      suppressHydrationWarning
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: shouldShowBackground ? navColors.background : 'transparent',
        borderBottom: shouldShowBackground ? `2px solid ${navColors.border}` : '2px solid transparent',
        transition: 'all 300ms'
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={branding.logo.horizontalInverted}
              alt={`${business.name} Logo`}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                height: 'auto',
                width: 'auto',
                maxHeight: `${logoMaxHeight}px`,
                maxWidth: `${logoMaxWidth}px`
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden nav:flex items-center space-x-8">
            {filteredNavLinks.map((link) => {
              // Special handling for Services link with dropdown
              if (link.href === '/services') {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="font-montserrat text-white hover:text-primary transition-colors font-bold uppercase text-sm tracking-wide flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-2 ${servicesNeedsTwoColumns ? 'min-w-[32rem]' : 'min-w-[14rem]'} bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                        isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className={servicesNeedsTwoColumns ? 'grid grid-cols-2 gap-x-4' : ''}>
                        {servicesSubmenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Special handling for Service Areas link with dropdown
              if (link.href === '/service-areas') {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServiceAreasOpen(true)}
                    onMouseLeave={() => setIsServiceAreasOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="font-montserrat text-white hover:text-primary transition-colors font-bold uppercase text-sm tracking-wide flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServiceAreasOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-2 ${serviceAreasNeedsTwoColumns ? 'min-w-[32rem]' : 'min-w-[14rem]'} bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                        isServiceAreasOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className={serviceAreasNeedsTwoColumns ? 'grid grid-cols-2 gap-x-4' : ''}>
                        {serviceAreasSubmenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular links
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat text-white hover:text-primary transition-colors font-bold uppercase text-sm tracking-wide"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-montserrat text-white hover:text-primary transition-colors font-bold uppercase text-sm tracking-wide"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Section - Right */}
          <div className="hidden nav:flex items-center space-x-4">
            {/* Phone Number Button */}
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="font-heading bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-md font-bold uppercase text-sm transition-colors shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {phone}
            </a>

            {/* Get Free Quote Button */}
            <QuoteButton variant="nav" onClick={onQuoteClick} />
          </div>

          {/* Mobile/Tablet CTA & Menu - Right Side */}
          <div className="nav:hidden flex items-center gap-4">
            {/* Mobile Call Button */}
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="font-heading bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md font-bold uppercase text-xs transition-colors shadow-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden min-[500px]:inline">{phone}</span>
            </a>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span className={`block w-full h-0.5 bg-gray-300 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-full h-0.5 bg-gray-300 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-full h-0.5 bg-gray-300 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`nav:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className={`py-4 space-y-4 transition-all duration-300 ${isMenuOpen ? 'border-t border-primary' : ''}`}>
            {filteredNavLinks.map((link) => {
              // Special handling for Services link with dropdown in mobile
              if (link.href === '/services') {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="w-full flex items-center justify-between text-gray-300 hover:text-primary transition-colors font-medium py-2"
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mobile Submenu */}
                    <div className={`pl-4 space-y-2 transition-all duration-200 ${
                      isServicesOpen ? 'max-h-[60vh] mt-2 overflow-y-auto' : 'max-h-0 overflow-hidden'
                    }`}>
                      {servicesSubmenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleNavClick}
                          className="block text-gray-400 hover:text-primary transition-colors font-medium py-2 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Special handling for Service Areas link with dropdown in mobile
              if (link.href === '/service-areas') {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setIsServiceAreasOpen(!isServiceAreasOpen)}
                      className="w-full flex items-center justify-between text-gray-300 hover:text-primary transition-colors font-medium py-2"
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServiceAreasOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mobile Submenu */}
                    <div className={`pl-4 space-y-2 transition-all duration-200 ${
                      isServiceAreasOpen ? 'max-h-[60vh] mt-2 overflow-y-auto' : 'max-h-0 overflow-hidden'
                    }`}>
                      {serviceAreasSubmenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleNavClick}
                          className="block text-gray-400 hover:text-primary transition-colors font-medium py-2 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Regular links
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Quote Button */}
            <QuoteButton variant="nav" onClick={onQuoteClick} className="w-full" />
          </div>
        </div>
      </nav>
    </header>
  );
}
