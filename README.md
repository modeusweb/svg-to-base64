# SVG to Base64 Converter

A modern web application that converts SVG files to CSS background-image format with base64 encoding. Built with React, Vite, and Tailwind CSS.

![SVG to Base64 Converter](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-8.2.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)

## Features

### 🎯 Core Functionality
- **Drag & Drop Upload**: Simply drag and drop SVG files into the upload zone
- **Click to Upload**: Alternatively, click to select files from your computer
- **Real-time Conversion**: Instant conversion of SVG to base64 encoded CSS
- **CSS Output Format**: Generates clean `background-image: url(data:image/svg+xml;base64,...)` format
- **File Size Validation**: 4MB file size limit to ensure optimal performance

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with gradient backgrounds
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Visual Feedback**: 
  - Button state changes when copying to clipboard
  - Hover effects on interactive elements
  - Drag and drop visual indicators
- **File Information**: Displays file name and size after upload

### 🔧 Advanced Features
- **Copy to Clipboard**: One-click copying of the generated CSS code
- **Live Preview**: See your SVG rendered in real-time after conversion
- **Select All**: CSS code field supports Ctrl+A for easy selection
- **Error Handling**: Clear error messages for invalid files or size limits
- **Reset Functionality**: Easy reset to upload a new file

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/modeusweb/svg-to-base64.git
cd svg-to-base64
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist` directory.

## Usage

### Step 1: Upload SVG File
- **Drag & Drop**: Drag your SVG file into the designated upload zone
- **Click to Upload**: Click the upload zone and select your SVG file from the file dialog

### Step 2: Automatic Conversion
The application automatically converts your SVG to base64 format and generates the CSS code.

### Step 3: Copy CSS Code
- Click the "Copy" button to copy the generated CSS to your clipboard
- The button will turn green and show "Copied!" to confirm successful copying
- Alternatively, use Ctrl+A to select all text in the CSS field and copy manually

### Step 4: Use in Your Project
Paste the copied CSS code into your stylesheet:
```css
.your-element {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNy40OTk1MSAxOEwyOC40OTk1IDE4IiBzdHJva2U9IiM1MTkyOEQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE4IDI4LjVMMTggNy41IiBzdHJva2U9IiM1MTkyOEQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+Cg==);
}
```

## File Requirements

- **Format**: SVG files only (.svg extension or image/svg+xml MIME type)
- **Size**: Maximum 4MB per file
- **Content**: Valid SVG markup

## Technical Stack

- **React 18.2.0**: Modern React with hooks
- **Vite 8.2.2**: Fast build tool and dev server
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **PostCSS**: CSS processing with @tailwindcss/postcss

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Structure

```
svg-to-base64/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── style.css        # Tailwind CSS imports
│   └── vite-env.d.ts    # Vite client type declarations
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── postcss.config.js    # PostCSS configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Adding New Features

The application is built with modern React patterns:
- Functional components with hooks
- useCallback for performance optimization
- Clean separation of concerns
- Responsive design with Tailwind CSS

## Troubleshooting

### File Not Uploading
- Ensure the file is in SVG format
- Check that file size is under 4MB
- Verify the file is not corrupted

### Copy to Clipboard Not Working
- Ensure browser permissions allow clipboard access
- Try using Ctrl+A to select and Ctrl+C to copy manually

### Styling Issues
- Clear browser cache
- Ensure Tailwind CSS is properly configured
- Check browser console for CSS errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ using React, Vite, and Tailwind CSS

## Acknowledgments

- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
