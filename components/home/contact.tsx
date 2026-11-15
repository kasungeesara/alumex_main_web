import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-invitation section-container"
      aria-labelledby="contact-heading"
    >
      <div className="contact-invitation-background" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" tabIndex={-1}>
          <source src="https://res.cloudinary.com/rtok2ici/video/upload/v1794506490/contact2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="contact-invitation-watermark" aria-hidden="true">
        <div className="contact-invitation-marquee">
          <span>Made for more. Built with Alumex.&nbsp;</span>
          <span>Made for more. Built with Alumex.&nbsp;</span>
        </div>
      </div>
      <div className="contact-invitation-inner">
        <div className="contact-invitation-copy">
          <p className="contact-invitation-eyebrow">
            <span /> CONTACT ALUMEX
          </p>
          <h2 id="contact-heading">
            The right profile.
            <br />
            <em>For every possibility.</em>
          </h2>
          <p className="contact-invitation-description">
            Choosing profiles for a new build? Looking for a specific finish or
            an export partner? Share your requirements with the Alumex team and
            find a solution that fits.
          </p>
          <div className="contact-invitation-actions">
            <a
              className="contact-invitation-button"
              href="/contact-us"
            >
              Discuss your requirements{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="contact-invitation-email"
              href="mailto:info@alumexgroup.com"
            >
              info@alumexgroup.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
