# SVG to Base64 Converter

A modern web application that converts SVG files to multiple output formats with base64 encoding. Built with React, Vite, and Tailwind CSS.

![SVG to Base64 Converter](https://img.shields.io/badge/React-19.2.8-blue)
![Vite](https://img.shields.io/badge/Vite-8.2.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-38bdf8)


## Demo

Try the live version here: **[svg-to-base64.vercel.app](https://svg-to-base64.vercel.app/)**

## Features

### 🎯 Core Functionality
- **Drag & Drop Upload**: Simply drag and drop SVG files into the upload zone
- **Click to Upload**: Alternatively, click to select files from your computer
- **Real-time Conversion**: Instant conversion of SVG to base64 encoded formats
- **Multiple Output Formats**: 
  - **Base64 String**: Raw base64 encoded data
  - **CSS Background Image**: Clean `background-image: url(data:image/svg+xml;base64,...)` format
  - **HTML img Code**: Ready-to-use `<img src="data:image/svg+xml;base64,...">` tag
- **File Size Validation**: 4MB file size limit to ensure optimal performance

### 🎨 User Interface
- **Modern Two-Column Layout**: Efficient use of screen space with side-by-side panels
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Visual Feedback**: 
  - Button state changes when copying to clipboard
  - Hover effects on interactive elements
  - Drag and drop visual indicators
- **File Information**: Displays file name and size after upload

### 🔧 Advanced Features
- **Copy to Clipboard**: One-click copying of the generated code in any format
- **Download Result**: Save the output as a text file
- **Live Preview**: See your SVG rendered in real-time after conversion
- **Preview Zoom**: Zoom in/out functionality for detailed inspection (25% - 300%)
- **Format Minification**: Option to remove spaces from CSS output
- **Format Tabs**: Easy switching between different output formats
- **Select All**: Code field supports Ctrl+A for easy selection
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
The application automatically converts your SVG to base64 format and displays the output in your selected format.

### Step 3: Choose Output Format
Select from three available output formats:
- **Base64 String**: Raw base64 encoded data (for use in data URIs, API responses, etc.)
- **CSS Background Image**: Ready-to-use CSS with `background-image: url(...)` format
- **HTML img Code**: Complete `<img src="...">` tag for direct HTML embedding

### Step 4: Copy or Download
- Click the "Copy" button to copy the generated code to your clipboard
- The button will turn green and show "Copied!" to confirm successful copying
- Alternatively, use Ctrl+A to select all text in the code field and copy manually
- Click "Download" to save the output as a text file

### Step 5: Additional Options
- **Zoom Preview**: Use the +/- buttons to zoom in/out of the SVG preview (25% - 300%)
- **Minify SVG markup**: Check the "Minify SVG markup" option to collapse the SVG to a single line before encoding, producing a shorter base64 output
- **Format Settings**: Toggle between different output formats using the tabs

### Step 6: Use in Your Project

**For CSS Background Image:**
```css
.your-element {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNy40OTk1MSAxOEwyOC40OTk1IDE4IiBzdHJva2U9IiM1MTkyOEQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE4IDI4LjVMMTggNy41IiBzdHJva2U9IiM1MTkyOEQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+Cg==);
}
```

**For HTML img Code:**
```html
<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNy40OTk1MSAxOEwyOC40OTk1IDE4IiBzdHJva2U9IiM1MTkyOEQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE4IDI4LjVMMTggNy41IiBzdHJva2U9IiM1MTkyOEQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+Cg==" alt="">
```

## File Requirements

- **Format**: SVG files only (.svg extension or image/svg+xml MIME type)
- **Size**: Maximum 4MB per file
- **Content**: Valid SVG markup

## Technical Stack

- **React 19.2.8**: Modern React with hooks
- **Vite 8.2.2**: Fast build tool and dev server
- **Tailwind CSS 4.3.3**: Utility-first CSS framework
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
│   ├── favicon.svg          # Site favicon
│   ├── robots.txt           # Search engine rules
│   └── sitemap.xml          # Site sitemap
├── src/
│   ├── App.tsx              # App shell / composition root
│   ├── main.tsx             # Application entry point
│   ├── style.css            # Tailwind CSS imports
│   ├── vite-env.d.ts        # Vite client type declarations
│   ├── constants.ts         # Shared application constants
│   ├── types/
│   │   └── index.ts         # Shared TypeScript types (OutputFormat)
│   ├── utils/
│   │   └── svg.ts           # Pure SVG helpers: minify, base64, format
│   ├── hooks/
│   │   ├── useClipboard.ts      # Copy-to-clipboard with feedback state
│   │   └── useSvgConverter.ts   # SVG conversion business logic
│   └── components/
│       ├── Header.tsx           # Page header
│       ├── UploadZone.tsx       # Drag & drop + file input
│       ├── ErrorMessage.tsx     # Error notification
│       ├── PreviewCard.tsx      # SVG preview with zoom controls
│       ├── FileInfoCard.tsx     # Uploaded file info + reset
│       ├── FormatSettingsCard.tsx # Output settings (minify toggle)
│       ├── ResultCard.tsx       # Output result, format tabs, copy/download
│       ├── InfoSection.tsx      # Static SEO content
│       ├── DonationCard.tsx     # Donation card with wallet address
│       ├── Footer.tsx           # GitHub link
│       └── icons.tsx            # Reusable inline SVG icons
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── postcss.config.js        # PostCSS configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking (strict mode)

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

## Support This Project

This tool is completely **free** and will always stay free. If it saved you some time and you'd like to support its development, consider buying me a coffee — every little bit helps keep this project running and improving. ☕

**USDT (TRC-20):** `TQZxZ2Ygh6RvkZDi5qswq8uF9KbDbDw9bo`

Thank you! 💜
