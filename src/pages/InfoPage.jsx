import React, { useState } from 'react';
import { FaInfoCircle, FaBook, FaFlask, FaTablets, FaSyringe, FaClinicMedical } from 'react-icons/fa';

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState('about');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-8 text-center">Ketamine Information</h1>
      
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <TabButton 
            active={activeTab === 'about'} 
            onClick={() => setActiveTab('about')}
            icon={<FaBook />}
            label="About"
          />
          <TabButton 
            active={activeTab === 'uses'} 
            onClick={() => setActiveTab('uses')}
            icon={<FaClinicMedical />}
            label="Medical Uses"
          />
          <TabButton 
            active={activeTab === 'routes'} 
            onClick={() => setActiveTab('routes')}
            icon={<FaSyringe />}
            label="Administration"
          />
          <TabButton 
            active={activeTab === 'safety'} 
            onClick={() => setActiveTab('safety')}
            icon={<FaInfoCircle />}
            label="Safety"
          />
        </div>
      
        {activeTab === 'about' && (
          <div className="card mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
              <FaBook className="mr-2" /> About Ketamine
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ketamine is a medication primarily used for starting and maintaining anesthesia. 
              It induces dissociative anesthesia, a trance-like state providing pain relief, 
              sedation, and amnesia. The drug is a Schedule III controlled substance in the 
              United States and is used in both human and veterinary medicine.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In recent years, ketamine has gained recognition for its off-label use in 
              treating depression, particularly treatment-resistant depression, as well as 
              for pain management and treatment of various psychiatric conditions.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Pharmacology</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ketamine works primarily by blocking N-methyl-D-aspartate (NMDA) receptors in the brain. 
                This mechanism differs from most other anesthetics, which typically enhance GABA activity. 
                Ketamine's unique effects include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Dissociative anesthesia (feeling detached from your environment)</li>
                <li>Analgesia (pain relief)</li>
                <li>Amnesia (memory loss)</li>
                <li>Maintenance of respiratory drive and protective airway reflexes</li>
                <li>Maintenance of cardiac output and blood pressure</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                At subanesthetic doses, ketamine produces altered perceptions, a sense of detachment, 
                and antidepressant effects. These properties have led to both medical applications for 
                mood disorders and non-medical use.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'uses' && (
          <div className="card mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
              <FaClinicMedical className="mr-2" /> Medical Uses
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2 flex items-center">
                <FaSyringe className="mr-2" /> Anesthesia
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ketamine is used for induction and maintenance of anesthesia. It provides excellent 
                analgesia and amnesia while preserving respiratory drive, making it valuable in 
                settings where respiratory depression is a concern. It's particularly useful for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Brief surgical procedures</li>
                <li>Emergency medicine</li>
                <li>Field conditions with limited resources</li>
                <li>Patients with hemodynamic instability</li>
                <li>Pediatric patients</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2 flex items-center">
                <FaTablets className="mr-2" /> Pain Management
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ketamine effectively treats various pain conditions due to its action on 
                N-methyl-D-aspartate (NMDA) receptors. It's used for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Acute pain</li>
                <li>Chronic pain</li>
                <li>Neuropathic pain syndromes</li>
                <li>Cancer pain</li>
                <li>Pain that hasn't responded to traditional analgesics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2 flex items-center">
                <FaFlask className="mr-2" /> Depression
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ketamine has shown rapid antidepressant effects in individuals with treatment-resistant 
                depression. In 2019, the FDA approved esketamine (Spravato), a ketamine derivative 
                administered as a nasal spray, for treatment-resistant depression and major depressive 
                disorder with suicidal thoughts.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Unlike traditional antidepressants that may take weeks to work, ketamine can produce 
                antidepressant effects within hours to days. This rapid action makes it valuable for 
                patients in crisis or those who haven't responded to standard treatments.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'routes' && (
          <div className="card mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
              <FaSyringe className="mr-2" /> Administration Routes
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Intravenous (IV)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The most common route for anesthesia and depression treatment. 
                Provides rapid onset and allows precise dosing. Used in both hospital settings 
                and specialized ketamine clinics.
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li><strong>Onset:</strong> 30 seconds</li>
                <li><strong>Peak effect:</strong> 1-5 minutes</li>
                <li><strong>Duration:</strong> 10-15 minutes (single dose)</li>
                <li><strong>Bioavailability:</strong> 100%</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Intramuscular (IM)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Useful when IV access is difficult. Produces reliable effects with slightly 
                slower onset than IV. Commonly used in emergency situations and field medicine.
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li><strong>Onset:</strong> 3-5 minutes</li>
                <li><strong>Peak effect:</strong> 5-15 minutes</li>
                <li><strong>Duration:</strong> 15-30 minutes</li>
                <li><strong>Bioavailability:</strong> 93%</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Oral</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Lower bioavailability due to first-pass metabolism. Usually administered as 
                lozenges or troches for at-home treatment of depression or pain. Requires 
                higher doses than IV or IM administration.
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li><strong>Onset:</strong> 15-30 minutes</li>
                <li><strong>Duration:</strong> 1-2 hours</li>
                <li><strong>Bioavailability:</strong> 20-25%</li>
                <li><strong>Common forms:</strong> Troches, lozenges, tablets</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Nasal</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Esketamine nasal spray (Spravato) is FDA-approved for treatment-resistant 
                depression. Administered in a certified healthcare setting with monitoring. 
                Provides an alternative to IV ketamine for depression treatment.
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Onset:</strong> 5-15 minutes</li>
                <li><strong>Duration:</strong> 1-1.5 hours</li>
                <li><strong>Bioavailability:</strong> 45-50%</li>
                <li><strong>Approved product:</strong> Spravato (esketamine) for TRD</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'safety' && (
          <div className="card mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
              <FaInfoCircle className="mr-2" /> Safety Information
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Side Effects</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Common side effects include:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Dissociation and perceptual disturbances</li>
                <li>Increase in blood pressure and heart rate</li>
                <li>Nausea and vomiting</li>
                <li>Dizziness and vertigo</li>
                <li>Visual disturbances</li>
                <li>Confusion or agitation</li>
                <li>Sedation</li>
                <li>Nystagmus (involuntary eye movements)</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Contraindications</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Ketamine should be used with caution or avoided in patients with:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Severe cardiovascular disease</li>
                <li>Poorly controlled hypertension</li>
                <li>Increased intracranial pressure</li>
                <li>History of psychosis</li>
                <li>Severe liver disease</li>
                <li>Pregnancy (unless benefits outweigh risks)</li>
                <li>History of substance abuse</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Monitoring Requirements</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                During ketamine administration, especially at anesthetic doses, patients should be monitored for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Vital signs (blood pressure, heart rate, respiratory rate)</li>
                <li>Oxygen saturation</li>
                <li>Mental status</li>
                <li>Emergence reactions</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/40 p-4 rounded-md">
              <p className="text-yellow-800 dark:text-yellow-300 text-sm font-medium flex items-start">
                <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0" />
                IMPORTANT: This information is provided for educational purposes only and should not 
                replace the advice of a qualified healthcare professional. Ketamine should only be 
                used under proper medical supervision.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`${
        active 
          ? 'bg-blue-600 dark:bg-blue-700 text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      } px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center cursor-pointer`}
    >
      {React.cloneElement(icon, { className: "mr-2" })}
      {label}
    </button>
  );
}