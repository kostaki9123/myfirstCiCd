import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primary: '#1A202C',
  			secondary: '#4A90E2',
  			accent: '#FF6F61',
  			light: '#F7FAFC'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  screens: {
			'base': '0px',

			'150' : '150px',

			'200' : '200px',

			'255' : '255px',

			'290' : '290px',

			'343': '343px',

			'xxs' : '410px',

			'426' : '426px',
			// => @media (min-width: 410px) { ... }
			'535' : '535px',

			'600' : '600px',

			'sm': '640px',

			'674' : '674px',
			// => @media (min-width: 640px) { ... }
	  
			'md': '768px',

			'787' : '787px' ,
			// => @media (min-width: 768px) { ... }
			'950': '950px',

			'986': '986px' ,
	  
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
	  
			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }
	  
			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		  }

  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
