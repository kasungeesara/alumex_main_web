import { asset } from "./shared";
const brands = [
  ["alugo", "Alumex ALUGO"],
  ["lumin", "Lumin"],
  ["solar", "Alumex Solar"],
  ["capral", "Capral"],
  ["ozon", "Ozon"],
  ["alumex", "Alumex"],
  ["system", "Alumex System"],
];
export function BrandStrip() {
  return (
    <div className="w-full overflow-hidden">
      <div className="section-container border-b border-[#f4f4f4] py-9.5 max-[1000px]:py-7 max-[700px]:py-6">
        <div className="flex w-max min-w-full animate-[brand-marquee_24s_linear_infinite] items-center gap-9 motion-reduce:animate-none max-[1000px]:gap-5 max-[700px]:gap-4">
          {[...brands, ...brands].map(([image, name], index) => (
            <a
              href="#products"
              key={`${image}-${index}`}
              className="flex w-[clamp(140px,12vw,220px)] shrink-0 items-center justify-center"
            >
              <img
                className="h-18 w-full object-contain max-[1000px]:h-12.5 max-[700px]:h-11"
                src={asset(`brand-${image}`)}
                alt={name}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
