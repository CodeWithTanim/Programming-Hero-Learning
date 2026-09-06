function analyzeEmailDomains(text) {
    if (typeof text !== 'string') {
        return "Invalid";
    };

    let words = text.split(" ");
    let emailCount = 0;
    let longestDomain = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].includes('@')) {
            emailCount++;
            
            let emailParts = words[i].split('@');
            let domain = emailParts[1];
    
            if (domain.length > longestDomain.length) {
                longestDomain = domain;
            };
        };

    };
    return {
        emailCount: emailCount,
        longestDomain: longestDomain
    };
};



console.log(analyzeEmailDomains("Contact support@gmail.com admin@yahoo.com info@programminghero.com"));

console.log(analyzeEmailDomains("Hello everyone!"));