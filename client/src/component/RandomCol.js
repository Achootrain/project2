export const RandomCol = () => {
    const color = {
      c1: "bg-gradient-to-r from-blue-500 via-violet-500 to-purple-400",
      c2: "bg-gradient-to-r from-red-500 via-rose-500 to-orange-400",
      c3: "bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300",
      c4: "bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500",
      c5: "bg-gradient-to-r from-[#7f00ff] to-[#e100ff]",
      c6:"bg-red-400",
      c7:"bg-yellow-400",
      c8:"bg-green-400",
      c9:"bg-blue-400",
    };
  
    // Get all color keys
    const colorKeys = Object.keys(color);
  
    // Select a random key
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  
    // Return the random color
    return color[randomKey];
  };
  