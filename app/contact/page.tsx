export const metadata = {
  title: "Contact",
  description: "Get in touch about FreePDF tools.",
};

export default function Contact() {
  return (
    <div className="container-narrow py-16 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-4">Contact</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Questions about privacy or features? We'd love to hear from you.</p>
      
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" placeholder="How can we help?" />
        </div>
        <button type="submit" className="btn-primary">Send message</button>
      </form>
      <p className="mt-6 text-xs text-slate-500">This is a demo form. In production, connect to your email service.</p>
    </div>
  );
}