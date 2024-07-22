// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  primary: {
    // new blue
    100: "#d3d3d3",
    200: "#a6a6a6",
    300: "#7a7a7a",
    400: "#4d4d4d",
    500: "#000000",
    600: "#000000", // manually adjusted
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  secondary: {
    // new red
    50: "#f0f0f0", // manually adjusted
    100: "#f5cccc",
    200: "#eb9999",
    300: "#e06666",
    400: "#d63333",
    500: "#cc0000",
    600: "#a30000",
    700: "#7a0000",
    800: "#520000",
    900: "#290000",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins"].join(","),
        fontSize: 45,
      },
      h2: {
        fontFamily: ["Poppins"].join(","),
        fontSize: 35,
      },
      h3: {
        fontFamily: ["Poppins"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins"].join(","),
        fontSize: 14,
      },
    },
  };
};
