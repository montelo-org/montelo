
export const idShortener = (id: string): { short: string; color: string } => {
  const short = id.substring(id.length - 4);

  const lastLetterAscii = id.charCodeAt(id.length - 1);
  const colors: string[] = [
    "#E54D2E",
    "#E5484D",
    "#E54666",
    "#E93D82",
    "#D6409F",
    "#AB4ABA",
    "#8E4EC6",
    "#6E56CF",
    "#5B5BD6",
    "#3E63DD",
    "#0090FF",
    "#00A2C7",
    "#00A2C7",
    "#12A594",
    "#30A46C",
    "#46A758",
    "#F76B15",
    "#FFC53D",
    "#FFE629",
    "#BDEE63",
    "#86EAD4",
    "#7CE2FE",
  ];

  const adjustedAsciiIndex = lastLetterAscii % colors.length;
  const color = colors[adjustedAsciiIndex];

  return {
    short,
    color,
  };
};
