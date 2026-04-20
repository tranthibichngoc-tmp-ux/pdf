export const metadata = {
  title: "Privacy Policy",
  description: "How we protect your privacy. Files never leave your device.",
};

export default function Privacy() {
  return (
    <div className="container-narrow py-16 prose dark:prose-invert max-w-3xl">
      <h1>Privacy Policy</h1>
      <p className="lead">Your files never leave your device. Period.</p>
      
      <h2>Local Processing</h2>
      <p>All PDF tools run entirely in your browser using WebAssembly and JavaScript. We do not upload your files to our servers.</p>
      
      <h2>No Tracking</h2>
      <p>We do not track your documents, store your files, or sell your data. Analytics are anonymized and do not include file contents.</p>
      
      <h2>File Deletion</h2>
      <p>Since files never upload, there's nothing to delete on our end. Closing the tab instantly removes all data from memory.</p>
      
      <h2>Open Source</h2>
      <p>Our processing libraries are open source. You can verify that no data leaves your browser.</p>
    </div>
  );
}