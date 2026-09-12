/** Static SEO content shown below the converter result. */
export function InfoSection() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        What is an SVG to Base64 Converter?
      </h2>
      <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm space-y-4">
        <p>
          An SVG to base64 converter is a free online tool that transforms Scalable Vector Graphics
          (SVG) files into base64-encoded data URIs. These encoded strings can be used directly in
          multiple formats: raw Base64 strings, CSS background-image rules, and HTML img tags. This
          eliminates extra HTTP requests and lets you embed icons and images inline — ideal for
          icon systems, CSS sprites, and performance optimization.
        </p>
        <p>
          Simply drag and drop an SVG file into the upload area (or click to browse), and the
          converter instantly generates ready-to-paste code in your chosen format with a live
          preview. This free online tool supports files up to 4MB and includes features like zoom
          control, format minification, copy to clipboard, and download options.
        </p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white pt-2">
          Why use Base64 encoding for SVG files?
        </h3>
        <p>
          Base64 encoding allows you to embed SVG images directly into HTML or CSS files without
          additional HTTP requests. This improves page load times, reduces server load, and
          simplifies deployment. Common use cases include email templates, single-page applications,
          offline documentation, and any scenario where external file references are problematic.
        </p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white pt-2">
          Supported output formats
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Base64 String:</strong> Raw base64 encoded data for custom implementations</li>
          <li><strong>CSS Background Image:</strong> Ready-to-use background-image property</li>
          <li><strong>HTML img Tag:</strong> Complete img tag with src attribute</li>
        </ul>
        <p className="pt-2">
          Try this free online tool now — no registration required, no file uploads to servers.
          All conversion happens directly in your browser for maximum privacy and security.
        </p>
      </div>
    </article>
  )
}
