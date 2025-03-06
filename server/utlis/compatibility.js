

export const calculateCompatibility = (user1, user2) => {
  // Shared interests
  const sharedInterests = user1.interests.filter((interest) =>
    user2.interests.includes(interest)
  ).length;
  const interestScore = sharedInterests * 10; // 10 points per shared interest
 console.log(interestScore)
  // Shared personality traits
  const sharedTraits = user1.personalityTraits.filter((trait) =>
    user2.personalityTraits.includes(trait)
  ).length;
  
  const traitScore = sharedTraits * 20; // 20 points per shared trait
  console.log(sharedInterests)
  console.log(sharedTraits)
  console.log(traitScore)
  // Total compatibility score (0-100)
  const compatibilityScore = Math.min(interestScore + traitScore, 100);
  console.log(compatibilityScore);
  return compatibilityScore;
};