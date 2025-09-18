# CivicConnect Maharashtra Dashboard

## Project Overview

CivicConnect is a comprehensive civic engagement platform designed to connect citizens with local government services in Maharashtra, India. The platform enables citizens to report civic issues, track their resolution, and engage with their local representatives.

## Key Features

- **Interactive Dashboard**: Real-time visualization of civic issues and their status
- **Issue Reporting**: Citizens can report various civic issues (water, electricity, roads, sanitation)
- **Progress Tracking**: Monitor the status and resolution progress of reported issues
- **Local Representative Contact**: Easy access to contact information for local officials
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Multi-language Support**: Available in English and Marathi

## How to Use This Project

### Option 1: Use the Standalone Dashboard
Open `civicconnect-maharashtra-dashboard-fixed.html` directly in your web browser for the production-ready dashboard.

### Option 2: Run the Full React Application

**Prerequisites:**
- Node.js (version 16 or higher) and npm installed
- Git (for cloning the repository)

**Setup Steps:**

```bash
# Step 1: Clone the repository
git clone https://github.com/AkashkSharma-22/Civic-Connect.git

# Step 2: Navigate to the project directory
cd Civic-Connect

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
Civic-Connect/
├── 📁 Production Dashboard
│   └── civicconnect-maharashtra-dashboard-fixed.html
├── ⚛️ React Application
│   ├── src/                    # Source code
│   ├── public/                  # Static assets
│   └── Configuration files
├── 📋 Documentation
│   ├── README.md               # This file
│   ├── RUN-INSTRUCTIONS.md     # Setup guide
│   └── VERIFICATION-REPORT.md  # Testing results
├── 🧪 Testing Tools
│   └── dashboard-test-suite.html
└── 🎨 Assets & Configuration
```

## Technologies Used

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **Icons:** Lucide React
- **Charts:** Recharts for data visualization
- **State Management:** React Query for data fetching
- **Routing:** React Router DOM
- **Forms:** React Hook Form with Zod validation

## Testing & Verification

The project includes comprehensive testing tools:
- **Test Suite:** `dashboard-test-suite.html` - Complete functionality testing
- **Verification Report:** `VERIFICATION-REPORT.md` - Detailed test results
- **Cross-browser Compatibility:** Tested on Chrome, Firefox, Safari, Edge

## Deployment Options

### Static Hosting
Upload the `civicconnect-maharashtra-dashboard-fixed.html` file to any static hosting service.

### Full Application Deployment
Build and deploy the React application to platforms like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Customization

The dashboard can be customized for different regions by:
1. Modifying the geoJSON data for different districts
2. Updating the representative contact information
3. Adjusting the issue categories and priorities
4. Customizing colors and branding

## Support & Contributing

For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/AkashkSharma-22/Civic-Connect).

## License

This project is open source and available under the MIT License.
