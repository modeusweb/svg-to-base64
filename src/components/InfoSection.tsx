/** Static SEO content shown below the converter result. */
export function InfoSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        What is an SVG to Base64 Converter?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
        An SVG to base64 converter transforms Scalable Vector Graphics (SVG) files into
        base64-encoded data URIs that can be used in multiple formats. This tool supports
        three output types: raw Base64 strings, CSS background-image rules, and HTML img tags.
        This eliminates extra HTTP requests and lets you embed icons and images inline — ideal
        for icon systems, CSS sprites, and performance optimization.
      </p>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 text-sm">
        Simply drag and drop an SVG file into the upload area (or click to browse),
        and the converter instantly generates the ready-to-paste code in your chosen format
        with a live preview. Features include zoom control, format minification, and
        download options. Files up to 4MB are supported.
      </p>
    </div>
  )
}