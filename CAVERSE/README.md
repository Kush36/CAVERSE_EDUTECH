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
# CA Foundation Website - Complete Implementation Guide

## 📋 Components Overview

This package includes fully functional React TypeScript components for a CA Foundation educational website:

1. **HeaderTwo.tsx** - Main header with search, course filter, and navigation
2. **NavMenu.tsx** - Desktop navigation menu with dropdowns
3. **OffCanvas.tsx** - Mobile sidebar menu
4. **CoursesArea.tsx** - Pricing page with test series plans
5. **NiceSelect.tsx** - Custom styled dropdown component
6. **UseSticky.tsx** - Custom hook for sticky header functionality

## 🚀 Features

### Header Component
- ✅ **Working Search Bar** with live search results dropdown
- ✅ **Course Level Filter** (Foundation/Intermediate/Final)
- ✅ **Sticky Header** on scroll
- ✅ **Responsive Design** with mobile menu
- ✅ **Navigation Links** with active state tracking

### Search Functionality
- Real-time search results as you type
- Displays up to 5 matching courses
- Shows course title, level, and category
- "No results" message when nothing matches
- Click on result to navigate to course details
- Submit to navigate to full search results page

### Course Filter
- Dropdown to select course level
- Navigates to filtered course page
- Smooth animations and transitions

### Mobile Menu (OffCanvas)
- Slide-in sidebar from right
- Collapsible submenu items
- Mobile search functionality
- Social media links
- Call-to-action buttons

### Pricing Page (CoursesArea)
- Tab navigation between course levels
- Pricing cards with hover effects
- "Buy Now" button opens checkout modal
- "View Schedule" button shows test schedule
- Discount percentage calculation
- Recommended plan highlighting

## 📦 Installation

### 1. Install Dependencies

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

### 2. File Structure

Place the files in your project:

```
src/
├── components/
│   ├── header/
│   │   ├── HeaderTwo.tsx
│   │   └── NavMenu.tsx
│   ├── common/
│   │   └── OffCanvas.tsx
│   └── courses/
│       └── CoursesArea.tsx
├── ui/
│   └── NiceSelect.tsx
└── hooks/
    └── UseSticky.tsx
```

### 3. Update Import Paths

Update the import paths in each file to match your project structure:

**HeaderTwo.tsx:**
```typescript
import UseSticky from "../../hooks/UseSticky";
import NiceSelect from "../../ui/NiceSelect";
import NavMenu from "./NavMenu";
import OffCanvas from "../../common/OffCanvas";
```

## 🎨 Styling

The components use inline styles for easy integration. For production, you can:

1. **Extract to CSS Modules:**
```typescript
import styles from './HeaderTwo.module.css';
```

2. **Use Styled Components:**
```bash
npm install styled-components
```

3. **Use Tailwind CSS:**
```bash
npm install -D tailwindcss
```

## 🔧 Configuration

### Update Course Data

In **HeaderTwo.tsx**, update the `coursesData` array:

```typescript
const coursesData: Course[] = [
  { id: "1", title: "Your Course Title", level: "foundation", category: "accounting" },
  // Add more courses...
];
```

### Update Pricing Plans

In **CoursesArea.tsx**, update the `plansData` object:

```typescript
const plansData = {
  foundation: [
    {
      title: 'Foundation',
      subtitle: 'Your Subtitle',
      price: 5200,
      originalPrice: 10400,
      features: ['Feature 1', 'Feature 2'],
      scheduleUrl: '/schedule/foundation-basic',
      buyUrl: '/checkout/foundation-basic'
    },
    // Add more plans...
  ],
};
```

### Update Test Schedule

In **CoursesArea.tsx**, update the `scheduleData` object:

```typescript
const scheduleData = {
  foundation: {
    examDate: 'June 2026',
    testDates: [
      { date: '15 Feb 2026', topic: 'Your Topic' },
      // Add more test dates...
    ]
  },
};
```

### Update Navigation Menu

In **NavMenu.tsx**, update the `menuData` array:

```typescript
const menuData: MenuItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Courses",
    submenu: [
      { title: "All Courses", path: "/courses" },
      // Add more submenu items...
    ],
  },
  // Add more menu items...
];
```

## 🔗 Integration with React Router

### App.tsx Setup

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderTwo from './components/header/HeaderTwo';
import CoursesArea from './components/courses/CoursesArea';

