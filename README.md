# Al Abduljabbar & Al Faisal Law Firm

A modern, responsive web application for Al Abduljabbar & Al Faisal Law Firm, providing a platform for legal services, client management, and administrative functions.

## 🚀 Features

- **Multi-language Support**: Full internationalization support with React i18next
- **Role-Based Access Control**: Secure authentication and authorization system
  - Admin: Full access to all features
  - CustomerService: Access to client requests and basic management
  - User: Client access to services and consultations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with React 19 and Material-UI v7
- **State Management**: Zustand for global state management
- **Form Handling**: Formik with Yup validation
- **Rich Text Editing**: TipTap rich text editor integration
- **API Integration**: Axios for API requests with React Query

## 🛠 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, Material-UI
- **State Management**: Zustand
- **Form Handling**: Formik, Yup
- **Routing**: React Router v7
- **Internationalization**: React i18next
- **UI Components**: Material-UI, Lucide Icons
- **Data Fetching**: Axios, React Query
- **Rich Text**: TipTap
- **Notifications**: React Toastify

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jameeelaahmed/AlAbduljabbar-AlFaisal-Law-Firm.git
   cd law-firm
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables.

## 🚦 Running the Application

- Development server:
  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```

- Production build:
  ```bash
  npm run build
  npm run preview
  ```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── locales/         # Internationalization files
├── pages/           # Page components
├── routes/          # Application routes and guards
├── services/        # API services
├── store/           # State management (Zustand stores)
├── styles/          # Global styles
└── utils/           # Utility functions and helpers
```

## 🔒 Authentication & Authorization

The application implements a role-based access control (RBAC) system with the following roles:

- **Admin**: Full access to all features
- **CustomerService**: Access to client requests and basic management
- **User**: Client access to services and consultations

## 🌐 Internationalization

Supports multiple languages with React i18next. Translation files are located in `src/locales/`.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- And all other amazing open-source projects used in this project.
