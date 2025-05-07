export const generateWaterReminderEmail = (plantName: string, userName: string) => {
  const subject = `Time to Water Your 🌿 ${plantName}!`;
  const text = `
    Hi ${userName},
    
    We just wanted to give you a gentle reminder — your plant **${plantName}** is feeling a little thirsty! 💧
    
    A quick watering will have it back to thriving in no time.  
    Thanks for being such a great plant parent!
    
    Stay green,  
    — The Green World 🌱
      `;
  return { subject, text };
};