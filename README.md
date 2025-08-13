# SocialConnect - Modern Social Media Platform

A feature-rich social media application built with React and modern web technologies, offering seamless user interaction, real-time updates, and an intuitive user experience.

![SocialConnect Logo](public/assets/Logo%20(2).png)

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login and registration system with form validation
- **Create & Share Posts** - Rich text posts with image support and real-time updates
- **Interactive Feed** - Dynamic post updates with infinite scroll
- **User Profiles** - Customizable profiles with personal information and post history
- **Comment System** - Engage with posts through nested comments
- **Responsive Design** - Mobile-first design that works on all devices

### Advanced Features
- **Real-time Notifications** - Toast notifications for user actions
- **Form Validation** - Robust form handling with React Hook Form and Zod
- **Loading States** - Skeleton screens and spinners for better UX
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Protected Routes** - Authentication-based route protection
- **Modern UI** - Clean design with Tailwind CSS and Flowbite components

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework with latest features
- **React Router v7** - Client-side routing and navigation
- **Tailwind CSS 4** - Utility-first CSS framework
- **Flowbite** - Tailwind CSS component library
- **React Hook Form** - Performant form handling
- **Zod** - Type-safe schema validation

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **Hot Module Replacement** - Instant development updates
- **TypeScript Support** - Type definitions for React

### Dependencies
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library for UI elements
- **React Hot Toast** - Toast notifications
- **Font Awesome** - Additional icon library

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/socialconnect.git
   cd socialconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage

### Getting Started
1. **Register/Login**: Create a new account or login with existing credentials
2. **Create Posts**: Use the "Create Post" feature to share content
3. **Browse Feed**: Explore the home feed to see posts from other users
4. **Interact**: Comment on posts and engage with the community
5. **Profile Management**: Customize your profile and manage your posts

### Key Components

#### Home Feed (`src/Pages/Home/Home.jsx`)
- Displays posts from followed users
- Real-time updates and infinite scroll
- Quick access to create new posts

#### User Profile (`src/Pages/Profile/Profile.jsx`)
- Personal information display
- User's post history
- Profile customization options

#### Post Creation (`src/Components/CreatePost/CreatePost.jsx`)
- Rich text editor with image support
- Form validation and error handling
- Preview before posting

#### Post Details (`src/Pages/PostDetails/PostDetails.jsx`)
- Full post view with comments
- Interactive comment section
- Post engagement metrics

#### Navigation (`src/Components/AsideBar/AsideBar.jsx`)
- Sidebar navigation with quick links
- Responsive mobile menu
- User profile quick access

## 🏗️ Project Structure

```
socialconnect/
├── public/
│   ├── assets/
│   │   ├── login.jpg
│   │   ├── signup.jpg
│   │   └── Logo (2).png
│   └── image.png
├── src/
│   ├── Components/
│   │   ├── AddComment/          # Comment functionality
│   │   ├── AsideBar/            # Navigation sidebar
│   │   ├── CreatePost/          # Post creation interface
│   │   ├── Feeds/              # Post feed components
│   │   ├── Form/               # Registration forms
│   │   ├── LoadingSketlon/     # Loading states
│   │   ├── MyPosts/            # User's posts management
│   │   ├── Navbar/             # Top navigation
│   │   ├── Post/               # Individual post component
│   │   ├── PostOptions/        # Post actions (edit, delete)
│   │   ├── Spinner/            # Loading indicators
│   │   └── Layout.jsx          # Main layout wrapper
│   ├── Context/
│   │   └── UserDataContext.jsx  # Global state management
│   ├── Pages/
│   │   ├── Home/               # Main feed page
│   │   ├── Login/              # Authentication page
│   │   ├── PostDetails/        # Individual post view
│   │   ├── Profile/            # User profile page
│   │   └── Register/           # Registration page
│   ├── RoutingGuard/           # Route protection
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
├── eslint.config.js            # ESLint configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for interactive elements
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: Green for success states, red for errors

### Typography
- **Headings**: Sans-serif, bold weights
- **Body**: Clean, readable sans-serif fonts
- **Code**: Monospace for technical content

### Components
- **Buttons**: Consistent styling across all interactive elements
- **Forms**: Clean, accessible form controls
- **Cards**: Shadow effects and rounded corners
- **Modals**: Overlay dialogs for important actions

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint**: Enforced code quality and consistency
- **Prettier**: Code formatting (recommended)
- **Conventional Commits**: Git commit message format

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px and above

## 🔒 Security Features

- **Form Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based protection
- **Secure Authentication**: JWT token management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email support@socialconnect.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] **Real-time Chat** - Direct messaging between users
- [ ] **Stories Feature** - Temporary posts that disappear after 24 hours
- [ ] **Live Streaming** - Real-time video broadcasting
- [ ] **Dark Mode** - System preference detection
- [ ] **Push Notifications** - Browser notifications for new interactions
- [ ] **Advanced Analytics** - User engagement metrics and insights

---

**SocialConnect** - Connecting people, one post at a time.
