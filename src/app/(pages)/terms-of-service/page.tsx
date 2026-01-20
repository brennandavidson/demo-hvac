// THIS IS REQUIRED FOR SEO CONFIG - DO NOT REMOVE
// Every page must have this metadata export to load its seo-config.json
import { generateStaticMetadata } from '@/lib/seo/generate-static-metadata';
export const metadata = generateStaticMetadata('terms-of-service');

import { PageWrapper } from "@/components/layout/PageWrapper";
import { getSiteConfigBusiness, getSiteConfigContact, getSiteConfigServices } from '@/lib/get-site-config';

export default function TermsOfService() {
  const business = getSiteConfigBusiness();
  const contact = getSiteConfigContact();
  const services = getSiteConfigServices();

  return (
    <PageWrapper>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") govern your use of services provided by {business.name} ("we," "our," or "us"). By requesting a quote, scheduling a service, or engaging our services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700">
                If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Provided</h2>
              <p className="text-gray-700 mb-4">
                {business.name} provides professional home services including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {services.items.slice(0, 4).map((service, index) => (
                  <li key={index}>{service.title}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-4">
                Specific services, timelines, and pricing will be detailed in individual quotes and service agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Quotes and Pricing</h2>
              <p className="text-gray-700 mb-4">
                All quotes are estimates based on the information provided and are valid for 30 days unless otherwise specified. Final pricing may vary if:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Actual conditions differ from those described</li>
                <li>Additional work is required or requested</li>
                <li>Materials costs change significantly</li>
                <li>Unforeseen complications arise during service</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We will notify you of any significant price changes before proceeding with work.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Payment terms will be specified in your service agreement</li>
                <li>Deposit may be required before work begins</li>
                <li>Final payment is due upon completion unless otherwise agreed</li>
                <li>Late payments may incur additional fees</li>
                <li>We accept various payment methods as specified in your quote</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Customer Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate information about your property and service needs</li>
                <li>Ensure safe and clear access to work areas</li>
                <li>Secure pets and inform us of any safety hazards</li>
                <li>Be available for communication during the project</li>
                <li>Remove valuable or fragile items from work areas</li>
                <li>Notify us immediately of any concerns during service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Scheduling and Cancellation</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We will work with you to schedule services at mutually convenient times</li>
                <li>Weather or unforeseen circumstances may require rescheduling</li>
                <li>Cancellations must be made at least 24 hours in advance when possible</li>
                <li>Deposits for cancelled projects may be non-refundable depending on work already performed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Warranties and Guarantees</h2>
              <p className="text-gray-700 mb-4">
                We stand behind our work and offer the following:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>All work is performed by licensed and insured professionals</li>
                <li>We use quality materials and industry-standard practices</li>
                <li>Warranty periods vary by service and will be specified in your agreement</li>
                <li>Warranty does not cover damage from misuse, neglect, or normal wear and tear</li>
                <li>Claims must be reported within the warranty period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, {business.name} shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Delays caused by weather, supplier issues, or other circumstances beyond our control</li>
                <li>Pre-existing conditions not disclosed during initial consultation</li>
                <li>Damage to property resulting from hidden defects or undisclosed conditions</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our total liability shall not exceed the amount paid for the specific service in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                If you have a concern about our services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Contact us immediately to discuss the issue</li>
                <li>We will make reasonable efforts to resolve concerns promptly</li>
                <li>Good faith efforts at resolution are required before legal action</li>
                <li>Disputes shall be governed by the laws of {contact.address?.state}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>{business.name}</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  Email: {contact.email}
                </p>
                <p className="text-gray-700 mb-2">
                  Phone: {contact.phone}
                </p>
                {contact.address && (
                  <p className="text-gray-700">
                    Address: {contact.address.street}, {contact.address.city}, {contact.address.state} {contact.address.zip}
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
