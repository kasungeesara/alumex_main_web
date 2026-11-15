import { asset, Eyebrow } from "./shared";
import { ExportGlobe } from "./globe/export-globe";
export function ExportMarket() {
  return (
    <section
      id="market"
      className="market-section [&_.eyebrow]:justify-center pt-16 pr-0 pb-10 pl-0 [&_h2_span]:text-[var(--green)] max-[600px]:pt-12 max-[600px]:pr-0 max-[600px]:pb-7 max-[600px]:pl-0 text-center bg-white overflow-hidden"
    >
      <div className="section-container w-[min(1280px,_calc(100%_-_96px))] min-[1800px]:w-[min(1440px,calc(100%_-_160px))] max-[960px]:w-[calc(100%_-_64px)] max-[600px]:w-[calc(100%_-_40px)] mx-auto">
        <Eyebrow>Market</Eyebrow>
        <h2>
          Our Export <span>Market</span>
        </h2>
        <p className="market-intro mt-4.5 mr-auto mb-0 ml-auto text-[15px] max-[600px]:max-w-70 max-[600px]:text-[14px] text-[var(--muted)]">
          Precision made in Sri Lanka. Trusted around the world.
        </p>
        <ExportGlobe />
      </div>
    </section>
  );
}
const clients = [
  ["ceb", "Ceylon Electricity Board"],
  ["kingsbury", "The Kingsbury"],
  ["dimo", "DIMO"],
  ["jat", "JAT"],
  ["sport", "Sri Lanka sports"],
  ["prime", "Prime Residencies"],
  ["government", "Government of Sri Lanka"],
  ["maga", "MAGA"],
];
const partners = [
  ["aluk", "ALUK"],
  ["sudaltex", "Sudaltex"],
  ["ega", "EGA"],
  ["italtecno", "Italtecno"],
  ["alpolic", "Alpolic"],
];
export function Partners() {
  return (
    <>
      <section className="trusted section-container pt-20 max-[600px]:pt-12 w-[min(1280px,_calc(100%_-_96px))] min-[1800px]:w-[min(1440px,calc(100%_-_160px))] max-[960px]:w-[calc(100%_-_64px)] max-[600px]:w-[calc(100%_-_40px)] mx-auto">
        <Eyebrow>Trusted By</Eyebrow>
        <h2>
          Brought to <span>Life For</span>
        </h2>
        <div className="trusted-grid grid-cols-[340px_1fr] gap-18 mt-12 [&>p]:py-8 [&>p]:text-[28px] [&>p]:leading-[1.45] [&>p]:font-medium max-[1150px]:grid-cols-[300px_1fr] max-[1150px]:gap-12 max-[960px]:grid-cols-[250px_1fr] max-[960px]:gap-9 max-[960px]:[&>p]:text-[24px] max-[600px]:grid-cols-[1fr] max-[600px]:gap-7 max-[600px]:mt-8 max-[600px]:[&>p]:py-6 max-[600px]:[&>p]:text-[24px] max-[600px]:[&>p_br]:hidden grid items-center">
          <p className="[border-block:1px_solid_#d2d2d2] tracking-[-.02em]">
            Building lasting
            <br />
            relationships is at
            <br />
            our core, which is
            <br />
            why{" "}
            <span>
              300+ partners
              <br />
              trust us
            </span>{" "}
            with their
            <br />
            success.
          </p>
          <div className="client-logos gap-7 [&_img]:h-25 max-[960px]:gap-4.5 max-[960px]:[&_img]:h-18.5 max-[600px]:gap-5 max-[600px]:[&_img]:h-16 grid grid-cols-[repeat(4,minmax(0,1fr))] items-center">
            {clients.map(([id, name]) => (
              <img
                key={id}
                src={asset(`client-${id}`)}
                alt={name}
                className="w-full object-contain"
              />
            ))}
          </div>
        </div>
      </section>
      <section
        id="partners"
        className="strategic section-container py-[88px_80px] max-[600px]:py-14 w-[min(1280px,_calc(100%_-_96px))] min-[1800px]:w-[min(1440px,calc(100%_-_160px))] max-[960px]:w-[calc(100%_-_64px)] max-[600px]:w-[calc(100%_-_40px)] mx-auto"
      >
        <Eyebrow>Key Stakeholders</Eyebrow>
        <h2>
          Strategic <span>Partners</span>
        </h2>
        <div className="partner-logos grid-cols-[.8fr_1fr_1fr_1.4fr_1.3fr] gap-10 mt-10 [&_img]:h-18 max-[960px]:gap-6 max-[600px]:grid-cols-[repeat(3,minmax(0,1fr))] max-[600px]:gap-6 max-[600px]:mt-7 max-[600px]:[&_img]:h-11.5 grid items-center">
          {partners.map(([id, name]) => (
            <img
              key={id}
              src={asset(`partner-${id}`)}
              alt={name}
              className="w-full object-contain"
            />
          ))}
        </div>
      </section>
    </>
  );
}
