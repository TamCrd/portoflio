// assets/js/language.js
console.log('✅ Language script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded');
    
    const languageToggle = document.getElementById('languageToggle');
    
    if (!languageToggle) {
        console.error('❌ Bouton langue non trouvé');
        return;
    }
    
    const flag = document.querySelector('.lang-flag');
    const text = document.querySelector('.lang-text');
    
    let currentLang = localStorage.getItem('language') || 'fr';
    console.log('🌍 Langue initiale:', currentLang);
    
    // Traduction initiale
    updateButton();
    if (currentLang === 'en') {
        translateAllSections();
    }
    
    // Gestion du clic
    languageToggle.addEventListener('click', function() {
        console.log('🔄 Changement de langue');
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('language', currentLang);
        updateButton();
        translateAllSections();
    });
    
    function updateButton() {
        if (currentLang === 'en') {
            flag.textContent = '🇬🇧';
            text.textContent = 'EN';
            console.log('🇬🇧 Bouton changé en EN');
        } else {
            flag.textContent = '🇫🇷';
            text.textContent = 'FR';
            console.log('🇫🇷 Bouton changé en FR');
        }
    }
    
    function translateAllSections() {
        console.log('📖 Traduction de la page en:', currentLang);
        
        const translations = {
            fr: {
                // NAVIGATION
                'accueil': 'Accueil',
                'apropos': 'À propos',
                'competences': 'Compétences',
                'formation': 'Formation',
                'experience': 'Expérience',
                'projets': 'Projets',
                'certifications': 'Certifications',
                'veille': 'Veille Technologique',
                'contact': 'Contact',
                
                // HEADER
                'sousTitre': 'Étudiante en BTS SIO SISR, avec un intérêt marqué pour les systèmes, les réseaux et la cybersécurité. J\'ai une forte attirance pour l\'administration informatique et la criminalistique numérique.',
                'boutonProjets': 'Découvrir<br>mes projets',
                'boutonCV': 'Télécharger<br>mon CV',
                
                // SECTIONS
                'titreCompetences': 'Compétences',
                'sousTitreCompetences': 'Mes domaines d\'expertise et technologies maîtrisées',
                'titreFormation': 'Formation',
                'sousTitreFormation': 'Mon parcours académique',
                'titreExperience': 'Expérience Professionnelle', 
                'sousTitreExperience': 'Mes stages et expériences en entreprise',
                'titreProjets': 'Mes Projets',
                'sousTitreProjets': 'Réalisations techniques et études de cas',
                'titreCertifications': 'Certifications',
                'sousTitreCertifications': 'Mes diplômes et certifications techniques',
                'titreVeille': 'Veille Technologique',
                'sousTitreVeille': 'Suivi continu des évolutions dans mes domaines de spécialisation',
                'titreContact': 'Contact',
                'sousTitreContact': 'Disponible pour des opportunités en administration système, réseaux ou cybersécurité'
            },
            en: {
                // NAVIGATION
                'accueil': 'Home',
                'apropos': 'About', 
                'competences': 'Skills',
                'formation': 'Education',
                'experience': 'Experience',
                'projets': 'Projects',
                'certifications': 'Certifications',
                'veille': 'Tech Watch',
                'contact': 'Contact',
                
                // HEADER
                'sousTitre': 'BTS SIO SISR Student, with a strong interest in systems, networks and cybersecurity. I have a strong attraction for IT administration and digital forensics.',
                'boutonProjets': 'Discover<br>my projects',
                'boutonCV': 'Download<br>my CV',
                
                // SECTIONS
                'titreCompetences': 'Skills',
                'sousTitreCompetences': 'My areas of expertise and mastered technologies',
                'titreFormation': 'Education',
                'sousTitreFormation': 'My academic background',
                'titreExperience': 'Professional Experience',
                'sousTitreExperience': 'My internships and work experiences', 
                'titreProjets': 'My Projects',
                'sousTitreProjets': 'Technical achievements and case studies',
                'titreCertifications': 'Certifications',
                'sousTitreCertifications': 'My diplomas and technical certifications',
                'titreVeille': 'Technology Watch',
                'sousTitreVeille': 'Continuous monitoring of developments in my areas of specialization',
                'titreContact': 'Contact',
                'sousTitreContact': 'Available for opportunities in system administration, networks or cybersecurity'
            }
        };
        
        const langData = translations[currentLang];
        let translatedCount = 0;
        
        // Traduction de TOUS les éléments
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (langData[key]) {
                if (key.includes('bouton') && element.innerHTML.includes('<br>')) {
                    element.innerHTML = langData[key];
                } else {
                    element.textContent = langData[key];
                }
                translatedCount++;
            }
        });
        
        console.log(`✅ ${translatedCount} éléments traduits`);
    }
});