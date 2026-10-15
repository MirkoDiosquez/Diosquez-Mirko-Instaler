const paths = {
  arrow: "M4 12h16m-6-6 6 6-6 6",
  plus: "M12 5v14M5 12h14",
  search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  box: "m3 7 9-5 9 5v10l-9 5-9-5V7Zm0 0 9 5 9-5M12 12v10M7 4l10 5",
  check: "m5 12 4 4L19 6",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM12 7v6m-3-3h6",
  clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  edit: "m14 5 5 5M4 20l5-1L21 7l-5-5L4 14v6Z",
  trash: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7",
  close: "m6 6 12 12M6 18 18 6",
  shield: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-5 10 3 3 7-7",
  people:
    "M16 21v-4a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v4m20 0v-4a4 4 0 0 0-3-4M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm5-4a4 4 0 0 1 0 8",
  tools: "m14 6 4 4M3 21l6-6M21 3l-7 3-8 8 4 4 8-8 3-7Z",
  refresh:
    "M20 7v5h-5M4 17v-5h5M5 7a8 8 0 0 1 14-2l1 7M4 12l1 7a8 8 0 0 0 14-2",
};
export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.box} />
    </svg>
  );
}
