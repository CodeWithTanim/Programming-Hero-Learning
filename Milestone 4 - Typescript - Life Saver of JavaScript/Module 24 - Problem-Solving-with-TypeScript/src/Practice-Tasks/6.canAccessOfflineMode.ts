type Tire = 'free' | 'pro' | 'premium';

function canAccessOfflineMode (tire: Tire): boolean {
    if (tire === 'pro' || tire === 'premium') {
        return true
    }

    return false
}

console.log(canAccessOfflineMode('free'));
console.log(canAccessOfflineMode('pro'));
console.log(canAccessOfflineMode('premium'));