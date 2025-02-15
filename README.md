# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```





Running the Digital Wallet Project Locally

This guide provides step-by-step instructions on how to set up and run both the backend and frontend of the Digital Wallet application on a local machine.
Prerequisites
Ensure you have the following installed:
•	Backend Requirements:
o	.NET 9 SDK 
o	MS SQL Server (Ensure a local instance is running)
o	SQL Server Management Studio (SSMS) (optional but recommended)
o	Visual Studio or VS Code (for development)
•	Frontend Requirements:
o	Node.js (LTS recommended)
o	npm (comes with Node.js)
o	A modern browser (Chrome, Edge, Firefox, etc.)
________________________________________
Setting Up the Backend
1.	Clone the Repository    
2.	git clone https://github.com/mutalechilando/DigitalWalletBackend.git
3.	 cd DigitalWalletBackend 
4.	Configure the Database Connection
o	Open appsettings.json
o	Update the ConnectionStrings section to point to your local MS SQL Server instance:
o	"ConnectionStrings": {
o	  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=DigitalWalletDB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True; "
}
o	Replace YOUR_SERVER_NAME with your actual SQL Server instance name.
5.	Apply Migrations & Seed Data Run the following commands in the project root where the .csproj file is located:
dotnet ef database update
This will create the required database schema.
6.	Run the Backend Server
dotnet run
The API will start, and you should see output confirming that it is running (on http://localhost:5119).
________________________________________
Setting Up the Frontend  https://github.com/mutalechilando/DigitalWalletFrontend.
1.	Clone the Repository    
git clone https://github.com/mutalechilando/DigitalWalletFrontend.git
2.	
cd DigitalWalletFrontend
3.	Install Dependencies
npm install
4.	Configure API Endpoint
o	Open  src/services/api.ts .
o	Ensure the API base URL is set correctly, e.g.:
const API_BASE_URL = "http://localhost:5119/api";
5.	Run the Frontend
npm start
This will start the frontend, typically accessible at http://localhost:5173.
________________________________________
Testing the Application
1.	Open http://localhost:5173 in a browser.
2.	Register a new user and log in.
3.	Perform wallet transactions and view the transaction history.
Troubleshooting
•	If migrations fail, check that your SQL Server instance is running and the connection string is correct.
•	If the frontend doesn’t load data, ensure the backend is running and reachable.
Now you're all set to use the Digital Wallet application locally! 


