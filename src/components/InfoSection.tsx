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
        <p>
          Try this free online tool now — no registration required, no file uploads to servers.
          All conversion happens directly in your browser for maximum privacy and security.
        </p>
      </div>
    </article>
  )
}
