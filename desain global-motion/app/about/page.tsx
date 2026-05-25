export default function AboutPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-oceanic-dark text-on-primary py-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-center bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmDoRPyPTS1UEVAsxoNWnOWkF4bsTT7jUkA-fKxb0swHVgVs73yALYqXZdKcFVaLTilvhn85ThJMHMqb__0EIORyTzISbRIqIUBoVe9Ut4g5K055QWgH2ewgM4gNeO43VIerWzAVuPhZoSLjOIbCanzRH--qysQrZCpuMyWW8NrWOW4R-Foat1UlParEJWHC-8CxOVciPfx2Ye2NFbcJXiXqVUf71dzjlhRsrjv8v2gJ_s3jGwVb-K8OpTsq3nCuKVDfRp8eE1m1pw')" }}></div>
        <div className="relative z-10 max-w-container-max mx-auto text-center">
          <h1 className="font-display-lg text-display-lg mb-6">Engineered for Global Motion.</h1>
          <p className="font-body-lg text-body-lg max-w-2xl mx-auto text-on-primary-container">
            We don&apos;t just move freight; we engineer the pathways that keep the modern world connected. Precision, reliability, and scale are the cornerstones of our operations.
          </p>
        </div>
      </section>

      {/* Mission & History */}
      <section className="py-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-margin-desktop">
          <div className="p-gutter bg-surface-container-lowest border border-surface-border rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">explore</span>
              <h2 className="font-headline-xl text-headline-xl text-primary">Our Mission</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              To architect seamless global supply chains that empower businesses to scale without friction. We believe that modern logistics should be invisible to the end-user—a flawless execution of data, transport, and timing. Our commitment is absolute reliability in an unpredictable world.
            </p>
          </div>
          <div className="p-gutter bg-surface-container-lowest border border-surface-border rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">history</span>
              <h2 className="font-headline-xl text-headline-xl text-primary">Our Heritage</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Founded on the principles of industrial precision, Global Motion began as a specialized carrier for high-value tech components. Today, we manage critical infrastructure routes across six continents. Our evolution is driven by data, adopting predictive modeling before it was standard, ensuring we always deliver ahead of the curve.
            </p>
          </div>
        </div>
      </section>

      {/* Global Reach Bento Grid */}
      <section className="py-margin-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-surface-border">
        <div className="max-w-container-max mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-display-lg text-display-lg text-primary mb-4">Our Global Reach</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">Strategic hubs positioned across key global arteries ensuring rapid deployment and uninterrupted transit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hub Card 1 */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-lg p-6 hover:shadow-[0_4px_4px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-lg text-headline-lg text-primary">APAC Hub</h3>
                <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-1 rounded-full uppercase">Primary</span>
              </div>
              <ul className="space-y-3 font-label-md text-label-md text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Singapore (HQ)</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Shanghai</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Tokyo</li>
              </ul>
            </div>
            {/* Hub Card 2 */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-lg p-6 hover:shadow-[0_4px_4px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-lg text-headline-lg text-primary">EMEA Hub</h3>
                <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-1 rounded-full uppercase">Primary</span>
              </div>
              <ul className="space-y-3 font-label-md text-label-md text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Frankfurt</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Rotterdam</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Dubai</li>
              </ul>
            </div>
            {/* Hub Card 3 */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-lg p-6 hover:shadow-[0_4px_4px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-lg text-headline-lg text-primary">Americas Hub</h3>
                <span className="bg-surface-dim text-on-surface font-label-sm text-label-sm px-2 py-1 rounded-full uppercase">Secondary</span>
              </div>
              <ul className="space-y-3 font-label-md text-label-md text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Memphis</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> Panama City</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-outline">location_on</span> São Paulo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container-highest rounded-xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 md:w-2/3">
            <span className="inline-block bg-status-success text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full uppercase mb-4 tracking-wider">Corporate Responsibility</span>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-6">Engineered for a Sustainable Tomorrow</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Efficiency isn&apos;t just about speed; it&apos;s about resource optimization. We are actively transitioning our ground fleet to EV and investing heavily in sustainable aviation fuels (SAF). Our goal is carbon-neutral operations across all tier-1 routes by 2035.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-6">
              <div>
                <div className="font-display-lg text-display-lg text-status-success mb-1">30%</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">Emissions Reduced</div>
              </div>
              <div>
                <div className="font-display-lg text-display-lg text-primary mb-1">100%</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">Electric Last-Mile by 2030</div>
              </div>
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-20%] w-1/2 h-[140%] opacity-10 hidden md:block">
            <span className="material-symbols-outlined text-[400px] text-status-success">eco</span>
          </div>
        </div>
      </section>
    </main>
  );
}