function App() {
  return (
    <Router>
      <HeaderTwo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:level" element={<CoursesByLevel />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/test-series" element={<CoursesArea />} />
        <Route path="/checkout/:planId" element={<Checkout />} />
        <Route path="/schedule/:planId" element={<Schedule />} />
        {/* Add more routes */}
      </Routes>
    </Router>
  );
}
```

## 🎯 Usage Examples

### Basic Header

```typescript
import HeaderTwo from './components/header/HeaderTwo';

function App() {
  return (
    <div>
      <HeaderTwo />
      {/* Your content */}
    </div>
  );
}
```

### Pricing Page

```typescript
import CoursesArea from './components/courses/CoursesArea';

function TestSeriesPage() {
  return (
    <div>
      <CoursesArea />
    </div>
  );
}
```

## 🔍 Search Integration

To integrate with a backend API:

```typescript
// In HeaderTwo.tsx, replace the coursesData with API call:

const [searchResults, setSearchResults] = useState<Course[]>([]);

const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim().length > 0) {
    try {
      const response = await fetch(`/api/courses/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data);
      setShowSearchDropdown(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  }
};
```

## 💳 Payment Integration

To integrate with a payment gateway:

```typescript
// In CoursesArea.tsx

const handleProceedToPayment = async () => {
  if (selectedPlan) {
    try {
      // Create order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.title,
          amount: selectedPlan.price,
        }),
      });
      
      const data = await response.json();
      
      // Redirect to payment gateway
      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error('Payment error:', error);
    }
  }
};
```

## 📱 Responsive Breakpoints

The components are responsive with these breakpoints:

- **Mobile:** < 768px (Shows hamburger menu)
- **Tablet:** 768px - 1200px
- **Desktop:** > 1200px

## 🎨 Customization

### Colors

Update the primary color throughout:

```typescript
// Current: #5b4d8f (Purple)
// Replace with your brand color

const primaryColor = '#5b4d8f';
const secondaryColor = '#f8f6ff';
const accentColor = '#2e7d32';
```

### Fonts

The components use the "Outfit" font from Google Fonts. To change:

```typescript
// Update the font link and fontFamily
<link
  href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>

// Update fontFamily in styles
fontFamily: '"Your Font", system-ui, sans-serif'
```

## 🐛 Troubleshooting

### Search dropdown not showing
- Ensure z-index is properly set
- Check if results array has items
- Verify state management

### Sticky header not working
- Import UseSticky hook correctly
- Check scroll event listener
- Verify sticky class is applied

### Mobile menu not sliding in
- Check transform property
- Verify openCanvas state
- Ensure backdrop is visible

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Support

For issues or questions:
1. Check this README
2. Review component comments
3. Test in isolation
4. Check browser console for errors

## 🚀 Next Steps

1. Set up your routes in React Router
2. Connect to your backend API
3. Integrate payment gateway
4. Add authentication
5. Implement course management
6. Deploy to production

---

**Happy Coding! 🎓**









# CaVerse Edutech Admin Panel

A comprehensive admin dashboard for managing students, question papers, test series, and monitoring all activities on the CaVerse platform.

## 🎯 Features

### 📊 Dashboard Overview
- **Real-time Statistics**: Total students, active users, test attempts, average scores
- **Visual Analytics**: Charts and graphs for trends and patterns
- **Recent Activity Feed**: Live monitoring of student activities
- **Quick Actions**: Fast access to common tasks

### 👥 Student Management
- **Complete Student Database**: View all registered students
- **Advanced Filtering**: Search by name, email, course, status
- **Student Profiles**: Detailed information including test history and performance
- **Bulk Operations**: Update multiple students at once
- **Status Management**: Activate, deactivate, or suspend accounts
- **Export Data**: Download student lists as CSV

### 📝 Question Paper Management
- **Upload Papers**: Easy upload interface for PDF question papers
- **Paper Metadata**: Title, subject, course level, duration, marks
- **Draft & Publish**: Save as draft or publish immediately
- **Edit & Delete**: Modify existing papers or remove outdated ones
- **Attempt Tracking**: See how many students attempted each paper
- **Status Management**: Published, Draft, or Archived

### 📤 Upload Question Papers
- **Drag & Drop Upload**: Easy file upload interface
- **Paper Details Form**: Comprehensive metadata entry
- **PDF Support**: Upload question papers in PDF format
- **Validation**: Ensure all required fields are filled
- **Preview Before Publishing**: Review before making live

### 📈 Activity Logging
- **Real-time Monitoring**: Track all student activities
- **Activity Types**: Login, logout, test attempts, registrations
- **IP Tracking**: Monitor access locations
- **Timestamp Records**: Detailed activity timeline
- **Search & Filter**: Find specific activities quickly

### 📊 Analytics (Coming Soon)
- Student growth trends
- Test performance analytics
- Subject-wise analysis
- Course distribution
- Peak usage times

### ⚙️ Settings (Coming Soon)
- Platform configuration
- Email templates
- Notification settings
- User roles and permissions

## 🚀 Quick Start

### Installation

1. **Copy the files to your project:**
   ```
   src/
   ├── components/
   │   └── admin/
   │       ├── AdminPanel.tsx
   │       └── AdminService.ts
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install lucide-react
   ```

3. **Add to your routing:**
   ```typescript
   import AdminPanel from './components/admin/AdminPanel';

   // In your router
   {
     path: '/admin',
     element: <AdminPanel />
   }
   ```

## 📱 Usage

### Basic Integration

```typescript
import React from 'react';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  return (
    <div>
      <AdminPanel />
    </div>
  );
}

export default App;
```

### With Authentication

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminPanel from './components/admin/AdminPanel';

function ProtectedAdminRoute() {
  const isAdmin = checkIfUserIsAdmin(); // Your admin check logic

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <AdminPanel />;
}
```

## 🔧 Configuration

### API Integration

The admin panel uses `AdminService.ts` for all data operations. To connect to your backend:

1. **Update API endpoint:**
   ```typescript
   // In AdminService.ts
   private apiBaseUrl: string = 'https://your-api.com/api/admin';
   ```

2. **Implement API calls:**
   ```typescript
   async getStudents(filters?: any): Promise<{ students: Student[]; total: number }> {
     const response = await fetch(`${this.apiBaseUrl}/students`, {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${yourAuthToken}`,
         'Content-Type': 'application/json'
       }
     });
     
     return await response.json();
   }
   ```

### Environment Variables

Create a `.env` file:

```env
REACT_APP_ADMIN_API_URL=https://your-api.com/api/admin
REACT_APP_ADMIN_AUTH_TOKEN=your_secret_token
```

Use in the service:

```typescript
private apiBaseUrl: string = process.env.REACT_APP_ADMIN_API_URL || '/api/admin';
```

## 📊 Data Models

### Student
```typescript
interface Student {
  id: string;
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  course: 'Foundation' | 'Intermediate' | 'Final';
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'suspended';
  testsAttempted: number;
  averageScore: number;
  lastActive: string;
  profilePhoto?: string;
}
```

### Question Paper
```typescript
interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  course: 'Foundation' | 'Intermediate' | 'Final';
  duration: number; // in minutes
  totalMarks: number;
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  uploadDate: string;
  uploadedBy: string;
  status: 'draft' | 'published' | 'archived';
  attemptCount: number;
  fileUrl?: string;
}
```

### Activity Log
```typescript
interface StudentActivity {
  id: string;
  studentId: string;
  studentName: string;
  activityType: 'test_attempted' | 'login' | 'logout' | 'registration' | 'profile_update';
  description: string;
  timestamp: string;
  ipAddress?: string;
}
```

## 🔐 Security

### Authentication
Implement proper authentication before deploying:

```typescript
// Example authentication wrapper
import { useAuth } from '../contexts/AuthContext';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  // Rest of the component
};
```

### API Security
- Use JWT tokens for API authentication
- Implement role-based access control (RBAC)
- Validate all inputs on the server
- Use HTTPS for all API calls
- Implement rate limiting

### Data Protection
- Encrypt sensitive student data
- Implement audit logs for all admin actions
- Regular security audits
- GDPR compliance for student data

## 🎨 Customization

### Styling

The admin panel uses inline styles. To customize:

1. **Change color scheme:**
   ```typescript
   // Find and replace gradient colors
   background: 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)'
   ```

2. **Modify layout:**
   ```typescript
   // Adjust sidebar width
   width: '260px' // Change to your preferred width
   ```

3. **Update fonts:**
   ```typescript
   fontFamily: "'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
   ```

### Adding New Features

1. **Add new navigation item:**
   ```typescript
   const navItems = [
     // ... existing items
     { 
       id: 'reports', 
       label: 'Reports', 
       icon: <FileText size={20} /> 
     }
   ];
   ```

2. **Create component for new feature:**
   ```typescript
   const ReportsSection = () => (
     <div>
       {/* Your reports content */}
     </div>
   );
   ```

3. **Add to renderContent:**
   ```typescript
   const renderContent = () => {
     switch (activeTab) {
       // ... existing cases
       case 'reports':
         return <ReportsSection />;
       default:
         return <DashboardOverview />;
     }
   };
   ```

## 📤 File Upload

### Backend Implementation

For file uploads, implement a multipart form handler:

```javascript
// Express.js example
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/admin/papers', upload.single('file'), (req, res) => {
  const paperData = JSON.parse(req.body.data);
  const file = req.file;
  
  // Process and save to database
  // Return response
});
```

### Frontend Usage

```typescript
async uploadQuestionPaper(paperData: Partial<QuestionPaper>, file?: File): Promise<QuestionPaper> {
  const formData = new FormData();
  formData.append('data', JSON.stringify(paperData));
  if (file) {
    formData.append('file', file);
  }
  
  const response = await fetch(`${this.apiBaseUrl}/papers`, {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
}
```

## 📊 Analytics Integration

### Adding Charts

Install chart library:
```bash
npm install recharts
```

Use in analytics section:
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AnalyticsSection = () => {
  const data = [
    { name: 'Jan', students: 100 },
    { name: 'Feb', students: 150 },
    // ... more data
  ];

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="students" stroke="#3b82f6" />
    </LineChart>
  );
};
```

## 🔔 Notifications

### Real-time Notifications

Implement WebSocket for real-time updates:

```typescript
import { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://your-server.com/admin');
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
    };

    return () => ws.close();
  }, []);

  // Rest of component
};
```

## 📱 Responsive Design

The admin panel is responsive by default. For mobile optimization:

```typescript
// Add media query support
const isMobile = window.innerWidth < 768;

return (
  <div style={{
    display: isMobile ? 'block' : 'flex'
  }}>
    {/* Adjust layout based on screen size */}
  </div>
);
```

## 🧪 Testing

### Unit Tests

```typescript
// AdminService.test.ts
import AdminService from './AdminService';

describe('AdminService', () => {
  test('should get students', async () => {
    const result = await AdminService.getStudents();
    expect(result.students).toBeDefined();
    expect(Array.isArray(result.students)).toBe(true);
  });

  test('should create student', async () => {
    const studentData = {
      name: 'Test Student',
      email: 'test@example.com',
      course: 'Foundation'
    };
    
    const result = await AdminService.createStudent(studentData);
    expect(result.id).toBeDefined();
    expect(result.name).toBe(studentData.name);
  });
});
```

## 🚀 Deployment

### Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Environment variables for production:**
   ```env
   REACT_APP_ADMIN_API_URL=https://api.caverse.in/admin
   REACT_APP_ADMIN_AUTH_TOKEN=your_production_token
   ```

3. **Deploy to server:**
   - Upload build folder to hosting
   - Configure nginx/apache
   - Set up SSL certificate

### Performance Optimization

1. **Code splitting:**
   ```typescript
   const AdminPanel = React.lazy(() => import('./components/admin/AdminPanel'));
   ```

2. **Memoization:**
   ```typescript
   const MemoizedStudentList = React.memo(StudentList);
   ```

3. **Pagination:**
   ```typescript
   const [page, setPage] = useState(1);
   const limit = 20;
   
   const students = await AdminService.getStudents({ page, limit });
   ```

## 📖 API Documentation

### Endpoints

#### Students
- `GET /api/admin/students` - Get all students
- `GET /api/admin/students/:id` - Get student by ID
- `POST /api/admin/students` - Create new student
- `PUT /api/admin/students/:id` - Update student
- `DELETE /api/admin/students/:id` - Delete student

#### Question Papers
- `GET /api/admin/papers` - Get all papers
- `GET /api/admin/papers/:id` - Get paper by ID
- `POST /api/admin/papers` - Upload new paper
- `PUT /api/admin/papers/:id` - Update paper
- `DELETE /api/admin/papers/:id` - Delete paper

#### Activities
- `GET /api/admin/activities` - Get activity logs
- `POST /api/admin/activities` - Log new activity

#### Analytics
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/analytics/:period` - Get analytics data

## 🐛 Troubleshooting

### Common Issues

1. **API calls not working:**
   - Check API endpoint configuration
   - Verify authentication token
   - Check CORS settings

2. **File uploads failing:**
   - Check file size limits
   - Verify server upload configuration
   - Check file type validation

3. **Styling issues:**
   - Clear browser cache
   - Check CSS conflicts
   - Verify inline styles

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Contact development team

## 📝 License

Part of CaVerse Edutech platform - All rights reserved

---

**Built for Administrators, by Developers** 🚀

*Empowering educators to manage and monitor student success effectively!*