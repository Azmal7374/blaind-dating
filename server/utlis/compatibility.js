export const calculateCompatibility = (user1, user2) => {
  console.log(user1)
  // Ensure both users have interests and personalityTraits arrays

  console.log("User One Data: ",user1)
  console.log("User Two Data: ",user2)

  if (!user1.interests || !user2.interests || !user1.personalityTraits || !user2.personalityTraits) {
    console.error("User data is missing interests or personalityTraits");
    return 0; // Return 0 if data is missing
  }

  // Shared interests
  const sharedInterests = user1.interests.filter((interest) =>
    user2.interests.includes(interest)
  ).length;

  const interestScore = sharedInterests * 10; // 10 points per shared interest
  console.log(`Shared Interests: ${sharedInterests}, Interest Score: ${interestScore}`);

  // Shared personality traits
  const sharedTraits = user1.personalityTraits.filter((trait) =>
    user2.personalityTraits.includes(trait)
  ).length;

  const traitScore = sharedTraits * 20; // 20 points per shared trait
  console.log(`Shared Traits: ${sharedTraits}, Trait Score: ${traitScore}`);

  // Total compatibility score (0-100)
  const compatibilityScore = Math.min(interestScore + traitScore, 100);
  console.log(`Total Compatibility Score: ${compatibilityScore}`);

  return compatibilityScore;
};