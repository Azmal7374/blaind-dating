// utils/compatibility.js
export const calculateCompatibility = (user1, user2) => {
    // Shared interests
    const sharedInterests = user1.interests.filter((interest) =>
      user2.interests.includes(interest)
    ).length;
    const interestScore = sharedInterests * 10; // 10 points per shared interest
  
    // Shared personality traits
    const sharedTraits = user1.personalityTraits.filter((trait) =>
      user2.personalityTraits.includes(trait)
    ).length;
    const traitScore = sharedTraits * 20; // 20 points per shared trait
  
    // Total compatibility score (0-100)
    return Math.min(interestScore + traitScore, 100);
  };