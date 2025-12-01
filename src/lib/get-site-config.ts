/**
 * Site Configuration Loader
 *
 * This utility loads and validates the site configuration from site.config.json
 */

import type { SiteConfig } from '@/types/site-config';
import siteConfigData from '../../site.config.json';

/**
 * Get the site configuration
 *
 * @returns The complete site configuration object
 */
export function getSiteConfig(): SiteConfig {
  // Type assertion - the JSON file matches our SiteConfig interface
  return siteConfigData as unknown as SiteConfig;
}

/**
 * Get a specific section from the site configuration
 *
 * @param section - The section key to retrieve
 * @returns The requested section of the configuration
 */
export function getConfigSection<K extends keyof SiteConfig>(
  section: K
): SiteConfig[K] {
  const config = getSiteConfig();
  return config[section];
}

// Export individual sections for convenience
export const getSiteConfigBusiness = () => getConfigSection('business');
export const getSiteConfigContact = () => getConfigSection('contact');
export const getSiteConfigServices = () => getConfigSection('services');
export const getSiteConfigServiceAreas = () => getConfigSection('serviceAreas');
export const getSiteConfigAboutUs = () => getConfigSection('aboutUs');
export const getSiteConfigProcess = () => getConfigSection('process');
export const getSiteConfigFAQ = () => getConfigSection('faq');
export const getSiteConfigCTA = () => getConfigSection('cta');
export const getSiteConfigFooter = () => getConfigSection('footer');
export const getSiteConfigBranding = () => getConfigSection('branding');
export const getSiteConfigSocial = () => getConfigSection('social');
export const getSiteConfigIntegrations = () => getConfigSection('integrations');
export const getSiteConfigProjects = () => getConfigSection('projects');
export const getSiteConfigBlog = () => getConfigSection('blog');
