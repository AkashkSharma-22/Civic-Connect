# CivicConnect Maharashtra Dashboard

## Quick Start Guide

### Method 1: Python HTTP Server (Recommended)
1. **Start the server**:
   ```bash
   python -m http.server 8000
   ```

2. **Open the dashboard**:
   - Navigate to: http://localhost:8000/civicconnect-maharashtra-dashboard.html
   - Alternative: http://localhost:8000/working-dashboard.html (simplified version)

### Method 2: Direct File Opening
1. **Simply double-click** on `civicconnect-maharashtra-dashboard.html` in your file explorer
2. The dashboard will open in your default web browser

### Method 3: Live Server Extension (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click on `civicconnect-maharashtra-dashboard.html`
3. Select "Open with Live Server"

## Dashboard Features

### ✅ Working Features
- **Interactive Statistics**: Real-time issue counts and metrics
- **Priority Color Coding**: Issues categorized by urgency (Red=High, Orange=Medium, Green=Low)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **District Filtering**: Filter issues by Maharashtra districts
- **Live Feed**: Simulated real-time issue reporting
- **Report Issue Modal**: Form to submit new issues

### 🗺️ Map Integration
- **Leaflet.js**: Interactive map of Maharashtra
- **District Markers**: Clickable markers showing issue counts
- **Priority Visualization**: Color-coded markers by urgency
- **Fallback**: If external libraries fail, shows simplified map placeholder

### 📊 Analytics
- **Chart.js**: Interactive charts and graphs
- **Category Breakdown**: Issues by type (Roads, Water, Electricity, etc.)
- **Weekly Trends**: Historical data visualization
- **Fallback**: Simplified statistics if charts don't load

## Troubleshooting

### Common Issues
1. **"npm not found"**: This is expected - no Node.js required for the HTML version
2. **Blank page**: Check browser console for errors (F12)
3. **Map not loading**: Ensure internet connection for external libraries
4. **CORS errors**: Use HTTP server method instead of file:// protocol

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## File Structure
```
├── civicconnect-maharashtra-dashboard.html (Main dashboard)
├── working-dashboard.html (Simplified backup)
├── test-dashboard.html (Test page)
├── index.html (Original CivicConnect site)
└── RUN-INSTRUCTIONS.md (This file)
```

## Data Source
The dashboard uses **simulated data** for demonstration purposes. In production, this would connect to:
- Government APIs
- Citizen reporting systems
- IoT sensors
- Social media monitoring

## Support
If you encounter any issues:
1. Try the simplified version: `working-dashboard.html`
2. Check browser console for specific errors
3. Ensure stable internet connection for external resources
4. Use Python HTTP server method for best compatibility