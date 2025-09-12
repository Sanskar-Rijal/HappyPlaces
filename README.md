# 🌍 HappyPlaces

**Track your travel memories with an interactive map experience**

HappyPlaces is a modern React application that allows users to track and manage their travel experiences on an interactive map. Users can click on locations, add cities to their personal collection, and store memories with notes and visit dates.

## 📸 Screenshots

will be uploded soon

## ✨ Features

### 🗺️ Interactive Map

- **Leaflet Integration**: Powered by React Leaflet for smooth map interactions
- **Click to Add**: Click anywhere on the map to add a new city
- **City Markers**: Visual markers for all visited cities
- **Dynamic Positioning**: Map automatically centers on selected cities

### 🏙️ City Management

- **Add Cities**: Click on map locations to add new cities
- **City Details**: View detailed information about each visited city
- **Visit Notes**: Add personal notes about your experiences
- **Visit Dates**: Track when you visited each location
- **Delete Cities**: Remove cities from your collection

### 🌐 Smart Location Detection

- **Reverse Geocoding**: Automatically detect city and country names from coordinates
- **BigDataCloud API**: Integration for accurate location data
- **Emoji Flags**: Automatic country flag emojis for visual appeal

### 📱 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Graceful error management and user feedback
- **Navigation**: Intuitive routing between different views

## 🛠️ Technologies Used

### Frontend

- **React 19** - Latest React with modern hooks and features
- **React Router DOM** - Client-side routing and navigation
- **React Leaflet** - Interactive map components
- **React DatePicker** - Date selection for visit dates

### State Management

- **Context API** - Global state management
- **useReducer** - Complex state logic management
- **Custom Hooks** - Reusable stateful logic

### Backend & Data

- **JSON Server** - Mock REST API for development
- **Leaflet** - Open-source map library
- **BigDataCloud API** - Reverse geocoding service

### Development Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **CSS Modules** - Scoped styling

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sanskar-Rijal/HappyPlaces.git
   cd HappyPlaces
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the JSON server** (in one terminal)

   ```bash
   npm run server
   ```

4. **Start the development server** (in another terminal)

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON server for API
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── City/            # City-related components
│   ├── Country/         # Country list components
│   ├── Map/             # Map and location components
│   ├── Form/            # City addition form
│   └── ...
├── contexts/            # React Context providers
│   └── CitiesContexts.jsx
├── hooks/               # Custom React hooks
│   ├── useUrlPosition.js
│   └── useGeoLocation.js
├── pages/               # Main application pages
│   ├── Homepage.jsx
│   ├── AppLayout.jsx
│   └── ...
└── data/                # JSON data files
    └── cities.json
```

## 🎯 Key Features Implementation

### State Management with useReducer

```javascript
const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload, loading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    // ... more cases
  }
}
```

### Interactive Map with React Leaflet

```javascript
<MapContainer center={mapPosition} zoom={10}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {cities.map((city) => (
    <Marker position={[city.position.lat, city.position.lng]}>
      <Popup>
        {city.emoji} {city.cityName}
      </Popup>
    </Marker>
  ))}
  <DetectClick />
</MapContainer>
```

### Smart Form with Reverse Geocoding

```javascript
const [cityName, setCityName] = useState("");
const [country, setCountry] = useState("");
const [date, setDate] = useState(new Date());
const [notes, setNotes] = useState("");

// Fetch location data from coordinates
useEffect(() => {
  async function fetchCityData() {
    const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
    const data = await res.json();
    setCityName(data.city || data.locality || "");
    setCountry(data.countryName);
  }
  fetchCityData();
}, [lat, lng]);
```

## 🌟 Advanced Features

### Custom Hooks

- **useUrlPosition**: Extract coordinates from URL parameters
- **useGeoLocation**: Get user's current location
- **useCities**: Access cities context throughout the app

### Routing Strategy

- Nested routes for different app sections
- URL state management for map coordinates
- Protected routes and navigation guards

### Performance Optimizations

- Component lazy loading
- Efficient re-renders with proper dependency arrays
- Optimized map rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [React Leaflet](https://react-leaflet.js.org/) for excellent map components
- [OpenStreetMap](https://www.openstreetmap.org/) for free map tiles
- [BigDataCloud](https://www.bigdatacloud.com/) for reverse geocoding API
- [JSON Server](https://github.com/typicode/json-server) for quick API prototyping
