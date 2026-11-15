const marketFlags = {
  "SRI LANKA": "lk",
  CANADA: "ca",
  USA: "us",
  UK: "gb",
  SWITZERLAND: "ch",
  KENYA: "ke",
  GERMANY: "de",
  SEYCHELLES: "sc",
  MALDIVES: "mv",
  ITALY: "it",
  ISRAEL: "il",
  UAE: "ae",
  INDIA: "in",
  NEPAL: "np",
  BANGLADESH: "bd",
  INDONESIA: "id",
  AUSTRALIA: "au",
  "NEW ZEALAND": "nz",
};

export function MarketLabel({ label }) {
  const country = Object.keys(marketFlags).find((name) => label.endsWith(name));
  if (!country) return label;

  return (
    <span className="globe-market-label">
      {/* Image flags also render on Windows, where flag emoji show as letters. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w40/${marketFlags[country]}.png`}
        width={24}
        height={16}
        alt=""
        className="globe-market-flag"
        draggable={false}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <span>{country}</span>
    </span>
  );
}
